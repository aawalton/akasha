import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playbackWatching = {
  id: "01a18818-57d5-77da-91f2-096dccc1636e",
  type: "page-type/module",
  slug: "playback-watching",
  definition: "the video on a streaming page, watched until it is reported",
  code: "ts",
  test: "ts",
  runsInABrowser: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A video played to nine tenths of its length is a video watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A video under a minute long records nothing, so a trailer records nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A video is reported once, and the video that follows it is reported anew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the reader cannot name says so rather than recording a guess.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What was recorded, or why nothing was, is shown on the page for a moment.",
    },
  ],
  createdAt: "2026-10-29T14:37:39.156Z",
  updatedAt: "2026-10-29T14:37:39.156Z",
} as const satisfies Module
