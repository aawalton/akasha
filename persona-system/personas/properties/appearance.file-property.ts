import type { FileProperty } from "@akasha/pages-system/file-property"

export type Appearance = "md"

export const appearance = {
  id: "01a0658c-fbfe-7000-a50a-efaa762bf9d7",
  pageTypeSlug: "file-property",
  slug: "appearance",
  propertySlug: "appearance",
  definition: "what a persona looks like, written in her own voice",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This property is how she describes herself rather than how an image of her was made.",
    },
    {
      invariantKind: "departure",
      statement:
        "A persona whose portrait already describes her still keeps this property apart from it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two personas may look alike in their pictures; they may never sound alike in their words.",
    },
    {
      invariantKind: "upkeep",
      statement: "An appearance says what the persona's anchor image shows of her ancestry.",
    },
  ],
} as const satisfies FileProperty
