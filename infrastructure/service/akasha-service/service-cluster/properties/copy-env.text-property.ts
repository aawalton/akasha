import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const copyEnv = {
  id: "01a0d984-8902-77c1-9c1b-7e702710905d",
  type: "page-type/text-property",
  slug: "copy-env",
  propertySlug: "copy-env",
  definition: "the environment variable naming the directory files were copied into",
  maxLength: 253,
  nameFormat: "name-format/upper-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The workload's container is handed the whole path of that directory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This variable follows every variable the page states as runtime env.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
