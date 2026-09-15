import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const invariantKind = {
  id: "01a04e11-9f98-775b-846d-a9985a5ebd21",
  type: "page-type/page-type",
  slug: "invariant-kind",
  definition: "which sort one invariant is",
  parts: [
    "invariant-kind/absence",
    "invariant-kind/constraint",
    "invariant-kind/departure",
    "invariant-kind/gap",
    "invariant-kind/stopgap",
    "invariant-kind/upkeep",
    "relation-property/decision-group",
  ],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "relation-property/decision-group", required: true, many: false }],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind is in one group.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
