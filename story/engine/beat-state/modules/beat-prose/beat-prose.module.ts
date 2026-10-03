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
      statement: "A beats file carries prose on every line or on none of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's prose file holds its beats' prose end to end, a blank line between.",
    },
  ],
} as const satisfies Module
