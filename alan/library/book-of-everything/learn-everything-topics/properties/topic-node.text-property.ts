import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const topicNode = {
  id: "01a0659f-93da-7000-82ca-c395a0936f89",
  type: "text-property",
  slug: "topic-node",
  propertySlug: "node",
  definition: "the names of a topic and of every topic above it",
  maxLength: 300,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
