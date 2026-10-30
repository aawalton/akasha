import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorDeferredRestartLog = {
  id: "01a0683e-3dbe-701c-bda1-241e26dc0af9",
  type: "page-type/module",
  slug: "supervisor-deferred-restart-log",
  definition: "the log a supervisor writes until an agent in a seat is restarted",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A busy reason unchanged is repeated only once a throttle window has passed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fire while busy says the whole history of busy signals that preceded that fire.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Children that could not be enumerated are said as such rather than as no child.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:41:26.932Z",
} as const satisfies Module
