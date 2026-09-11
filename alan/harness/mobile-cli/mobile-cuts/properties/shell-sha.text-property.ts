import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const shellSha = {
  id: "01a0685d-b81f-7896-a766-17b1183ecd8e",
  type: "text-property",
  slug: "shell-sha",
  propertySlug: "shell-sha",
  definition: "the commit of the app shell a cut was built from",
  maxLength: 40,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A cut built from no separate shell leaves this property off rather than repeating its main sha.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
