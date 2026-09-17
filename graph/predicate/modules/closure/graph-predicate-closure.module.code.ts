import {
  type Edge,
  edgesInto,
  edgesOutOver,
  type Stepping,
  settledOf,
} from "akasha/graph/modules/asking/graph-asking.module.code.ts"
import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type { Body } from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const IN = "in"

const OUT = "out"

const AT_THE_SEEDS = 0

const ALONE = 1

const BEFORE = -1

const AFTER = 1

const ALIKE = 0

function every(): boolean {
  return true
}

function wantedIn(predicate: GraphPredicate): ReadonlyMap<string, readonly string[]> {
  const grouped = new Map<string, string[]>()
  for (const one of predicate.follows ?? []) {
    const attribute = slugOf(one.attribute)
    const held = grouped.get(attribute)
    if (held === undefined) grouped.set(attribute, [one.value])
    else held.push(one.value)
  }
  return grouped
}

function followed(predicate: GraphPredicate): (edge: Edge) => boolean {
  const wanted = [...wantedIn(predicate)]
  if (wanted.length === 0) return every
  return (edge) =>
    wanted.every(([attribute, values]) => {
      const held = edge.attrs[attribute]
      if (held === undefined) {
        throw new Error(
          `the \`${edge.kind}\` edge carries no \`${attribute}\`, so the \`${predicate.slug}\` predicate could not follow it`
        )
      }
      return values.includes(held)
    })
}

export type Taken = {
  readonly nodes: readonly string[]
  readonly reached: readonly string[]
  readonly edges: readonly Edge[]
  readonly stepsTo: ReadonlyMap<string, number>
}

function closedOver(
  seeds: readonly string[],
  through: (path: string) => boolean,
  stepping: Stepping,
  farOf: (edge: Edge) => string,
  follows: (edge: Edge) => boolean
): Taken {
  const stepsTo = new Map<string, number>()
  for (const one of seeds) if (through(one)) stepsTo.set(one, AT_THE_SEEDS)
  const reached = [...stepsTo.keys()]
  const edges: Edge[] = []
  for (let at = 0; at < reached.length; at += 1) {
    const one = reached[at]
    if (one === undefined) continue
    const beyond = (stepsTo.get(one) ?? AT_THE_SEEDS) + 1
    for (const edge of stepping(one)) {
      if (!follows(edge)) continue
      const next = farOf(edge)
      if (!through(next)) continue
      edges.push(edge)
      if (stepsTo.has(next)) continue
      stepsTo.set(next, beyond)
      reached.push(next)
    }
  }
  return { nodes: [...reached].sort(), reached, edges: settledOf(edges), stepsTo }
}

export type Asked = {
  readonly index: Answering
  readonly bodyAt?: Body
  readonly through?: (path: string) => boolean
}

export function takenIn(predicate: GraphPredicate, seeds: readonly string[], asked: Asked): Taken {
  const kinds = predicate.edges.map(slugOf)
  const through = asked.through ?? every
  const follows = followed(predicate)
  if (predicate.direction === IN) {
    const index = asked.index
    return closedOver(
      seeds,
      through,
      (one) => edgesInto(one, kinds, index),
      (edge) => edge.from,
      follows
    )
  }
  if (predicate.direction !== OUT) {
    throw new Error(
      `the \`${predicate.slug}\` predicate is followed \`${predicate.direction}\`, which is neither \`${IN}\` nor \`${OUT}\``
    )
  }
  const bodyAt = asked.bodyAt
  if (bodyAt === undefined) {
    throw new Error(
      `the \`${predicate.slug}\` predicate is followed out of a body, and this ask hands in no reader of bodies`
    )
  }
  return closedOver(
    seeds,
    through,
    edgesOutOver(kinds, asked.index, bodyAt),
    (edge) => edge.to,
    follows
  )
}

export function closureOf(
  predicate: GraphPredicate,
  seeds: readonly string[],
  asked: Asked
): readonly string[] {
  return takenIn(predicate, seeds, asked).nodes
}

export function reachingOf(taken: Taken): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const one of taken.nodes) found.set(one, [])
  for (const one of taken.edges) {
    const held = found.get(one.from)
    if (held !== undefined) held.push(one.to)
  }
  return found
}

function firstOf(held: readonly string[]): string {
  return held[0] ?? ""
}

function byFirst(one: readonly string[], two: readonly string[]): number {
  const here = firstOf(one)
  const there = firstOf(two)
  return here < there ? BEFORE : here > there ? AFTER : ALIKE
}

export function loopsIn(taken: Taken): readonly (readonly string[])[] {
  const reaching = reachingOf(taken)
  const index = new Map<string, number>()
  const low = new Map<string, number>()
  const onStack = new Set<string>()
  const stack: string[] = []
  const found: string[][] = []
  let counted = 0
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
    if (held.length > ALONE || (reaching.get(at) ?? []).includes(at)) found.push([...held].sort())
  }
  for (const at of [...reaching.keys()].sort()) if (!index.has(at)) walk(at)
  return found.sort(byFirst)
}
