import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const commandArguments = {
  id: "01a09409-2933-7981-8332-eb750e91e83b",
  type: "record-property",
  slug: "command-arguments",
  propertySlug: "arguments",
  definition: "the arguments a command takes, each narrowed as that command takes it",
  properties: [
    { pageProperty: "relation-property/argument", required: true, many: false },
    { pageProperty: "boolean-property/required", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command names an argument rather than spelling that argument again.",
    },
    {
      invariantKind: "departure",
      statement: "An argument a command does not name is refused where a call says it.",
    },
    {
      invariantKind: "departure",
      statement: "An argument one command needs and another does not is needed here.",
    },
    {
      invariantKind: "departure",
      statement: "An entry naming an argument twice is refused.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
