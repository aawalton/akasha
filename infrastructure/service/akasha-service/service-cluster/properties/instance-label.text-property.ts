import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const instanceLabel = {
  id: "01a0d5db-7608-713f-ae44-63b84a2c0f6f",
  type: "page-type/text-property",
  slug: "instance-label",
  propertySlug: "instance-label",
  definition: "the instance a workload's labels name, where that is not the workload's namespace",
  maxLength: 63,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service stating none is labelled with its namespace as its instance.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A workload's selector cannot change once the cluster holds that workload.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
