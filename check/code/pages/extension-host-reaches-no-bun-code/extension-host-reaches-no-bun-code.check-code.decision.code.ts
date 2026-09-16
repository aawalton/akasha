import { dirname, join, normalize } from "node:path"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { skimmedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { placedIn } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import type { Edge } from "akasha/graph/modules/asking/graph-asking.module.code.ts"
import { takenIn } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { codeImports } from "akasha/graph/predicate/pages/code-imports/code-imports.graph-predicate.ts"
import type { Carried } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"
import ts from "typescript"

const LINKED = "linked-at"

const MANIFEST_PROPERTY = "workspace-manifest"

const ROOT = "."

const UNKNOWN = "so what the host loads is unknown"

export type Indexing = {
  readonly carryingOf: (named: string) => Carried
  readonly valueAt: (path: string) => Value | null
  readonly fileKeysAt: () => ReadonlyMap<string, string | null>
}

function linkedIn(index: Indexing): string {
  const carried = index.carryingOf(LINKED)
  if ("refused" in carried) throw new Error(`${carried.refused}, ${UNKNOWN}`)
  const key = exportedAs(LINKED)
  const found: string[] = []
  for (const one of carried.carrying) {
    if (dirname(one.path) !== ROOT) continue
    const value = index.valueAt(one.path)
    if (value === null || typeof value[key] !== "string") continue
    if (!found.includes(one.path)) found.push(one.path)
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

function entryIn(change: Change, manifest: string): string | null {
  const text = textIn(change, manifest)
  if (text === null) return null
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return null
  }
  if (read === null || typeof read !== "object") return null
  const main = (read as Record<string, unknown>)[MAIN]
  if (typeof main !== "string") return null
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

export function refusalsOver(change: Change, shadow: Shadow, manifest: string): readonly Judged[] {
  const entry = entryIn(change, manifest)
  if (entry === null) {
    return [{ path: manifest, reason: `this names no entry, so what the host loads is unknown` }]
  }
  const taken = takenIn(codeImports, [entry], {
    index: shadow.index,
    bodyAt: (path) => textIn(change, path),
  })
  const from = fromOver(entry, taken.edges)
  const said: Judged[] = []
  for (const here of taken.nodes) {
    const text = textIn(change, here)
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
