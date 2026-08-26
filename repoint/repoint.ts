import { existsSync, readFileSync } from "node:fs"
import { judge, type Outcome, over, skip } from "../outcome/outcome.ts"
import { pathOf } from "../page/index/link/link.ts"
import { proseOnly } from "../page/markdown/markdown.ts"
import { stemOf } from "../page/name/name.ts"
import type { Roots } from "../page/page.ts"
import { trackedIn } from "../page/tracked/tracked.ts"
import { canonicalize, normalizeAbsolute } from "../repo/path/path.ts"
import {
  isAddressable,
  isDirty,
  isVendored,
  REPOS,
  targetRepo,
  targetRoot,
} from "../repo/roots/roots.ts"
import { decodeUtf8 } from "../utf8-body/utf8-body.ts"
import {
  escapedMentions,
  mentionPatches,
  type Patch,
  PATH_CHAR,
  PATH_TAIL,
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
  readonly escaped: readonly string[]
  readonly reading: SpecifierReading
}

export interface Importers {
  readonly roots: Roots
  readonly entries: readonly Repointed[]
  readonly files: number
  readonly specifiers: number
  readonly repointed: number
}

const LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g
const SPECIFIER_RE = /\b(?:from|import)\s*\(?\s*(["'])([^"']+)\1/g

const MODULE = ".ts"

const NUL = String.fromCharCode(0)

function dirOf(absolute: string): string {
  return absolute.slice(0, absolute.lastIndexOf("/"))
}

export function relativeBetween(fromDir: string, target: string): string {
  const from = fromDir.split("/").filter((s) => s !== "")
  const to = target.split("/").filter((s) => s !== "")
  let shared = 0
  while (shared < from.length && shared < to.length - 1 && from[shared] === to[shared]) shared += 1
  const up = Array.from({ length: from.length - shared }, () => "..")
  return [...up, ...to.slice(shared)].join("/")
}

function resolves(href: string, hostBefore: string): string | null {
  const target = pathOf(href)
  if (target === null) return null
  return target.startsWith("/")
    ? normalizeAbsolute(target)
    : normalizeAbsolute(`${dirOf(hostBefore)}/${target}`)
}

function retarget(
  href: string,
  hostBefore: string,
  hostAfter: string,
  moved: ReadonlyMap<string, string>
): string | null {
  const absolute = resolves(href, hostBefore)
  if (absolute === null) return null
  const cut = href.search(/[#?]/)
  const pathPart = cut === -1 ? href : href.slice(0, cut)
  const target = moved.get(absolute)
  if (target === undefined && hostBefore === hostAfter) return null
  const next = pathPart.startsWith("/")
    ? (target ?? absolute)
    : relativeBetween(dirOf(hostAfter), target ?? absolute)
  return next === pathPart ? null : next + (cut === -1 ? "" : href.slice(cut))
}

export function linkPatches(
  body: string,
  hostBefore: string,
  hostAfter: string,
  moved: ReadonlyMap<string, string>,
  taken: ReadonlySet<string>
): readonly Patch[] {
  const projected = proseOnly(body).split("\n")
  const patches: Patch[] = []
  let offset = 0
  body.split("\n").forEach((line, index) => {
    const prose = projected[index]
    if (prose !== undefined && prose.length === line.length) {
      for (const match of prose.matchAll(LINK_RE)) {
        const label = match[1] ?? ""
        const href = match[2] ?? ""
        const at = offset + (match.index ?? 0)
        const hrefAt = at + label.length + 3
        const next = retarget(href, hostBefore, hostAfter, moved)
        const mark = next === null ? -1 : next.search(/[#?]/)
        const bare = next === null ? "" : mark === -1 ? next : next.slice(0, mark)
        const spelled = next !== null && taken.has(bare) ? `./${next}` : next
        if (spelled !== null && spelled !== href) {
          patches.push({ start: hrefAt, end: hrefAt + href.length, text: spelled, was: href })
        }
        const target = resolves(href, hostBefore)
        const lands = target === null ? undefined : moved.get(target)
        if (lands === undefined || target === null) continue
        const named = stemOf(target)
        if (label !== named || stemOf(lands) === named) continue
        patches.push({ start: at + 1, end: at + 1 + label.length, text: stemOf(lands), was: label })
      }
    }
    offset += line.length + 1
  })
  return patches
}

const TS_FOR_JS: readonly (readonly [string, string])[] = [
  [".js", ".ts"],
  [".jsx", ".tsx"],
  [".mjs", ".mts"],
  [".cjs", ".cts"],
]

const IMPLIED = [".ts", ".tsx", ".mts", ".cts"] as const

interface Named {
  readonly to: string
  readonly spell: (relative: string) => string
}

function without(path: string, ending: string): string {
  return path.endsWith(ending) ? path.slice(0, -ending.length) : path
}

export function namesMoved(absolute: string, moved: ReadonlyMap<string, string>): Named | null {
  const written = moved.get(absolute)
  if (written !== undefined) return { to: written, spell: (relative) => relative }
  for (const [js, ts] of TS_FOR_JS) {
    if (!absolute.endsWith(js)) continue
    const to = moved.get(`${without(absolute, js)}${ts}`)
    if (to !== undefined) return { to, spell: (relative) => `${without(relative, ts)}${js}` }
  }
  for (const ending of IMPLIED) {
    const to = moved.get(`${absolute}${ending}`)
    if (to !== undefined) return { to, spell: (relative) => without(relative, ending) }
  }
  for (const ending of IMPLIED) {
    const to = moved.get(`${absolute}/index${ending}`)
    if (to === undefined) continue
    const index = `/index${ending}`
    return {
      to,
      spell: (relative) =>
        relative.endsWith(index) ? without(relative, index) : without(relative, ending),
    }
  }
  return null
}

function retargetSpecifier(
  spec: string,
  hostBefore: string,
  hostAfter: string,
  moved: ReadonlyMap<string, string>
): string | null {
  const absolute = resolves(spec, hostBefore)
  if (absolute === null) return null
  const cut = spec.search(/[#?]/)
  const pathPart = cut === -1 ? spec : spec.slice(0, cut)
  const named = namesMoved(absolute, moved)
  if (named === null && hostBefore === hostAfter) return null
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
  moved: ReadonlyMap<string, string>
): Specifiers {
  const patches: Patch[] = []
  let read = 0
  for (const match of body.matchAll(SPECIFIER_RE)) {
    const spec = match[2] ?? ""
    if (!spec.startsWith(".")) continue
    read += 1
    const next = retargetSpecifier(spec, hostBefore, hostAfter, moved)
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
    notes.push(`${body.slice(0, patch.start).split("\n").length}: \`${patch.was}\` → \`${patch.text}\``)
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

function trackedTexts(root: string): readonly { readonly relPath: string; readonly body: string }[] {
  let listed: readonly string[]
  try {
    listed = trackedIn(root)
  } catch {
    return []
  }
  const found: { relPath: string; body: string }[] = []
  for (const relPath of listed) {
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
  const seen = new Set([canonicalize(targetRoot(roots)), canonicalize(targetRoot(landing))])
  const found: Importers[] = []
  for (const repo of REPOS) {
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
      const named = isModule ? specifierPatches(body, host, host, moved) : NO_SPECIFIERS
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
  return { ...judge("importers", detail, []), population: over(specifiers, "relative specifier(s)") }
}

export function surveyRename(moves: Moves, roots: Roots, landing: Roots = roots): Survey {
  const root = targetRoot(roots)
  const landsIn = targetRoot(landing)
  const moved = movedAbsolute(moves, roots, landing)
  const entries: Repointed[] = []
  const quarantined: string[] = []
  const escaped: string[] = []
  const carried = reslugged(moves, roots)
  const keys = slugKeys(targetRepo(roots), roots)
  const taken = new Set(moves.keys())
  const moving = [...moves.keys()].filter((one) => one.endsWith(".ts"))
  const unreached = new Set(moving)
  let files = 0
  let specifiers = 0
  let repointed = 0
  for (const { relPath, body } of textFiles(root)) {
    unreached.delete(relPath)
    const lands = moves.get(relPath) ?? relPath
    const before = normalizeAbsolute(`${root}/${relPath}`)
    const after = lands === relPath ? before : normalizeAbsolute(`${landsIn}/${lands}`)
    const named = lands.endsWith(".ts")
      ? specifierPatches(body, before, after, moved)
      : NO_SPECIFIERS
    const applied = apply(body, [
      ...(lands.endsWith(".md") ? linkPatches(body, before, after, moved, taken) : []),
      ...named.patches,
      ...(lands.endsWith(".md") ? slugPatches(body, carried, keys) : []),
      ...mentionPatches(body, moves, roots),
    ])
    if (!isDirty(relPath)) {
      for (const one of escapedMentions(applied.body, moves)) escaped.push(`${lands}:${one}`)
    }
    if (isDirty(relPath) && lands === relPath) {
      for (const note of applied.notes) quarantined.push(`${relPath}:${note}`)
      continue
    }
    if (lands.endsWith(".ts")) {
      files += 1
      specifiers += named.read
      repointed += named.patches.length
    }
    if (lands !== relPath || applied.notes.length > 0) {
      entries.push({
        relPath: lands,
        body: applied.body,
        notes: applied.notes,
        moved: lands !== relPath,
      })
    }
  }
  return {
    entries,
    quarantined,
    escaped,
    reading: { moving: moving.length, files, specifiers, repointed, unreached: [...unreached] },
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
  return { ...judge("specifiers", detail, messages), population: over(reading.specifiers, "relative specifier(s)") }
}
