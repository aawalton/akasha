import { existsSync, readFileSync } from "node:fs"
import { dirOf, relativeBetween, resolves } from "@akasha/code-system/code-path-between"
import {
  NO_RUNTIME_PATHS,
  readsRuntimePaths,
  runtimePatches,
} from "@akasha/code-system/code-runtime-path"
import { decodeUtf8 } from "@akasha/code-system/utf8-body"
import { fileStemOf } from "@akasha/file-page-identity"
import { trackedIn } from "@akasha/markdown-pages/tracked"
import {
  isAddressable,
  isDirty,
  isVendored,
  repos,
  targetRepo,
  targetRoot,
} from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { canonicalize, normalizeAbsolute } from "@akasha/pages-system/repo-path"
import { judge, type Outcome, over, skip } from "@akasha/verdict/outcome"
import { isGeneratedFile } from "../generated-file/generated-file.ts"
import { type Held, heldIn, namesMoved } from "./held.ts"
import { linkPatches } from "./link.ts"
import {
  escapedMentions,
  mentionPatches,
  PATH_CHAR,
  PATH_TAIL,
  type Patch,
  textFiles,
} from "./mention.ts"
import { reslugged, slugKeys, slugPatches } from "./reslug.ts"

export type Moves = ReadonlyMap<string, string>

export interface Repointed {
  readonly relPath: string
  readonly body: string
  readonly notes: readonly string[]
  readonly moved: boolean
}

export interface RuntimeReading {
  readonly files: number
  readonly read: number
  readonly repointed: number
  readonly unread: number
  readonly unreadable: readonly string[]
}

export interface SpecifierReading {
  readonly moving: number
  readonly files: number
  readonly specifiers: number
  readonly repointed: number
  readonly unreached: readonly string[]
}

export interface Survey {
  readonly entries: readonly Repointed[]
  readonly quarantined: readonly string[]
  readonly generated: readonly string[]
  readonly escaped: readonly string[]
  readonly reading: SpecifierReading
  readonly runtime: RuntimeReading
}

export interface Importers {
  readonly roots: Roots
  readonly entries: readonly Repointed[]
  readonly files: number
  readonly specifiers: number
  readonly repointed: number
}

const SPECIFIER_RE = /\b(?:from|import)\s*\(?\s*(["'])([^"']+)\1/g

const MODULE = ".ts"

const NUL = String.fromCharCode(0)

function retargetSpecifier(
  spec: string,
  hostBefore: string,
  hostAfter: string,
  moved: ReadonlyMap<string, string>,
  held: Held
): string | null {
  const absolute = resolves(spec, hostBefore)
  if (absolute === null) return null
  const cut = spec.search(/[#?]/)
  const pathPart = cut === -1 ? spec : spec.slice(0, cut)
  const named = namesMoved(absolute, moved)
  if (named === null && hostBefore === hostAfter) return null
  if (named === null && !held(absolute)) return null
  const relative = relativeBetween(dirOf(hostAfter), named?.to ?? absolute)
  const next = named === null ? relative : named.spell(relative)
  return next === pathPart ? null : next + (cut === -1 ? "" : spec.slice(cut))
}

interface Specifiers {
  readonly patches: readonly Patch[]
  readonly read: number
}

const NO_SPECIFIERS: Specifiers = { patches: [], read: 0 }

export function specifierPatches(
  body: string,
  hostBefore: string,
  hostAfter: string,
  moved: ReadonlyMap<string, string>,
  held: Held
): Specifiers {
  const patches: Patch[] = []
  let read = 0
  for (const match of body.matchAll(SPECIFIER_RE)) {
    const spec = match[2] ?? ""
    if (!spec.startsWith(".")) continue
    read += 1
    const next = retargetSpecifier(spec, hostBefore, hostAfter, moved, held)
    if (next === null) continue
    const text = next.startsWith(".") ? next : `./${next}`
    if (text === spec) continue
    const start = (match.index ?? 0) + match[0].length - spec.length - 1
    patches.push({ start, end: start + spec.length, text, was: spec })
  }
  return { patches, read }
}

export function apply(
  body: string,
  patches: readonly Patch[]
): { body: string; notes: readonly string[] } {
  const ordered = [...patches].sort((a, b) => a.start - b.start || a.end - b.end)
  const pieces: string[] = []
  const notes: string[] = []
  let taken = 0
  for (const patch of ordered) {
    if (patch.start < taken) continue
    pieces.push(body.slice(taken, patch.start), patch.text)
    notes.push(
      `${body.slice(0, patch.start).split("\n").length}: \`${patch.was}\` → \`${patch.text}\``
    )
    taken = patch.end
  }
  pieces.push(body.slice(taken))
  return { body: pieces.join(""), notes }
}

function movedAbsolute(moves: Moves, roots: Roots, landing: Roots): ReadonlyMap<string, string> {
  const root = targetRoot(roots)
  const landsIn = targetRoot(landing)
  return new Map(
    [...moves].map(([from, to]): [string, string] => [
      normalizeAbsolute(`${root}/${from}`),
      normalizeAbsolute(`${landsIn}/${to}`),
    ])
  )
}

function crossPatches(
  body: string,
  host: string,
  moved: ReadonlyMap<string, string>
): readonly Patch[] {
  const patches: Patch[] = []
  const from = dirOf(host)
  for (const [was, now] of moved) {
    const before = relativeBetween(from, was)
    const after = relativeBetween(from, now)
    if (before === after) continue
    for (let at = body.indexOf(before); at !== -1; at = body.indexOf(before, at + before.length)) {
      const behind = body[at - 1]
      const ahead = body[at + before.length]
      if (behind !== undefined && PATH_CHAR.test(behind)) continue
      if (ahead !== undefined && PATH_TAIL.test(ahead)) continue
      patches.push({ start: at, end: at + before.length, text: after, was: before })
    }
  }
  return patches
}

function trackedTexts(
  root: string
): readonly { readonly relPath: string; readonly body: string }[] {
  const found: { relPath: string; body: string }[] = []
  for (const relPath of trackedIn(root)) {
    if (isDirty(relPath) || isVendored(relPath)) continue
    let bytes: Uint8Array
    try {
      bytes = readFileSync(`${root}/${relPath}`)
    } catch {
      continue
    }
    const body = decodeUtf8(bytes)
    if (body !== null && !body.includes(NUL)) found.push({ relPath, body })
  }
  return found
}

export function surveyImporters(
  moves: Moves,
  roots: Roots,
  landing: Roots = roots
): readonly Importers[] {
  const moved = movedAbsolute(moves, roots, landing)
  const held = heldIn(roots)
  const seen = new Set([canonicalize(targetRoot(roots)), canonicalize(targetRoot(landing))])
  const found: Importers[] = []
  for (const repo of repos()) {
    const root: string | undefined = roots[repo]
    if (root === undefined || !isAddressable(repo)) continue
    const at = canonicalize(root)
    if (seen.has(at) || !existsSync(`${root}/.git`)) continue
    seen.add(at)
    const entries: Repointed[] = []
    let files = 0
    let specifiers = 0
    let repointed = 0
    for (const { relPath, body } of trackedTexts(root)) {
      const host = normalizeAbsolute(`${root}/${relPath}`)
      const isModule = relPath.endsWith(MODULE)
      const named = isModule ? specifierPatches(body, host, host, moved, held) : NO_SPECIFIERS
      if (isModule) {
        files += 1
        specifiers += named.read
      }
      const applied = apply(body, [...named.patches, ...crossPatches(body, host, moved)])
      if (applied.notes.length === 0) continue
      repointed += applied.notes.length
      entries.push({ relPath, body: applied.body, notes: applied.notes, moved: false })
    }
    if (entries.length > 0) {
      found.push({ roots: { ...roots, target: repo }, entries, files, specifiers, repointed })
    }
  }
  return found
}

export function importerReading(found: readonly Importers[]): Outcome {
  const repointed = found.reduce((sum, one) => sum + one.repointed, 0)
  const specifiers = found.reduce((sum, one) => sum + one.specifiers, 0)
  const named = found.map((one) => targetRepo(one.roots)).join(", ")
  const detail =
    `${repointed} repointed in ${named} — ${found.length === 1 ? "a repository" : "repositories"} ` +
    "neither giving a body up nor taking one, and holding importers this move would strand"
  return {
    ...judge("importers", detail, []),
    population: over(specifiers, "relative specifier(s)"),
  }
}

export function surveyRename(moves: Moves, roots: Roots, landing: Roots = roots): Survey {
  const root = targetRoot(roots)
  const landsIn = targetRoot(landing)
  const moved = movedAbsolute(moves, roots, landing)
  const held = heldIn(roots)
  const entries: Repointed[] = []
  const quarantined: string[] = []
  const generated: string[] = []
  const escaped: string[] = []
  const carried = reslugged(moves, roots)
  const keys = slugKeys(targetRepo(roots), roots)
  const taken = new Set(moves.keys())
  const moving = [...moves.keys()].filter((one) => one.endsWith(".ts"))
  const unreached = new Set(moving)
  const unreadable: string[] = []
  let files = 0
  let specifiers = 0
  let repointed = 0
  let runtimeFiles = 0
  let runtimeRead = 0
  let runtimeRepointed = 0
  let runtimeUnread = 0
  for (const { relPath, body } of textFiles(root)) {
    unreached.delete(relPath)
    const target = moves.get(relPath)
    const lands = target ?? relPath
    const before = normalizeAbsolute(`${root}/${relPath}`)
    const after = target === undefined ? before : normalizeAbsolute(`${landsIn}/${target}`)
    const relocating = after !== before
    const ownStem = relocating ? fileStemOf(lands) : null
    const named = lands.endsWith(".ts")
      ? specifierPatches(body, before, after, moved, held)
      : NO_SPECIFIERS
    const running = readsRuntimePaths(lands)
      ? runtimePatches(body, before, after, moved, held)
      : NO_RUNTIME_PATHS
    const applied = apply(body, [
      ...(lands.endsWith(".md") ? linkPatches(body, before, after, moved, taken) : []),
      ...named.patches,
      ...running.patches,
      ...(lands.endsWith(".md") ? slugPatches(body, carried, keys, ownStem) : []),
      ...mentionPatches(body, moves, roots),
    ])
    if (!isDirty(relPath)) {
      for (const one of escapedMentions(applied.body, moves)) escaped.push(`${lands}:${one}`)
    }
    if (isDirty(relPath) && !relocating) {
      for (const note of applied.notes) quarantined.push(`${relPath}:${note}`)
      continue
    }
    if (!relocating && applied.notes.length > 0 && isGeneratedFile(relPath, body)) {
      generated.push(relPath)
      continue
    }
    if (lands.endsWith(".ts")) {
      files += 1
      specifiers += named.read
      repointed += named.patches.length
    }
    if (readsRuntimePaths(lands)) {
      runtimeFiles += 1
      runtimeRead += running.read
      runtimeRepointed += running.patches.length
      runtimeUnread += running.unread
      for (const one of running.unreadable) unreadable.push(`${lands}:${one}`)
    }
    if (relocating || applied.notes.length > 0) {
      entries.push({
        relPath: lands,
        body: applied.body,
        notes: applied.notes,
        moved: relocating,
      })
    }
  }
  return {
    entries,
    quarantined,
    generated,
    escaped,
    reading: { moving: moving.length, files, specifiers, repointed, unreached: [...unreached] },
    runtime: {
      files: runtimeFiles,
      read: runtimeRead,
      repointed: runtimeRepointed,
      unread: runtimeUnread,
      unreadable,
    },
  }
}

export function runtimeReading(reading: RuntimeReading): Outcome {
  const said =
    reading.repointed === 0
      ? `0 repointed across ${reading.files} module(s) — nothing here reaches what this call ` +
        "moves by a path written against its own directory"
      : `${reading.repointed} repointed across ${reading.files} module(s)`
  const detail =
    reading.unread === 0
      ? said
      : `${said}; ${reading.unread} base(s) build a path this cannot read, ` +
        `${reading.unreadable.length} of them where this call moves a file out from under one`
  const messages =
    reading.unreadable.length === 0
      ? []
      : [
          ...reading.unreadable,
          "nothing repoints these: each builds a path from its own file's directory and will not " +
            "say which path, and this call moves something out from under it. Rewriting a literal " +
            "that might not be the one meant breaks what still works, so the move stops here " +
            'instead. Write the path as one literal hanging off the base — `new URL("./x.json", ' +
            "import.meta.url)` — and land that BEFORE the move, which the repo stays green through",
        ]
  return {
    ...judge("runtime-paths", detail, messages),
    population: over(reading.read, "relative runtime path(s)"),
  }
}

export function specifierReading(reading: SpecifierReading): Outcome {
  if (reading.moving === 0) {
    return skip(
      "specifiers",
      "nothing being moved is a TypeScript module, so no import specifier can name one"
    )
  }
  const detail =
    reading.repointed === 0
      ? `0 repointed across ${reading.files} TypeScript file(s) — nothing here imports what this ` +
        "call moves, under any spelling this resolves"
      : `${reading.repointed} repointed across ${reading.files} TypeScript file(s)`
  const messages = reading.unreached.map(
    (one) =>
      `${one} is being moved and the survey never read it, so nothing can say what imports it, ` +
      "and its body would be taken away without landing anywhere"
  )
  return {
    ...judge("specifiers", detail, messages),
    population: over(reading.specifiers, "relative specifier(s)"),
  }
}
