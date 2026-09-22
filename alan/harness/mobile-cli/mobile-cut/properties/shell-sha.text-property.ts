import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const shellSha = {
  id: "01a0685d-b81f-7896-a766-17b1183ecd8e",
  type: "page-type/text-property",
  slug: "shell-sha",
  propertySlug: "shell-sha",
  definition: "a cut's app shell commit",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cut built from no separate shell leaves this property off rather than repeating its main sha.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
