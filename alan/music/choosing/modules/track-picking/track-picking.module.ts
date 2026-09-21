import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trackPicking = {
  id: "01a0c578-3b36-7de0-95ef-8274663f6c91",
  type: "page-type/module",
  slug: "track-picking",
  definition:
    "the tracks a test wants from the artists Alan follows, in the order a playlist holds them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The picking is handed the test saying which tracks it wants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track the test does not want is never picked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track whose artist Alan does not follow is never picked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track Spotify does not name is never picked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One track of a track key is picked and the rest of that key are not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track stating no track key is never folded into a key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The track picked for a key is the first that key reaches in order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist's tracks run together rather than being dealt among other artists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Artists run in the order of their slugs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks of one artist are ordered by the day their release came out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A track whose release states no day comes after every track whose release states one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks that came out on one day keep the order their release carries them in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tie no other rule settles goes by slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A track's Spotify id, disc and position are read off the release it is picked under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track is picked once, whatever releases carry that track.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the page store.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
