import { createRequire } from "node:module"
import { join } from "node:path"
import type { Judging } from "../../checks-system/judging/judging.module.code.ts"
import type { Indexing } from "../../pages-system/indexes/indexing/indexing.module.code.ts"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"

export const CHECKING_AT = "akasha/checks-system/checking/checking.module.code.ts"

export const INDEXING_AT = "akasha/pages-system/indexes/indexing/indexing.module.code.ts"

const HERE = rootOf(import.meta.path)

const CHECKING = join(HERE, CHECKING_AT)

const INDEXING = join(HERE, INDEXING_AT)

const PATCH = "patch"

const loadFrom = createRequire(import.meta.url)

export const NO_GATE: Judging = { named: [], over: () => [] }

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
