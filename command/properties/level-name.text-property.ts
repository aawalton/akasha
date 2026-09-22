import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const levelName = {
  id: "01a093f5-ae9f-72c3-876a-43c8d863335d",
  type: "page-type/text-property",
  slug: "level-name",
  propertySlug: "name",
  definition: "the word or words a level of the command tree is reached by",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name carries no part of the name of the level above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is matched whole against one word of the command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A command named `list` answers many, and a command named `show` answers one the caller names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A command is named `list` where answering many is its act and named for its own act elsewhere.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
