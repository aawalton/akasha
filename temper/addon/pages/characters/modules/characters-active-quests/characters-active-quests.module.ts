import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersActiveQuests = {
  id: "01a062e9-b6ff-701c-9ee8-9608dc0eea33",
  type: "page-type/module",
  slug: "characters-active-quests",
  definition: "the quests in the journal now, each with its name and the hint shown beneath it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A condition the game gives already has its own count in its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hint carries its count apart from its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any character past ASCII beside a condition's own count is read as a space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character is told past ASCII by its code rather than by the game's ordering of text.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Each quest's raw texts and their character codes are saved for reading outside.",
    },
  ],
} as const satisfies Module
