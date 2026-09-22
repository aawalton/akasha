import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const decisionKind = {
  id: "01a04e11-9f98-775b-846d-a9985a5ebd21",
  type: "page-type/page-type",
  slug: "decision-kind",
  definition: "which sort a decision is",
  parts: [
    "decision-kind/absence",
    "decision-kind/constraint",
    "decision-kind/departure",
    "decision-kind/gap",
    "decision-kind/stopgap",
    "decision-kind/upkeep",
    "relation-property/decision-group",
  ],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "relation-property/decision-group", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind is in one group.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
