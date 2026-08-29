import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Domain } from "../domain/domain.page-type.ts"
import type { InvariantGroupSlug } from "./properties/invariant-group-slug.relation-property.ts"

export type InvariantKind = Domain & {
  invariantGroupSlug: InvariantGroupSlug
}

export const invariantKind = {
  id: "01a04e11-9f98-775b-846d-a9985a5ebd21",
  pageTypeSlug: "page-type",
  slug: "invariant-kind",
  definition: "which sort one invariant is",
  pluralSlug: "invariant-kinds",
  partSlugs: [
    "invariant-kind/absence",
    "invariant-kind/constraint",
    "invariant-kind/departure",
    "invariant-kind/gap",
    "invariant-kind/stopgap",
    "invariant-kind/upkeep",
    "relation-property/invariant-group-slug",
  ],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "invariant-group-slug", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A kind stands in one group, so no two groups share a kind.",
    },
  ],
} as const satisfies PageType
