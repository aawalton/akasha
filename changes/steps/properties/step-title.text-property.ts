import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepTitle = string

export const stepTitle = {
  id: "01a0695b-4091-734b-9974-2397946031b3",
  pageTypeSlug: "text-property",
  slug: "step-title",
  propertySlug: "title",
  definition: "what a step is called, which is the name its container carries",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step that depends on another names it by this rather than by its seq.",
    },
  ],
} as const satisfies TextProperty
