import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import type { Indexing } from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import type { Settling } from "akasha/page/index/modules/settling/index-settling.module.code.ts"

const CHANGE = "change"

function loadFrom(name: string): Promise<Record<string, unknown>> {
  return import(name) as Promise<Record<string, unknown>>
}

export const CHECKING_IN = "akasha/check/modules/checking/checking.module.code.ts"

export const INDEXING_IN = "akasha/page/index/modules/indexing/indexing.module.code.ts"

export const NO_GATE: Judging = { named: [], checksFor: () => [], over: async () => [] }

export type Built = { readonly gate: Judging } | { readonly broken: string }

type Checking = {
  readonly checksIn: (root: string) => readonly unknown[]
  readonly checksAt: (every: readonly unknown[], phase: string) => readonly unknown[]
  readonly judgingBy: (every: readonly unknown[], phase: string) => Judging
}

async function checkingLoaded(): Promise<Checking> {
  const held = (await loadFrom(CHECKING_IN)) as Partial<Checking>
  const named = [held.checksIn, held.checksAt, held.judgingBy]
  if (named.some((one) => typeof one !== "function")) {
    throw new Error("it answers to no `checksIn`, `checksAt` and `judgingBy` a gate is built from")
  }
  return held as Checking
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
    return { gate: held.judgingBy(held.checksAt(held.checksIn(root), phase), phase) }
  } catch (thrown) {
    return { broken: whyOf(thrown) }
  }
}

export function gateBuilt(root: string): Promise<Built> {
  return gateFor(root, CHANGE)
}
