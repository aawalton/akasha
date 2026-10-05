import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationListening = {
  id: "01a10dd0-f139-7f90-93df-c7587b8ac438",
  type: "page-type/module",
  slug: "narration-listening",
  definition:
    "what the player does around the audio: reading answers, Now Playing and marking read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter already read is never marked read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Now Playing names the chapter playing, and the story it is of as the artist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lock screen's previous and next go to the start of a chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A moment of silence played on the tap opens the audio before the stream arrives.",
    },
  ],
} as const satisfies Module
