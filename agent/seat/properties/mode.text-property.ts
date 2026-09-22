import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const mode = {
  id: "01a07661-4b8c-7ac8-ba3a-9cbd32e9ae55",
  type: "page-type/text-property",
  slug: "mode",
  propertySlug: "mode",
  definition: "the mode of an agent running in a seat",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's mode is observed of the supervisor with the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The mode a seat is running in is told apart from the mode that seat was started in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat no supervisor has written a mode for has no mode.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The modes a seat can run in are no pages.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
