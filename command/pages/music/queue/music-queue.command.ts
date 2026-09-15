import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicQueue = {
  id: "01a062f9-5ca9-7196-a782-961170a78313",
  type: "page-type/command",
  slug: "music-queue",
  definition: "the command playing the first of a set of tracks and queueing the rest behind it",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every query is resolved to a track before anything is played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first track begins playing the way `akasha music play` begins a track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track after the first is queued rather than played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tracks are queued in the order the queries were written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist named has every query rather than the first alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no query is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each track is named as soon as that track reaches Spotify.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call that threw part way names those tracks in its refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The playing and the queueing are handed in.",
    },
  ],
  name: "queue",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/artist" },
    { argument: "argument/device-id" },
    { argument: "argument/query", required: true, repeats: true, saidAs: "word" },
  ],
} as const satisfies Command
