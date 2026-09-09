import type { TextProperty } from "@akasha/pages/text-property"

export type CoordinatorAgent = string

export const coordinatorAgent = {
  id: "01a0673c-8e0e-7001-a960-de2ffa854884",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "coordinator-agent",
  propertySlug: "coordinator-agent",
  definition: "the agent running the game master's side",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
