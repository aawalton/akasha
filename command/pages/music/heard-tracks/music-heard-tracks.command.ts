import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicHeardTracks = {
  id: "01a0c494-733f-7973-87ea-0df0523b4f6d",
  type: "page-type/command",
  slug: "music-heard-tracks",
  definition: "the command carrying onto every track what the listening already filed says",
  code: "ts",
  test: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track filed is read, not only the tracks a sweep files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track on a release Alan finished is a track Alan heard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track the heard music page names is a track Alan heard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track Alan heard runs its whole length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track already read as heard is left as that track is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No track is carried back to unheard here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release Alan is part way through settles nothing about its tracks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track changed lands as a single commit or does not land.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
  ],
  name: "heard-tracks",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
