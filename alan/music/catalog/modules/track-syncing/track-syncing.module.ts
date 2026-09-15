import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trackSyncing = {
  id: "01a0a593-09e4-757b-a4e7-c505b16e801a",
  type: "page-type/module",
  slug: "track-syncing",
  definition: "the tracks a release carries, filed as pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track a release carries is filed as a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track names the release carrying it as an address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track is named for the release carrying it and its own title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track arrives started by nobody and heard for none of its length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states the disc it sits on as well as its position on that disc.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states whether the provider marks it explicit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states every artist the provider credits, in the order given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The progress and the grade a person gave a track outlive every sweep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release whose tracks are filed is marked so within the run that filed them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands an edit.",
    },
  ],
} as const satisfies Module
