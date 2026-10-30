import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorPrecliffRestartDecide = {
  id: "01a06838-5a84-7003-a0ce-e7e92276f897",
  type: "page-type/module",
  slug: "supervisor-precliff-restart-decide",
  definition: "whether an agent that has run for hours is restarted",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart already armed is not armed a second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A child whose age went unread is left alone rather than restarted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A child younger than the threshold is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart already deferred or an action already pending holds this restart back.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here restarts anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the arming is decided here.",
    },
  ],
  createdAt: "2026-09-03T17:01:58.788Z",
  updatedAt: "2026-10-30T14:45:01.561Z",
} as const satisfies Module
