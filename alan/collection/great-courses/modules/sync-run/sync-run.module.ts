import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const syncRun = {
  id: "01a06580-196a-7001-8989-3755d6f4c2ed",
  type: "page-type/module",
  slug: "sync-run",
  definition: "how code fails a whole run of a sync where any part of the run fails",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One item failing makes the whole run fail.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is opened before the sync runs and settled once the sync has ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The row is opened and settled by the module every sync records runs through.",
    },
  ],
  createdAt: "2026-09-03T04:21:29.066Z",
  updatedAt: "2026-10-30T15:21:09.655Z",
} as const satisfies Module
