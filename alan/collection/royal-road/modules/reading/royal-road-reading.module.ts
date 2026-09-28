import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const royalRoadReading = {
  id: "01a0e98b-04bc-714d-81d9-07c7ec2edde1",
  type: "page-type/module",
  slug: "royal-road-reading",
  definition: "the chapters of a story Alan has read through his last chapter read on Royal Road",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter at or before the last chapter read states a progress as long as that chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter after the last chapter read is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's progress is raised and never lowered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter stating no length is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Chapters are ordered as royal road lists them now rather than by position.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Royal road renumbers its list when an author takes early chapters down.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Two chapters held may share a position.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter no longer listed comes first where it was published on an earlier day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A last chapter read that royal road does not list reads no chapter.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No moment a chapter was completed at is stated here.",
    },
  ],
} as const satisfies Module
