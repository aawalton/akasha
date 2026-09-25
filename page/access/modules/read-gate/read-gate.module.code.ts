import type { PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { Test } from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"

export type Narrow = { readonly key: string; readonly is: string }

export type Reach =
  | { readonly permitted: false; readonly why: string }
  | { readonly permitted: true; readonly narrows: readonly Narrow[] | null }

export type ReadGate = (pageTypeSlug: string) => Promise<Reach>

const DISAGREEING =
  "the accesses reaching this page type narrow it by different keys, and one question asks by one key"

export class Withheld extends Error {
  readonly pageTypeSlug: string

  constructor(pageTypeSlug: string, why: string) {
    super(`the pages of \`${pageTypeSlug}\` are withheld from this reader: ${why}`)
    this.name = "Withheld"
    this.pageTypeSlug = pageTypeSlug
  }
}

type Narrowing =
  | { readonly narrowed: "no" }
  | { readonly narrowed: "disagree" }
  | { readonly narrowed: "to"; readonly key: string; readonly values: readonly string[] }

const NOT_NARROWED: Narrowing = { narrowed: "no" }

const DISAGREE: Narrowing = { narrowed: "disagree" }

function narrowedTo(narrows: readonly Narrow[] | null): Narrowing {
  if (narrows === null) return NOT_NARROWED
  const keys = new Set(narrows.map((one) => one.key))
  if (keys.size !== 1) return DISAGREE
  const key = [...keys][0] as string
  return { narrowed: "to", key, values: narrows.map((one) => one.is) }
}

export function askedNarrow(
  narrows: readonly Narrow[] | null
): Readonly<Record<string, Test>> | undefined | null {
  const narrowing = narrowedTo(narrows)
  if (narrowing.narrowed === "no") return undefined
  if (narrowing.narrowed === "disagree") return null
  const only = narrowing.values[0] as string
  return narrowing.values.length === 1
    ? { [narrowing.key]: { is: only } }
    : { [narrowing.key]: { in: narrowing.values } }
}

let finder: (() => ReadGate | null) | null = null

export function gateFoundBy(found: () => ReadGate | null): undefined {
  finder = found
}

export function gateInScope(): ReadGate | null {
  return finder === null ? null : finder()
}

async function reachFor(pageTypeSlug: string): Promise<Reach | null> {
  const gate = gateInScope()
  if (gate === null) return null
  const reach = await gate(pageTypeSlug)
  if (!reach.permitted) throw new Withheld(pageTypeSlug, reach.why)
  return reach
}

export async function whereHeldTo(
  pageTypeSlug: string,
  where: PageWhere | undefined
): Promise<PageWhere | undefined> {
  const reach = await reachFor(pageTypeSlug)
  if (reach === null || !reach.permitted) return where
  const narrowing = narrowedTo(reach.narrows)
  if (narrowing.narrowed === "no") return where
  if (narrowing.narrowed === "disagree") throw new Withheld(pageTypeSlug, DISAGREEING)
  const only = narrowing.values[0] as string
  const held =
    narrowing.values.length === 1
      ? { key: narrowing.key, eq: only }
      : { key: narrowing.key, in: [...narrowing.values] }
  return [...(where ?? []), held]
}

export async function testsHeldTo(
  pageTypeSlug: string,
  tests: Readonly<Record<string, Test>>
): Promise<Readonly<Record<string, Test>>> {
  const reach = await reachFor(pageTypeSlug)
  if (reach === null || !reach.permitted) return tests
  const asked = askedNarrow(reach.narrows)
  if (asked === null) throw new Withheld(pageTypeSlug, DISAGREEING)
  return asked === undefined ? tests : { ...tests, ...asked }
}
