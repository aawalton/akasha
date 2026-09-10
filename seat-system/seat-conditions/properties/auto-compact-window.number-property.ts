import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type AutoCompactWindow = number

export const autoCompactWindow = {
  id: "01a0687a-3d99-7951-ba5c-41a586269d17",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "auto-compact-window",
  propertySlug: "auto-compact-window",
  definition: "the token count a seat's agent is compacted at",
  max: null,
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The harness has this count between one hundred thousand and one million whatever value is stated.",
    },
    {
      invariantKind: "departure",
      statement: "A seat on a model with a smaller context window compacts at that window instead.",
    },
  ],
} as const satisfies NumberProperty
