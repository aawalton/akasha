import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type FileName = string

export const fileName = {
  id: "01a0585d-233d-7e12-8214-d5f3f602412f",
  pageTypeSlug: "text-property",
  slug: "file-name",
  propertySlug: "file-name",
  definition: "the name a property's file is under",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file name is the whole name rather than an extension.",
    },
    {
      invariantKind: "constraint",
      statement: "A name here is chosen outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims that file by stating the property with the file.",
    },
    {
      invariantKind: "departure",
      statement: "The file is found through the page's type rather than through its name.",
    },
    {
      invariantKind: "gap",
      statement: "A name the naming grammar could build is refused.",
    },
  ],
} as const satisfies TextProperty
