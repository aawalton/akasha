import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type SourceDirectory = string

export const sourceDirectory = {
  id: "01a05b26-f8b6-7d79-b5c7-6e8267081489",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "source-directory",
  propertySlug: "source-directory",
  definition: "the folder a web app's source sits in",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named from the repository root.",
    },
    {
      invariantKind: "absence",
      statement: "No slash opens or closes the folder named here.",
    },
    {
      invariantKind: "departure",
      statement: "A web app's build is made in this folder.",
    },
  ],
} as const satisfies TextProperty
