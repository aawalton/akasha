import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepSeq = string

export const stepSeq = {
  id: "01a06950-236c-7ac8-9bc6-69ff25262381",
  pageTypeSlug: "text-property",
  slug: "step-seq",
  propertySlug: "seq",
  definition: "the number a step is known by among all steps",
  max: 20,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "The counter that mints a step's seq has no akasha home yet.",
    },
  ],
} as const satisfies TextProperty
