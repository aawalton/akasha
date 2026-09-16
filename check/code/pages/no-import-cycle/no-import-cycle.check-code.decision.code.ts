import {
  textIn,
  textNamed,
  textWas,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  type Edge,
  edgesOutOver,
  type Stepping,
} from "akasha/graph/modules/asking/graph-asking.module.code.ts"
import {
  type Asked,
  reachingOf,
  takenIn,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { atLoadImports } from "akasha/graph/predicate/pages/at-load-imports/at-load-imports.graph-predicate.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"

const SHOWN = 3

const ITSELF = "no module under akasha imports its way back around to itself"

const KINDS = atLoadImports.edges.map(slugOf)

const FOLLOWS = atLoadImports.follows.map((one) => [slugOf(one.attribute), one.value] as const)

export type Added = {
  readonly from: string
  readonly to: string
}

type Bodies = (path: string) => string | null

function atLoad(edge: Edge): boolean {
  return FOLLOWS.every(([attribute, value]) => edge.attrs[attribute] === value)
}

function bodiesOf(read: Bodies): Bodies {
  const held = new Map<string, string | null>()
  return (path) => {
    if (held.has(path)) return held.get(path) ?? null
    const text = read(path)
    held.set(path, text)
    return text
  }
}

function askedOf(shadow: Shadow, read: Bodies): Asked {
  const bodyAt = bodiesOf(read)
  const through = (path: string): boolean => textNamed(path) && bodyAt(path) !== null
  return { index: shadow.index, bodyAt, through }
}

export function reachingIn(change: Change, shadow: Shadow): ReadonlyMap<string, readonly string[]> {
  const seeds = change.changed.filter((one) => textNamed(one))
  const asked = askedOf(shadow, (path) => textIn(change, path))
  return reachingOf(takenIn(atLoadImports, seeds, asked))
}

function outOf(at: string, stepping: Stepping, read: Bodies): readonly string[] {
  const found: string[] = []
  for (const one of stepping(at)) {
    if (!atLoad(one) || found.includes(one.to)) continue
    if (!textNamed(one.to) || read(one.to) === null) continue
    found.push(one.to)
  }
  return found
}

export function addedIn(change: Change, shadow: Shadow): readonly Added[] {
  const after = bodiesOf((path) => textIn(change, path))
  const before = bodiesOf((path) => textWas(change, path))
  const now = edgesOutOver(KINDS, shadow.index, after)
  const said: Added[] = []
  let was: Stepping | null = null
  for (const from of change.changed) {
    if (!textNamed(from)) continue
    const reached = outOf(from, now, after)
    if (reached.length === 0) continue
    if (was === null) was = edgesOutOver(KINDS, shadow.index, before)
    const had = new Set(outOf(from, was, before))
    for (const to of reached) {
      if (had.has(to)) continue
      said.push({ from, to })
    }
  }
  return said
}

function heldBack(came: ReadonlyMap<string, string>, edge: Added): readonly string[] {
  const held: string[] = [edge.from]
  let at = came.get(edge.from)
  while (at !== undefined) {
    held.push(at)
    at = came.get(at)
  }
  return held
}

function cameFrom(
  at: string,
  reaching: ReadonlyMap<string, readonly string[]>
): ReadonlyMap<string, string> {
  const came = new Map<string, string>()
  const seen = new Set<string>([at])
  const queue: string[] = [at]
  for (let one = queue.shift(); one !== undefined; one = queue.shift()) {
    for (const next of reaching.get(one) ?? []) {
      if (seen.has(next)) continue
      seen.add(next)
      came.set(next, one)
      queue.push(next)
    }
  }
  return came
}

function cycleFor(
  reaching: ReadonlyMap<string, readonly string[]>,
  edge: Added
): readonly string[] | null {
  if (edge.to === edge.from) return [edge.from]
  const came = cameFrom(edge.to, reaching)
  return came.has(edge.from) ? heldBack(came, edge) : null
}

export function cyclesIn(
  reaching: ReadonlyMap<string, readonly string[]>
): readonly (readonly string[])[] {
  let counted = 0
  const index = new Map<string, number>()
  const low = new Map<string, number>()
  const onStack = new Set<string>()
  const stack: string[] = []
  const found: string[][] = []
  const walk = (at: string): undefined => {
    index.set(at, counted)
    low.set(at, counted)
    counted += 1
    stack.push(at)
    onStack.add(at)
    for (const next of reaching.get(at) ?? []) {
      if (!index.has(next)) {
        walk(next)
        low.set(at, Math.min(low.get(at) ?? 0, low.get(next) ?? 0))
        continue
      }
      if (onStack.has(next)) low.set(at, Math.min(low.get(at) ?? 0, index.get(next) ?? 0))
    }
    if (low.get(at) !== index.get(at)) return
    const held: string[] = []
    let said: string | undefined
    do {
      said = stack.pop()
      if (said === undefined) break
      onStack.delete(said)
      held.push(said)
    } while (said !== at)
    if (held.length > 1 || (reaching.get(at) ?? []).includes(at)) found.push([...held].sort())
  }
  for (const at of [...reaching.keys()].sort()) if (!index.has(at)) walk(at)
  return found
}

function reasonFor(at: string, held: readonly string[]): string {
  const others = held.filter((one) => one !== at)
  if (others.length === 0) return `imports itself — ${ITSELF}`
  const first = namesDrawn(others.slice(0, SHOWN))
  const rest = others.length > SHOWN ? `, and ${others.length - SHOWN} more` : ""
  return `sits in a cycle reaching ${first}${rest} — ${ITSELF}`
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = new Set(change.changed)
  const said: Judged[] = []
  for (const held of cyclesIn(reachingIn(change, shadow))) {
    if (!held.some((one) => carried.has(one))) continue
    for (const path of held) said.push({ path, reason: reasonFor(path, held) })
  }
  return said.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}

export function refusalsAdded(change: Change, shadow: Shadow): readonly Judged[] {
  const added = addedIn(change, shadow)
  if (added.length === 0) return []
  const asked = askedOf(shadow, (path) => textIn(change, path))
  const seeds = added.map((one) => one.to)
  const reaching = reachingOf(takenIn(atLoadImports, seeds, asked))
  const said = new Map<string, Judged>()
  for (const edge of added) {
    const found = cycleFor(reaching, edge)
    if (found === null) continue
    const held = [...found].sort()
    for (const path of held) {
      if (said.has(path)) continue
      said.set(path, { path, reason: reasonFor(path, held) })
    }
  }
  return [...said.values()].sort((one, two) =>
    one.path < two.path ? -1 : one.path > two.path ? 1 : 0
  )
}
