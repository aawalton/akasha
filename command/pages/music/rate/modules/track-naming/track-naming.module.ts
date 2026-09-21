import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trackNaming = {
  id: "01a0c606-f30c-74f2-8729-f3a4ba12ce86",
  type: "page-type/module",
  slug: "track-naming",
  definition: "the track page a Spotify track points at",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The track named is the one whose carrier holds the id Spotify says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track is found by any of the ids its carriers hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player holding a track rather than playing it is read the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal says the Spotify id and the title Spotify gives.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
  ],
} as const satisfies Module
