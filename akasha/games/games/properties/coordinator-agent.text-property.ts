import type { TextProperty } from "@akasha/pages-system/text-property"

export type CoordinatorAgent = string

export const coordinatorAgent = {
  id: "01a0673c-8e0e-7001-a960-de2ffa854884",
  pageTypeSlug: "text-property",
  slug: "coordinator-agent",
  propertySlug: "coordinator-agent",
  definition: "the agent running the game master's side",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
