import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorPrecliffRestartDecide = {
  id: "01a06838-5a84-7003-a0ce-e7e92276f897",
  type: "module",
  slug: "supervisor-precliff-restart-decide",
  definition: "whether to arm a restart before the session reaches its context cliff",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restart already armed is not armed a second time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A child whose age went unread is left alone rather than restarted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A child younger than the threshold is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restart already deferred or an action already pending holds this restart back.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here restarts anything.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the arming is decided here.",
    },
  ],
} as const satisfies Module
