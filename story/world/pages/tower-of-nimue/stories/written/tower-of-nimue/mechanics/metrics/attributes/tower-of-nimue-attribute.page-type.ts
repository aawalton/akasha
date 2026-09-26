import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerOfNimueAttribute = {
  id: "01a0dee9-5494-73ec-b731-6b43baa9beea",
  type: "page-type/page-type",
  slug: "tower-of-nimue-attribute",
  definition: "a number for a lasting stat of a climber in the Tower of Nimue",
  pluralSlug: "attributes",
  extends: ["page-type/metric-character-attribute"],
  parts: [
    "page-type/tower-of-nimue-vit",
    "page-type/tower-of-nimue-pwr",
    "page-type/tower-of-nimue-spd",
    "page-type/tower-of-nimue-att",
    "page-type/tower-of-nimue-ins",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every stat starts at ten.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
