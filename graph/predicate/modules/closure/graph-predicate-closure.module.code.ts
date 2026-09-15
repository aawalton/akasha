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

function every(): boolean {
  return true
}

export type Taken = {
  readonly nodes: readonly string[]
  readonly edges: readonly Edge[]
}

function closedOver(
  seeds: readonly string[],
  through: (path: string) => boolean,
  stepping: Stepping,
  farOf: (edge: Edge) => string
): Taken {
  const found = new Set(seeds.filter((one) => through(one)))
  const waiting = [...found]
  const edges: Edge[] = []
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    for (const edge of stepping(one)) {
      const next = farOf(edge)
      if (!through(next)) continue
      edges.push(edge)
      if (found.has(next)) continue
      found.add(next)
      waiting.push(next)
    }
  }
  return { nodes: [...found].sort(), edges: settledOf(edges) }
}

export type Asked = {
  readonly index: Answering
  readonly bodyAt?: Body
  readonly through?: (path: string) => boolean
}

export function takenIn(predicate: GraphPredicate, seeds: readonly string[], asked: Asked): Taken {
  const kinds = predicate.edges.map(slugOf)
  const through = asked.through ?? every
  if (predicate.direction === IN) {
    const index = asked.index
    return closedOver(
      seeds,
      through,
      (one) => edgesInto(one, kinds, index),
      (edge) => edge.from
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
  return closedOver(seeds, through, edgesOutOver(kinds, asked.index, bodyAt), (edge) => edge.to)
}

export function closureOf(
  predicate: GraphPredicate,
  seeds: readonly string[],
  asked: Asked
): readonly string[] {
  return takenIn(predicate, seeds, asked).nodes
}
