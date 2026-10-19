import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const autoCompactWindow = {
  id: "01a0687a-3d99-7951-ba5c-41a586269d17",
  type: "page-type/number-property",
  slug: "auto-compact-window",
  propertySlug: "auto-compact-window",
  definition: "the number of tokens a seat compacts at",
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
  createdAt: "2026-09-03T18:13:56.761Z",
  updatedAt: "2026-10-19T19:56:19.935Z",
} as const satisfies NumberProperty
