import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatProse = {
  id: "01a10390-5892-7068-a712-bd9dd9c9f509",
  type: "page-type/module",
  slug: "beat-prose",
  definition: "the prose a writer gives each beat, read from the file a writer hands in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's prose is a string on the line of the beat it tells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer and a prose editor each give every beat its prose, in the beats' order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beats file carries prose on its first beats in order, and on no beat after a gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer handing in a whole chapter's prose gives every beat its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's prose file holds its beats' prose end to end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beat's prose may run to several paragraphs, or continue the paragraph before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beat that continues follows the beat before it after a space, any other after a blank line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beat 1 has no paragraph before it, so beat 1 continuing is refused.",
    },
  ],
  createdAt: "2026-10-03T20:59:13.938Z",
  updatedAt: "2026-10-27T19:34:15.047Z",
} as const satisfies Module
