import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnNotice = {
  id: "01a0e3ab-3602-7b99-b42d-d5909d6fd17a",
  type: "page-type/module",
  slug: "turn-notice",
  definition: "whether a notice of a played turn still says where the turn is",
  code: "ts",
  test: "ts",
  reachedByPath: ["ran"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice is read back into the turn and the status it was written with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice is stale once its turn has left the status it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice at player is stale once a turn after its own exists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A notice at any other step stays current while its turn holds that step, a later turn or not.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A later turn is queued while an earlier one still waits on a seat's work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice naming a turn no page holds is not called stale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Run as a program, this judges one notice handed in and says stale or current.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's listener runs it that way for each notice, so the judging is never stale.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
  createdAt: "2026-09-27T16:20:43.650Z",
  updatedAt: "2026-10-28T00:06:41.119Z",
} as const satisfies Module
