import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicTrackCarriers = {
  id: "01a0c52f-cb5a-70f7-96e0-e12b551e1a2f",
  type: "page-type/command",
  slug: "music-track-carriers",
  definition:
    "the command naming on a track the release carrying it and where on that release it sits",
  code: "ts",
  test: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A track carrying no release yet is given one composed from what that track states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track carrying a release already is left as that track is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The release composed is the release the track is part of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The disc and the position composed are the disc and the position the track states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The id and the link composed are the ones Spotify's record of the track states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track that is part of no release is given nothing and counted as skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track Spotify states no id for is given nothing and counted as skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track changed lands as a single commit or does not land.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes a value off a track.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
  ],
  name: "track-carriers",
  arguments: [{ argument: "argument/json" }, { argument: "argument/plan" }],
} as const satisfies Command
