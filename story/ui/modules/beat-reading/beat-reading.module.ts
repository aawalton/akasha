import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatReading = {
  id: "01a10390-5892-7cc8-9b5f-e692277bcaf4",
  type: "page-type/module",
  slug: "beat-reading",
  definition: "a chapter read beat by beat, the panels beside it drawn as of the beat on screen",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's prose is drawn one beat to a block, in the beats' order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The beat read is the last one whose block starts above a third of the window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Prose hidden behind the panels leaves the beat read where it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Who is there is handed to the panels only where a chapter is read beat by beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panels are drawn from the pages with the beats up to that one folded over them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page made in a later beat is drawn nowhere before that beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key this chapter and the ones before leave alone reads from the first later chapter changing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a later chapter makes is drawn nowhere in this one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter whose beats carry no prose is drawn as it was, from its prose file.",
    },
  ],
} as const satisfies Module
