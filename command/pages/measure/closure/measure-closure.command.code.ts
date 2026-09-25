import {
  type Cost,
  closing,
  costOf,
  opening,
} from "akasha/check/modules/cost/check-cost.module.code.ts"
import { bytesAs, secondsAs } from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { closureSeed } from "akasha/command/argument/pages/closure-seed.argument.ts"
import { predicate as predicateArgument } from "akasha/command/argument/pages/predicate.argument.ts"
import { faulted, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measureClosure as page } from "akasha/command/pages/measure/closure/measure-closure.command.ts"
import { columnsOf } from "akasha/command/pages/measure/modules/checkout-counting/checkout-counting.module.code.ts"
import type { GraphPredicate } from "akasha/graph/predicate/graph-predicate.page-type.types.ts"
import {
  type Taken,
  takenIn,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import {
  type Body,
  bodiesAt,
} from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import {
  slugsOfType,
  valuedAt,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"

const PREDICATE = "graph-predicate"

const CLOSURE = "closure"

const NO_RUN = ""

const NOTHING_CHANGED = 0

const NO_REFUSAL = 0

const ABSENT = "-"

const A_THOUSAND = 1000

const HEADED: readonly string[] = ["seeds", "nodes", "edges", "cpu", "wall", "mem"]

type Spent = {
  readonly cpuSeconds: number
  readonly wallSeconds: number
  readonly bytes: number | null
}

export function thereAre(there: readonly string[]): string {
  return `the predicates there are ${namesDrawn(there)}`
}

export function noPredicate(slug: string, there: readonly string[]): readonly string[] {
  if (there.includes(slug)) return []
  return [`\`${slug}\` is no predicate — the graph carries ${namesDrawn(there)}`]
}

export function noSeed(seeds: readonly string[], bodyAt: Body): readonly string[] {
  return seeds
    .filter((one) => bodyAt(one) === null)
    .map((one) => `\`${one}\` is no file this checkout holds, and a seed is one`)
}

function spentIn(cost: Cost): Spent {
  return {
    cpuSeconds: cost.cpuSeconds + cost.childCpuSeconds,
    wallSeconds: cost.wallMs / A_THOUSAND,
    bytes: cost.peakMeasured ? cost.peakAddedBytes : null,
  }
}

export function linesFor(
  named: string,
  seeds: number,
  taken: Taken,
  spent: Spent
): readonly string[] {
  return [
    ...columnsOf([
      [CLOSURE, ...HEADED],
      [
        named,
        String(seeds),
        String(taken.nodes.length),
        String(taken.edges.length),
        secondsAs(spent.cpuSeconds),
        secondsAs(spent.wallSeconds),
        spent.bytes === null ? ABSENT : bytesAs(spent.bytes),
      ],
    ]),
  ]
}

export function measureClosure(argv: readonly string[], given: Given): Answer {
  try {
    const there = slugsOfType(given.root, PREDICATE)
    const read = takenFor(argv, given.calledAs, page, [predicateArgument, closureSeed])
    if ("refused" in read) return mistaking([...read.refused, thereAre(there)])
    const slug = read.taken.predicate
    const seeds = read.taken.closureSeed
    const bodyAt = bodiesAt(given.root)
    const refusals = [...noPredicate(slug, there), ...noSeed(seeds, bodyAt)]
    if (refusals.length > 0) return mistaking(refusals)
    const predicate = valuedAt(given.root, PREDICATE, slug).value as GraphPredicate
    const index = shadowAt(given.root).index
    const before = opening()
    const taken = takenIn(predicate, seeds, { index, bodyAt })
    const cost = costOf(before, closing(), NO_RUN, CLOSURE, slug, NOTHING_CHANGED, NO_REFUSAL)
    return told([...linesFor(slug, seeds.length, taken, spentIn(cost))])
  } catch (thrown) {
    return faulted(thrown)
  }
}
