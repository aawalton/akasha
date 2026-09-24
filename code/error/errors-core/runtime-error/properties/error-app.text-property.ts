import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const errorApp = {
  id: "01a05f3f-e3e0-7cda-81e5-e5f7cddf3e43",
  type: "page-type/text-property",
  slug: "error-app",
  propertySlug: "app",
  definition: "the web app whose client met an error",
  maxLength: 32,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The apps that may report are named by the report shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One app opens every slug an error of that app is filed under.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
