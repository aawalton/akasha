import { createRequire } from "node:module"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import type { Judging } from "@akasha/checks/judging"
import type { Indexing } from "@akasha/indexes/indexing"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"

const CHECKING_IN = "@akasha/checks/checking"

const INDEXING_IN = "@akasha/indexes/indexing"

const PATCH = "patch"

const loadFrom = createRequire(import.meta.url)

function dirHere(): string | undefined {
  const meta: { readonly dir?: string; readonly dirname?: string; readonly url?: string } =
    import.meta
  const named = meta.dir ?? meta.dirname
  if (named !== undefined) return named
  if (meta.url === undefined) return undefined
  if (typeof fileURLToPath !== "function") return undefined
  return dirname(fileURLToPath(meta.url))
}

let heldHere: string | null = null

function here(): string {
  if (heldHere !== null) return heldHere
  const dir = dirHere()
  if (dir === undefined || dir === "") {
    throw new Error(`nothing here says where this file is, so nothing says where ${CHECKING_IN} is`)
  }
  heldHere = rootOf(dir)
  return heldHere
}

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

export const NO_GATE: Judging = { named: [], checksFor: () => [], over: async () => [] }

export type Built = { readonly gate: Judging } | { readonly broken: string }

type Checking = {
  readonly checksIn: (root: string) => readonly unknown[]
  readonly checksAt: (every: readonly unknown[], phase: string) => readonly unknown[]
  readonly judgingBy: (every: readonly unknown[]) => Judging
}

function checkingLoaded(): Checking {
  const held = loadFrom(join(here(), CHECKING_AT)) as Partial<Checking>
  const named = [held.checksIn, held.checksAt, held.judgingBy]
  if (named.some((one) => typeof one !== "function")) {
    throw new Error("it answers to no `checksIn`, `checksAt` and `judgingBy` a gate is built from")
  }
  return held as Checking
}

export type Keeping = (repo: string) => Indexing

export function indexingLoaded(): Keeping {
  const held = loadFrom(join(here(), INDEXING_AT)) as { readonly keepingIn?: unknown }
  if (typeof held.keepingIn !== "function") {
    throw new Error(`${INDEXING_AT} answers to no \`keepingIn\` the index is kept by`)
  }
  return held.keepingIn as Keeping
}

export function gateBuilt(root: string): Built {
  try {
    const held = checkingLoaded()
    return { gate: held.judgingBy(held.checksAt(held.checksIn(root), PATCH), PATCH) }
  } catch (thrown) {
    return { broken: whyOf(thrown) }
  }
}
