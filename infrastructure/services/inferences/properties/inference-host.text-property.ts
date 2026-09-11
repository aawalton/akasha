import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const inferenceHost = {
  id: "01a09094-7525-73c0-bc06-d3cdd15b053b",
  type: "text-property",
  slug: "inference-host",
  propertySlug: "host",
  definition: "the machine outside the cluster a service runs on",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "The machines a service can run on are no pages.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a machine.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
