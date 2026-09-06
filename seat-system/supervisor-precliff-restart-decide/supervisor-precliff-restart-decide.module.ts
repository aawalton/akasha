import type { Module } from "@akasha/code/module"

export const supervisorPrecliffRestartDecide = {
  id: "01a06838-5a84-7003-a0ce-e7e92276f897",
  pageTypeSlug: "module",
  slug: "supervisor-precliff-restart-decide",
  definition: "whether to arm a restart before the session reaches its context cliff",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A restart already armed is not armed a second time.",
    },
    {
      invariantKind: "departure",
      statement: "A child whose age went unread is left alone rather than restarted.",
    },
    {
      invariantKind: "departure",
      statement: "A child younger than the threshold is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A restart already deferred or an action already pending holds this restart back.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here restarts anything.",
    },
    {
      invariantKind: "departure",
      statement: "Only the arming is decided here.",
    },
  ],
} as const satisfies Module
