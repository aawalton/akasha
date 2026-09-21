import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicReleaseParts = {
  id: "01a0c4a2-c8c8-7210-ab1f-485b31944748",
  type: "page-type/command",
  slug: "music-release-parts",
  definition: "the command taking a release's own length away once its tracks carry it",
  code: "ts",
  test: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A release is covered where its tracks run as long as the release runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release that is covered states a length of its own of nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release that is covered states a progress of its own of nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release that is not covered keeps the length and the progress it states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release carrying no track is not covered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release stating no length is not covered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release already stating nothing of its own is left as that release is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two lengths within a hundredth of a minute are one length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every release changed lands as a single commit or does not land.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out what a release runs or how far Alan is through it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
  ],
  name: "release-parts",
  arguments: [{ argument: "argument/json" }, { argument: "argument/plan" }],
} as const satisfies Command
