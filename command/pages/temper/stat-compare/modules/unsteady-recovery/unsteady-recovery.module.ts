import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const unsteadyRecovery = {
  id: "01a159ad-610a-7000-b340-6e4e4e86b030",
  type: "page-type/module",
  slug: "unsteady-recovery",
  definition: "why a reading's stamina recovery is no steady value, where it is not",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stamina recovery read while the player was blocking or moving is no steady value.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Stamina recovery of exactly 0 on a reading keeping neither flag is no steady value either.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Health recovery under Elder Dragon is a steady value only with its Health paired.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Health recovery can keep the Elder Dragon amount of the last tick before Health filled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other stat a reading keeps is taken as steady here.",
    },
  ],
  createdAt: "2026-10-20T14:18:17.227Z",
  updatedAt: "2026-10-20T17:27:15.270Z",
} as const satisfies Module
