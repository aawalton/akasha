import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const songWords = {
  id: "01a0bad8-4f1e-7c00-9d31-5a2f0b7e61c4",
  type: "page-type/module",
  slug: "song-words",
  definition: "the words of a song read from LRCLIB and landed in files beside the song",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The words of a song land in a file beside the song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song LRCLIB answers nothing for is left without words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reach that throws is read as words unread rather than as words absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A words file already holding the words read is written again by nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network of its own.",
    },
  ],
} as const satisfies Module
