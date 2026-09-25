import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersScribingSources = {
  id: "01a062ed-39c9-700c-9df3-7f4288c3c504",
  type: "page-type/module",
  slug: "characters-scribing-sources",
  definition: "how far a character is through the runs of content earning a scribing script",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The nearest unfinished tier of a source is the only tier that source reports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A source's row counts the motif styles naming that source which the character has not learned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A style is learned only once every chapter of that style is known.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The count is of the character playing, since the game keeps motifs per character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which chapters are known is read from the character's lore library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row with no style left unlearned says nothing of motifs.",
    },
  ],
} as const satisfies Module
