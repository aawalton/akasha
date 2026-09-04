import type { TextProperty } from "@akasha/pages-system/text-property"

export type AppliesWhen = string

export const appliesWhen = {
  id: "01a0680a-1a00-7017-a147-8d2b6c5e1117",
  pageTypeSlug: "text-property",
  slug: "applies-when",
  propertySlug: "applies-when",
  definition: "the shape of transaction a direction reaches",
  max: 400,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A direction reaches no transaction outside the shape it applies to.",
    },
  ],
} as const satisfies TextProperty
