import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "../domain.page-type.ts"
import type { InvariantGroup } from "./properties/invariant-group.relation-property.ts"

export type InvariantKind = Domain & {
  invariantGroup: InvariantGroup
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
    "relation-property/invariant-group",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "relation-property/invariant-group", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A kind is in one group.",
    },
  ],
} as const satisfies PageType
