import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const montageRunning = {
  id: "01a17ef5-e63b-727f-b28c-5c0bb8d69f97",
  type: "page-type/module",
  slug: "montage-running",
  definition: "the sessions of a montage, settled one after another until one stops it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each session settles the time, then the upkeep, then the activity, in that order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session's roll is chained from the line before it, as a settle call's would be.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each check's `next` carries its reading on to the next session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session the world breaks in on is not run, and time passes up to that instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session ending after the end asked for is not run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A montage stops after the session crossing what was asked for, or leaving the routine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session a check refuses is not run, and a first session refused refuses all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage asked for no number of sessions runs at most 366.",
    },
  ],
  createdAt: "2026-10-27T20:03:26.902Z",
  updatedAt: "2026-10-27T20:03:26.902Z",
} as const satisfies Module
