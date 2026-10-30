import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buildCommand = {
  id: "01a05b26-f8b6-7600-9b5a-4fed2b228f2b",
  type: "page-type/text-property",
  slug: "build-command",
  propertySlug: "build-command",
  definition: "the command run in the folder holding a web app's code to make its build",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The command is run in the folder the source directory names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The command is stated on the page rather than written into the code that runs the command.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T04:07:55.830Z",
  updatedAt: "2026-10-30T16:08:21.093Z",
} as const satisfies TextProperty
