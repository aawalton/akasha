import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const typicalIntent = {
  id: "01a0c63e-93fb-7a9d-97cd-4e1aa7b4623d",
  type: "page-type/number-property",
  slug: "typical-intent",
  propertySlug: "typical-intent",
  definition: "how hard an entity usually goes at what it means to do",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike says its own intent, and this is what that intent falls back to.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
