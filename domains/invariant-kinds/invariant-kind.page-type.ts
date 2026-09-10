import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const invariantKind = {
  id: "01a04e11-9f98-775b-846d-a9985a5ebd21",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "invariant-kind",
  definition: "which sort one invariant is",
  pluralSlug: "invariant-kinds",
  parts: [
    "invariant-kind/absence",
    "invariant-kind/constraint",
    "invariant-kind/departure",
    "invariant-kind/gap",
    "invariant-kind/stopgap",
    "invariant-kind/upkeep",
    "relation-property/invariant-group",
  ],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "relation-property/invariant-group", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A kind is in one group.",
    },
  ],
  types: "ts",
} as const satisfies PageType
