import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const raisesCold = {
  id: "01a0ba71-f807-73dc-a158-b17c5909a083",
  type: "page-type/boolean-property",
  slug: "raises-cold",
  propertySlug: "raises-cold",
  definition: "whether Alan can perform the movement cold to raise his temperature",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement raises cold where Alan takes it unloaded without risking an injury.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement stating nothing here does not raise cold.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing a page already states says whether a movement raises cold.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
