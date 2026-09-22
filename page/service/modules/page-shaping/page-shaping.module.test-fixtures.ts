import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { graphAttribute } from "akasha/graph/attribute/graph-attribute.page-type.ts"
import { property } from "akasha/graph/attribute/pages/property.graph-attribute.ts"
import {
  bodyOf,
  graphedRepo,
  type Named,
  thePage,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  type Climbing,
  climbing,
  type Declared,
  shaping,
} from "akasha/page/service/modules/page-shaping/page-shaping.module.code.ts"

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
    attributes: [`${graphAttribute.slug}/${property.slug}`],
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

const root = rootOf(import.meta.dir)

export const climbedInRepo: Climbing = climbing(root)

export const climbedInTypes: Climbing = climbing(
  graphedRepo(Object.fromEntries(HELD.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])))
)

function declaredIn(pageTypeSlug: string): readonly Declared[] {
  const shaped = shaping(root, pageTypeSlug)
  return "shape" in shaped ? (shaped.shape?.declarations ?? []) : []
}

export function declaredAt(pageTypeSlug: string, key: string): Declared | undefined {
  return declaredIn(pageTypeSlug).find((one) => one.key === key)
}
