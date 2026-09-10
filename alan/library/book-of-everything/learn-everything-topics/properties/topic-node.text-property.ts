import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type TopicNode = string

export const topicNode = {
  id: "01a0659f-93da-7000-82ca-c395a0936f89",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "topic-node",
  propertySlug: "node",
  definition: "the names of a topic and of every topic above it",
  maxLength: 300,
  nameFormat: null,
} as const satisfies TextProperty
