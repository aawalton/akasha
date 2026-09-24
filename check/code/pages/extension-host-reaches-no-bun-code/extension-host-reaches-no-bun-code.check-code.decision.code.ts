import { dirname, join, normalize } from "node:path"
import { cachedIn, cacheKept } from "akasha/check/modules/cache/check-cache.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { skimmedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { placedIn } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import type { Edge } from "akasha/graph/modules/asking/graph-asking.module.code.ts"
import { takenIn } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { codeImports } from "akasha/graph/predicate/pages/code-imports/code-imports.graph-predicate.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"
import ts from "typescript"
import { z } from "zod"

const LINKED = "linked-at"

const MANIFEST_PROPERTY = "workspace-manifest"

const ROOT_FOLDER = ""

const UNKNOWN = "so what the host loads is unknown"

export type Indexing = {
  readonly listed: (folder: string) => readonly string[]
  readonly valueAt: (path: string) => Value | null
  readonly fileKeysAt: () => ReadonlyMap<string, string | null>
}

function linkedIn(index: Indexing): string {
  const key = exportedAs(LINKED)
  const found: string[] = []
  for (const path of index.listed(ROOT_FOLDER)) {
    const value = index.valueAt(path)
    if (value === null || typeof value[key] !== "string") continue
    if (!found.includes(path)) found.push(path)
  }
  const page = found[0]
  if (page === undefined || found.length > 1) {
    throw new Error(
      `${found.length} pages state a \`${LINKED}\` at the checkout root, and the folder the ` +
        `editor is linked to is the folder of the one page stating it there, ${UNKNOWN}`
    )
  }
  return page
}

export const indexingOf = heldPerShadow(
  (shadow: Shadow): Indexing => ({
    listed: (folder) => shadow.listed(folder),
    valueAt: (path) => shadow.pageOf(path),
    fileKeysAt: () => shadow.index.fileKeysAt(),
  })
)

const MANIFEST_AT = new WeakMap<Indexing, string>()

export function manifestIn(index: Indexing): string {
  const held = MANIFEST_AT.get(index)
  if (held !== undefined) return held
  const named = index.fileKeysAt().get(MANIFEST_PROPERTY) ?? null
  if (named === null) {
    throw new Error(`no page property is slugged \`${MANIFEST_PROPERTY}\`, ${UNKNOWN}`)
  }
  const made = normalize(join(dirname(linkedIn(index)), named))
  MANIFEST_AT.set(index, made)
  return made
}

const MAIN = "main"

const ENTRY_NAMED = z.looseObject({ [MAIN]: z.string() })

const BUN = "bun:"

const GLOBAL = "Bun"

const SHOWN = 5

const HOST = "the editor loads this graph into node, which holds no bun"

export type Reached = {
  readonly specifiers: readonly string[]
  readonly global: boolean
}

const NOTHING: Reached = { specifiers: [], global: false }

function bunNamedIn(at: string, text: string): readonly string[] {
  return placedIn(at, text)
    .filter((one) => !one.typed && one.text.startsWith(BUN))
    .map((one) => one.text)
}

function globalRead(at: string, text: string): boolean {
  const source = skimmedAs(at, text)
  let found = false
  const over = (node: ts.Node): undefined => {
    if (ts.isIdentifier(node) && node.text === GLOBAL) found = true
    if (!found) ts.forEachChild(node, over)
  }
  ts.forEachChild(source, over)
  return found
}

function reachedIn(at: string, text: string): Reached {
  const asked = text.includes(GLOBAL)
  const named = text.includes(BUN)
  if (!asked && !named) return NOTHING
  return {
    specifiers: named ? bunNamedIn(at, text) : [],
    global: asked && globalRead(at, text),
  }
}

export type Walking = {
  readonly root: string
  readonly paths: readonly string[]
  readonly read: (path: string) => string | null
  readonly index: Answering
}

function entryIn(walking: Walking, manifest: string): string | null {
  const text = walking.read(manifest)
  if (text === null) return null
  let main: string | undefined
  try {
    main = ENTRY_NAMED.safeParse(JSON.parse(text)).data?.[MAIN]
  } catch {
    return null
  }
  if (main === undefined) return null
  return normalize(join(dirname(manifest), main))
}

function reasonFor(why: string, at: string, from: ReadonlyMap<string, string>): string {
  const held: string[] = []
  let here = at
  for (;;) {
    const said = from.get(here)
    if (said === undefined || held.length >= SHOWN) break
    held.push(said)
    here = said
  }
  if (held.length === 0) return `${why}, and the host loads it as its own entry — ${HOST}`
  const through = namesDrawn(held, ", reached from ")
  return `${why}, and the host reaches it from ${through} — ${HOST}`
}

function fromOver(entry: string, edges: readonly Edge[]): ReadonlyMap<string, string> {
  const beyond = new Map<string, string[]>()
  for (const edge of edges) {
    const held = beyond.get(edge.from)
    if (held === undefined) beyond.set(edge.from, [edge.to])
    else held.push(edge.to)
  }
  const from = new Map<string, string>()
  const seen = new Set([entry])
  const waiting = [entry]
  for (let here = waiting.shift(); here !== undefined; here = waiting.shift()) {
    for (const next of beyond.get(here) ?? []) {
      if (seen.has(next)) continue
      seen.add(next)
      from.set(next, here)
      waiting.push(next)
    }
  }
  return from
}

const SLUG = "extension-host-reaches-no-bun-code"

const CHECK_CODE = "check-code"

const PACKAGE = "package.json"

const KEPT_ROW = z.string()

function pageKeeping(index: Answering): string | null {
  return index.listedAt(CHECK_CODE, SLUG)[0]?.path ?? null
}

function keptIn(root: string, page: string): ReadonlySet<string> | null {
  const rows = cachedIn(root, page, KEPT_ROW)
  return rows === null ? null : new Set(rows)
}

function couldTurn(paths: readonly string[], manifest: string, kept: ReadonlySet<string>): boolean {
  for (const path of paths) {
    if (path === manifest || kept.has(path)) return true
    if (path === PACKAGE || path.endsWith(`/${PACKAGE}`)) return true
  }
  return false
}

function keeping(root: string, page: string, nodes: Iterable<string>): undefined {
  const held = new Set<string>(keptIn(root, page) ?? [])
  for (const one of nodes) held.add(one)
  cacheKept(root, page, [...held].sort())
  return undefined
}

export function refusalsOver(walking: Walking, manifest: string): readonly Judged[] {
  const page = pageKeeping(walking.index)
  const kept = page === null ? null : keptIn(walking.root, page)
  if (kept !== null && !couldTurn(walking.paths, manifest, kept)) return []
  const entry = entryIn(walking, manifest)
  if (entry === null) {
    return [{ path: manifest, reason: `this names no entry, so what the host loads is unknown` }]
  }
  const taken = takenIn(codeImports, [entry], {
    index: walking.index,
    bodyAt: (path) => walking.read(path),
  })
  if (page !== null) keeping(walking.root, page, taken.nodes)
  const from = fromOver(entry, taken.edges)
  const said: Judged[] = []
  for (const here of taken.nodes) {
    const text = walking.read(here)
    if (text === null) continue
    const reached = reachedIn(here, text)
    if (reached.global) {
      said.push({
        path: here,
        reason: reasonFor(`this reads the \`${GLOBAL}\` global`, here, from),
      })
    }
    for (const one of reached.specifiers) {
      said.push({ path: here, reason: reasonFor(`this names \`${one}\``, here, from) })
    }
  }
  return said
}
