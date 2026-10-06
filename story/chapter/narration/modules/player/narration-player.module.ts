import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationPlayer = {
  id: "01a10dd0-f13a-7e47-8551-b06d2fd85233",
  type: "page-type/module",
  slug: "narration-player",
  definition: "the one audio player that plays a narration across every page of the app",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The player sits in the app's layout, so leaving a page leaves it playing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The player plays one audio element and swaps no element for another.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Playing a chapter closes the narration playing before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stream is handed to the audio element once its first piece is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Safari plays the stream itself, and every other browser plays it through hls.js.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "hls.js holds a growing stream at its start rather than chasing its newest piece.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Chrome plays HLS itself but leaps to the newest piece of a growing stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser that cannot play an HLS stream is told so rather than played nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream that stops arriving for half a minute is a failure the bar shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Progress is saved every twenty seconds of the stream, on a pause and as the bar closes.",
    },
  ],
} as const satisfies Module
