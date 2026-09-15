import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const fileName = {
  id: "01a0585d-233d-7e12-8214-d5f3f602412f",
  type: "page-type/text-property",
  slug: "file-name",
  propertySlug: "file-name",
  definition: "the name a property's file is under",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This file name is the whole name rather than an extension.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A name here is chosen outside akasha.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page claims that file by stating the property with the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file is found through the page's type rather than through its name.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A name the naming grammar could build is refused.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
