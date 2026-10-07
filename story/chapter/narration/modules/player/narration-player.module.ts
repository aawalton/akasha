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
      statement:
        "Every browser able to feed its audio plays the stream through hls.js, iOS's included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser unable to feed its audio plays the stream itself.",
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
      statement: "A stalled or broken stream is handed to recovery rather than failed at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reopen narrates the chapter playing, so a retry keeps its speed and Now Playing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The speed chosen is kept on the device, so every narration after plays at it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The speed is set again on every new source, since loading one can reset it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Progress, marking read and the next chapter count seconds of the stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Progress is saved every twenty seconds of the stream, on a pause and as the bar closes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The player tells every page which chapter and which sentence it is speaking.",
    },
  ],
} as const satisfies Module
