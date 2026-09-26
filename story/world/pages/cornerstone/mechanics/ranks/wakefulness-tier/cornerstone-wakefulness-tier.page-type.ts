import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cornerstoneWakefulnessTier = {
  id: "01a0dee6-492e-7912-9c50-5b25d4ebb420",
  type: "page-type/page-type",
  slug: "cornerstone-wakefulness-tier",
  definition: "a tier of Wakefulness the Waking Stone reaches in Cornerstone",
  pluralSlug: "ranks",
  extends: ["page-type/world-rank"],
  parts: ["number-property/cornerstone-wakefulness-tier-threshold"],
  properties: [
    {
      pageProperty: "number-property/cornerstone-wakefulness-tier-threshold",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tier holds from its threshold up to one below the next tier's threshold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The top tier holds every Wakefulness from its threshold up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ladder has five tiers and no sixth.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
