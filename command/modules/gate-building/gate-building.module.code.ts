import type { Judged, Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  altersChecks,
  type Laid,
  laidOut,
} from "akasha/check/modules/laying/check-laying.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import type { Indexing } from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import type { Settling } from "akasha/page/index/modules/settling/index-settling.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const CHANGE = "change"

export const CHECKING_IN = "akasha/check/modules/checking/checking.module.code.ts"

export const INDEXING_IN = "akasha/page/index/modules/indexing/indexing.module.code.ts"

const LOADED_BY: Readonly<Record<string, () => Promise<unknown>>> = {
  [CHECKING_IN]: () => import("akasha/check/modules/checking/checking.module.code.ts"),
  [INDEXING_IN]: () => import("akasha/page/index/modules/indexing/indexing.module.code.ts"),
}

async function loadFrom(name: string): Promise<Record<string, unknown>> {
  const load = LOADED_BY[name]
  if (load === undefined) throw new Error(`\`${name}\` is no module this file loads by name`)
  return (await load()) as Record<string, unknown>
}

export const NO_GATE: Judging = { named: [], checksFor: () => [], over: async () => [] }

type Built = { readonly gate: Judging } | { readonly broken: string }

type Checking = {
  readonly checkPagesIn: (root: string) => readonly string[]
  readonly checksIn: (root: string, from?: string) => readonly unknown[]
  readonly checksAt: (every: readonly unknown[], phase: string) => readonly unknown[]
  readonly judgingBy: (every: readonly unknown[], phase: string) => Judging
}

async function checkingLoaded(): Promise<Checking> {
  const held = (await loadFrom(CHECKING_IN)) as Partial<Checking>
  const named = [held.checkPagesIn, held.checksIn, held.checksAt, held.judgingBy]
  if (named.some((one) => typeof one !== "function")) {
    throw new Error(
      "it answers to no `checkPagesIn`, `checksIn`, `checksAt` and `judgingBy` a gate is built from"
    )
  }
  return held as Checking
}

const NOT_LAID = "the checks as this change leaves them would not load"

function judgingIn(held: Checking, root: string, from: string, phase: string): Judging {
  return held.judgingBy(held.checksAt(held.checksIn(root, from), phase), phase)
}

async function judgedAsLeft(
  held: Checking,
  root: string,
  phase: string,
  pages: readonly string[],
  change: Change,
  done?: string[]
): Promise<readonly Judged[]> {
  let laid: Laid | null = null
  try {
    let left: Judging
    try {
      laid = laidOut(change, pages)
      left = judgingIn(held, root, laid.from, phase)
    } catch (thrown) {
      return [
        { path: change.changed[0] ?? root, reason: `${NOT_LAID} — ${whyOf(thrown)}`, threw: true },
      ]
    }
    return await left.over(change, done)
  } finally {
    laid?.swept()
  }
}

function asLeft(held: Checking, root: string, phase: string, gate: Judging): Judging {
  const pages = held.checkPagesIn(root)
  return {
    named: gate.named,
    checksFor: gate.checksFor,
    over: async (change, done) => {
      if (!altersChecks(change, pages)) return await gate.over(change, done)
      return await judgedAsLeft(held, root, phase, pages, change, done)
    },
  }
}

export type Keeping = (repo: string, settled?: Settling | null) => Indexing

export async function indexingLoaded(): Promise<Keeping> {
  const held = (await loadFrom(INDEXING_IN)) as { readonly keepingIn?: unknown }
  if (typeof held.keepingIn !== "function") {
    throw new Error(`${INDEXING_IN} answers to no \`keepingIn\` the index is kept by`)
  }
  return held.keepingIn as Keeping
}

export async function gateFor(root: string, phase: string): Promise<Built> {
  try {
    const held = await checkingLoaded()
    return { gate: asLeft(held, root, phase, judgingIn(held, root, root, phase)) }
  } catch (thrown) {
    return { broken: whyOf(thrown) }
  }
}

export function gateBuilt(root: string): Promise<Built> {
  return gateFor(root, CHANGE)
}
