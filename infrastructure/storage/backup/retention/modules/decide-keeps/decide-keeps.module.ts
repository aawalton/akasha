import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const decideKeeps = {
  id: "01a06863-74e3-7737-8f36-29465597211c",
  type: "module",
  slug: "decide-keeps",
  definition: "what each backup's keep marking is to become",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A period's anchor is the earliest completed backup that period has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The period a run falls in has no anchor until that period is over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backup outside every keep window has its marking released.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A finished period holding no backup is reported rather than skipped.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here touches the backup store.",
    },
  ],
} as const satisfies Module
