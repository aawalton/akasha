import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const workdir = {
  id: "01a09094-f218-7ee2-9944-4b448087ad58",
  type: "page-type/text-property",
  slug: "workdir",
  propertySlug: "workdir",
  definition: "the folder of a service's command",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder is named from the folder the service is provisioned into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service running in that folder itself states a single dot.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
