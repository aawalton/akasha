import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const extensionName = {
  id: "01a09135-a37d-7982-bff1-8c02e2144d5b",
  type: "text-property",
  slug: "extension-name",
  propertySlug: "extension-name",
  definition: "the extension the files a property speaks for close with",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This extension is the name after the last dot rather than the dot with it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
