import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthLogs = {
  id: "01a183df-77ea-7f4e-84ee-5f9264260cfd",
  type: "page-type/module",
  slug: "health-logs",
  definition: "what Alan's day logs say of his activity, sleep and safety over a trailing window",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window opens three months before the day it ends on and holds that last day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's active energy and steps are those of the source that counted the most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Activity is averaged over the days the watch was on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sleep is the stretches titled sleep, averaged over the nights holding one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A share of safety is a share of the logged time that states a safety level.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A stretch still open counts toward nothing.",
    },
  ],
  createdAt: "2026-10-28T18:57:02.952Z",
  updatedAt: "2026-10-28T18:57:02.952Z",
} as const satisfies Module
