import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  bodyOf,
  graphedRepo,
  type Named,
  thePage,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  type Asked,
  asking,
  type Climbing,
  climbing,
  type Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

const TREE = "akasha"

const heldId = (one: string): string => `01a04a4a-0009-7000-8000-00000000000${one}`

function typed(one: string, slug: string, above: readonly string[], owner?: string): Named {
  return thePage({
    id: heldId(one),
    pageTypeSlug: "page-type",
    slug,
    extends: above.map((held) => `page-type/${held}`),
    ...(owner === undefined ? {} : { owner }),
  })
}

const HELD: readonly Named[] = [
  thePage({
    id: heldId("1"),
    pageTypeSlug: "graph-attribute",
    slug: "property",
    definition: "the property one page named another page under",
  }),
  thePage({
    id: heldId("2"),
    pageTypeSlug: "graph-edge",
    slug: "relation",
    definition: "one page naming another page under a property",
    attributes: ["graph-attribute/property"],
  }),
  typed("3", "tied", ["tied-first", "tied-second"]),
  typed("4", "tied-first", [], "first-owner"),
  typed("5", "tied-second", [], "second-owner"),
  typed("6", "stated", ["stated-one", "stated-two"]),
  typed("7", "stated-one", []),
  typed("8", "stated-two", [], "account-page"),
  typed("9", "nearer", ["nearer-close", "nearer-apart"]),
  typed("a", "nearer-close", ["nearer-distant"]),
  typed("b", "nearer-apart", [], "apart-owner"),
  typed("c", "nearer-distant", [], "distant-owner"),
  typed("d", "missing", ["missing-there", "nothing-holds-this"]),
  typed("e", "missing-there", [], "there-owner"),
]

export const root = rootOf(import.meta.dir)

export const climbedInRepo: Climbing = climbing(root)

export const climbedInTypes: Climbing = climbing(
  graphedRepo(Object.fromEntries(HELD.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])))
)

export function rowsOf(asked: Asked): readonly Record<string, unknown>[] {
  if ("refused" in asked) throw new Error(`refused: ${asked.refused}`)
  return asked.rows
}

export function slugsOf(asked: Asked): readonly unknown[] {
  return rowsOf(asked).map((one) => one.slug)
}

export function over(where: unknown): Asked {
  return asking(root, {
    pageTypeSlug: "decision-kind",
    where: where as Query["where"],
    keys: ["slug"],
  })
}

export function persona(query: Omit<Query, "pageTypeSlug">): Asked {
  return asking(root, { pageTypeSlug: "persona", ...query })
}

export function levels(where: Query["where"]): readonly unknown[] {
  return slugsOf(persona({ where, keys: ["slug"] }))
}
