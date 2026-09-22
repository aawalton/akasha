import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trackNaming = {
  id: "01a0c606-f30c-74f2-8729-f3a4ba12ce86",
  type: "page-type/module",
  slug: "track-naming",
  definition: "a Spotify track's track page",
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
      decisionKind: "decision-kind/departure",
      statement:
        "The track played last is the first among the tracks played recently not carrying the id playing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where nothing plays, the first among the tracks played recently is the last heard.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Spotify names the track playing first among the tracks played recently on some plays only.",
    },
  ],
} as const satisfies Module
