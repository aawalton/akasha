import type { TextProperty } from "@akasha/pages-system/text-property"

export type App = string

export const errorApp = {
  id: "01a05f3f-e3e0-7cda-81e5-e5f7cddf3e43",
  pageTypeSlug: "text-property",
  slug: "error-app",
  propertySlug: "app",
  definition: "the web app whose client met an error",
  max: 32,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The apps that may report are named by the report shape.",
    },
    {
      invariantKind: "departure",
      statement: "One app opens every slug an error of that app is filed under.",
    },
  ],
} as const satisfies TextProperty
