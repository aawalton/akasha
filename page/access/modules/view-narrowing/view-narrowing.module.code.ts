import type { PagesDeps } from "akasha/page/access/modules/answer/answer.module.code.ts"
import type { PropertyDefinition } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"
import { readTargetPageTypeSlug } from "akasha/page/core/property-type/modules/relation/relation.module.code.ts"
import { foldedInLowerCamelCase } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"
import type { Asked } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  matches,
  TESTS_RUN,
  type Test,
} from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"

const VIEW = "view"

const VIEWS = "view"

const RELATION = "relation"

const LISTED_AT_MOST = 5_000

const OVER_A_LIST: ReadonlySet<string> = new Set(["in", "not-in"])

const ORDERED: ReadonlySet<string> = new Set([
  "at-or-after",
  "after",
  "before",
  "at-or-before",
  "before-or-empty",
])

const MOMENTS: ReadonlySet<string> = new Set(["now", "eso-day", "eso-day-next"])

export type Narrow = {
  readonly key: string
  readonly comparison: string
  readonly values: readonly string[]
}

type Where = Readonly<Record<string, Test>>

type Narrowed = { readonly where: Where } | { readonly refused: string }

export type NamesOf = (
  pageTypeSlug: string,
  key: string,
  kept: (held: unknown) => boolean
) => Promise<readonly string[] | { readonly refused: string }>

function numbered(raw: string): string | number {
  const number = Number(raw)
  return raw.trim() !== "" && Number.isFinite(number) ? number : raw
}

export function testOf(narrow: Narrow): Test | null {
  const { comparison, values } = narrow
  if (!TESTS_RUN.includes(comparison) || values.some((one) => MOMENTS.has(one))) return null
  if (comparison === "empty") return { empty: values[0] !== "false" }
  if (OVER_A_LIST.has(comparison)) return { [comparison]: [...values] }
  const first = values[0]
  if (first === undefined) return null
  return { [comparison]: ORDERED.has(comparison) ? numbered(first) : first }
}

function heldLike(held: unknown, raw: string): unknown {
  if (typeof held === "boolean") return raw === "true"
  if (typeof held === "number") return Number(raw)
  return raw
}

function keptBy(narrow: Narrow): (held: unknown) => boolean {
  const { comparison, values } = narrow
  return (held) => {
    const bound = OVER_A_LIST.has(comparison)
      ? values.map((one) => heldLike(held, one))
      : heldLike(held, values[0] ?? "")
    return matches(held, comparison, bound)
  }
}

export async function whereOf(
  narrows: readonly Narrow[],
  definitions: readonly PropertyDefinition[],
  namesOf: NamesOf
): Promise<Narrowed> {
  const where: Record<string, Test> = {}
  for (const narrow of narrows) {
    const [head = "", ...rest] = narrow.key.split(".")
    const key = foldedInLowerCamelCase(head)
    if (key in where) return { refused: `\`${narrow.key}\` is narrowed twice by one view` }
    if (rest.length === 0) {
      const test = testOf(narrow)
      if (test === null) return { refused: `\`${narrow.key}\` is narrowed by no test asked here` }
      where[key] = test
      continue
    }
    const relation = definitions.find((one) => one.id === key)
    const target = relation?.type === RELATION ? readTargetPageTypeSlug(relation.config) : undefined
    if (target === undefined || rest.length > 1 || testOf(narrow) === null) {
      return { refused: `\`${narrow.key}\` reaches through no relation asked here` }
    }
    const names = await namesOf(target, foldedInLowerCamelCase(rest[0] ?? ""), keptBy(narrow))
    if ("refused" in names) return names
    where[key] = { in: [...names] }
  }
  return { where }
}

function narrowsIn(held: unknown): readonly Narrow[] | null {
  if (!Array.isArray(held)) return null
  const found: Narrow[] = []
  for (const one of held) {
    const { key, comparison, values } = (one ?? {}) as Record<string, unknown>
    if (typeof key !== "string" || typeof comparison !== "string" || !Array.isArray(values)) {
      return null
    }
    found.push({ key, comparison, values: values.map(String) })
  }
  return found
}

function rowsOr(asked: Asked): readonly Readonly<Record<string, unknown>>[] | { refused: string } {
  return "refused" in asked ? { refused: asked.refused } : asked.rows
}

function namesOver(deps: PagesDeps): NamesOf {
  return async (pageTypeSlug, key, kept) => {
    const rows = rowsOr(
      await deps.ask(pageTypeSlug, LISTED_AT_MOST, ["slug", "type", key], undefined)
    )
    if ("refused" in rows) return rows
    const names: string[] = []
    for (const row of rows) {
      if (kept(row[key]) && typeof row.type === "string" && typeof row.slug === "string") {
        names.push(`${row.type}/${row.slug}`)
      }
    }
    return names.sort()
  }
}

async function narrowedBy(view: string, pageTypeSlug: string, deps: PagesDeps): Promise<Narrowed> {
  const where = { slug: { is: view } }
  const rows = rowsOr(await deps.ask(VIEWS, 1, ["pageType", "narrows"], where))
  if ("refused" in rows) return rows
  const row = rows[0]
  if (row === undefined) return { refused: `no view is slugged \`${view}\`` }
  if (row.pageType !== `page-type/${pageTypeSlug}`) {
    return { refused: `the view \`${view}\` lists no \`${pageTypeSlug}\`` }
  }
  const narrows = narrowsIn(row.narrows ?? [])
  if (narrows === null) return { refused: `the view \`${view}\` states narrows this cannot read` }
  return whereOf(narrows, await deps.definitionsFor(pageTypeSlug), namesOver(deps))
}

function joined(where: Where | undefined, more: Where): Where | null {
  if (where === undefined) return more
  if (Object.keys(more).some((key) => key in where)) return null
  return { ...where, ...more }
}

export function viewNarrowing(request: Request, pageTypeSlug: string, deps: PagesDeps): PagesDeps {
  const view = new URL(request.url).searchParams.get(VIEW)
  if (view === null) return deps
  return {
    ...deps,
    ask: async (slug, limit, keys, where) => {
      if (slug !== pageTypeSlug) return deps.ask(slug, limit, keys, where)
      const narrowed = await narrowedBy(view, pageTypeSlug, deps)
      if ("refused" in narrowed) return narrowed
      const both = joined(where, narrowed.where)
      if (both === null) return { refused: `the view \`${view}\` narrows a key already narrowed` }
      return deps.ask(slug, limit, keys, both)
    },
  }
}
