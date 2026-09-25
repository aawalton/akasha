import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
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
  loopsThrough,
  type Taken,
  takenIn,
  wayFrom,
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

type Added = {
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

export function askedOf(paged: Paged, read: Bodies): Asked {
  const bodyAt = bodiesOf(read)
  const through = (path: string): boolean => textNamed(path) && bodyAt(path) !== null
  return { index: paged.index, bodyAt, through }
}

export function takenOver(paths: readonly string[], paged: Paged, read: Bodies): Taken {
  const seeds = paths.filter((one) => textNamed(one))
  return takenIn(atLoadImports, seeds, askedOf(paged, read))
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

function reasonFor(at: string, held: readonly string[]): string {
  const others = held.filter((one) => one !== at)
  if (others.length === 0) return `imports itself — ${ITSELF}`
  const first = namesDrawn(others.slice(0, SHOWN))
  const rest = others.length > SHOWN ? `, and ${others.length - SHOWN} more` : ""
  return `sits in a cycle reaching ${first}${rest} — ${ITSELF}`
}

export function refusalsOver(
  paths: readonly string[],
  paged: Paged,
  read: Bodies
): readonly Judged[] {
  const said: Judged[] = []
  for (const held of loopsThrough(takenOver(paths, paged, read), paths)) {
    for (const path of held) said.push({ path, reason: reasonFor(path, held) })
  }
  return said.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}

export function refusalsAdded(change: Change, shadow: Shadow): readonly Judged[] {
  const added = addedIn(change, shadow)
  if (added.length === 0) return []
  const asked = askedOf(shadow, (path) => textIn(change, path))
  const seeds = added.map((one) => one.to)
  const taken = takenIn(atLoadImports, seeds, asked)
  const said = new Map<string, Judged>()
  for (const edge of added) {
    const found = wayFrom(taken, edge.to, edge.from)
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
