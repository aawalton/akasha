import { createRequire } from "node:module"
import { join, relative } from "node:path"
import type { Judging } from "@akasha/checks/judging"
import type { Indexing } from "@akasha/indexes/indexing"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"

const CHECKING_IN = "@akasha/checks/checking"

const INDEXING_IN = "@akasha/indexes/indexing"

const PATCH = "patch"

const loadFrom = createRequire(import.meta.url)

const HERE = rootOf(import.meta.path)

function pathOf(name: string): string {
  try {
    const at = loadFrom.resolve(name)
    return relative(rootOf(at), at)
  } catch {
    return name
  }
}

export const CHECKING_AT = pathOf(CHECKING_IN)

export const INDEXING_AT = pathOf(INDEXING_IN)

const CHECKING = join(HERE, CHECKING_AT)

const INDEXING = join(HERE, INDEXING_AT)

export const NO_GATE: Judging = { named: [], checksFor: () => [], over: () => [] }

export type Built = { readonly gate: Judging } | { readonly broken: string }

type Checking = {
  readonly checksIn: (root: string) => readonly unknown[]
  readonly checksAt: (every: readonly unknown[], phase: string) => readonly unknown[]
  readonly judgingBy: (every: readonly unknown[]) => Judging
}

function checkingLoaded(): Checking {
  const held = loadFrom(CHECKING) as Partial<Checking>
  const named = [held.checksIn, held.checksAt, held.judgingBy]
  if (named.some((one) => typeof one !== "function")) {
    throw new Error("it answers to no `checksIn`, `checksAt` and `judgingBy` a gate is built from")
  }
  return held as Checking
}

export type Keeping = (repo: string) => Indexing

export function indexingLoaded(): Keeping {
  const held = loadFrom(INDEXING) as { readonly keepingIn?: unknown }
  if (typeof held.keepingIn !== "function") {
    throw new Error(`${INDEXING_AT} answers to no \`keepingIn\` the index is kept by`)
  }
  return held.keepingIn as Keeping
}

export function gateBuilt(root: string): Built {
  try {
    const held = checkingLoaded()
    return { gate: held.judgingBy(held.checksAt(held.checksIn(root), PATCH)) }
  } catch (thrown) {
    return { broken: whyOf(thrown) }
  }
}
