import type { TextProperty } from "@akasha/pages/text-property"

export type WrittenBy = string

export const writtenBy = {
  id: "01a08234-d8ba-7bb5-9be6-95a087589e12",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "written-by",
  propertySlug: "written-by",
  definition: "the command a generated declaration is written again by",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The command is spelled as a reader would say it on a command line.",
    },
  ],
} as const satisfies TextProperty
