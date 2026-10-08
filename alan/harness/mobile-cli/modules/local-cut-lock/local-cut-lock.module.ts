import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const localCutLock = {
  id: "01a05cee-e560-799d-8874-d6c9518059c9",
  type: "page-type/module",
  slug: "local-cut-lock",
  definition: "the workstation file lock a testflight cut holds while it runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The mac build mutex engages only after script delivery.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lock sits at a fixed path in the home directory rather than in a repo.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lock whose holder is no longer alive is stolen rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lock file that will not parse raises rather than being stolen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lock is released only by the process whose pid the file names.",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Module
