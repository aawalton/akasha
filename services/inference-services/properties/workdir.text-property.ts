import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const workdir = {
  id: "01a09094-f218-7ee2-9944-4b448087ad58",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "workdir",
  propertySlug: "workdir",
  definition: "the folder a service's command runs in",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named from the folder the service's page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A service running in that folder itself states a single dot.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
