import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const autoCompactWindow = {
  id: "01a0687a-3d99-7951-ba5c-41a586269d17",
  type: "page-type/number-property",
  slug: "auto-compact-window",
  propertySlug: "auto-compact-window",
  definition: "the token count compacting a seat's agent",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The harness has this count between one hundred thousand and one million whatever value is stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat on a model with a smaller context window compacts at that window instead.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
