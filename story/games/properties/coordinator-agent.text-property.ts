import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const coordinatorAgent = {
  id: "01a0673c-8e0e-7001-a960-de2ffa854884",
  type: "text-property",
  slug: "coordinator-agent",
  propertySlug: "coordinator-agent",
  definition: "the agent running the game master's side",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
