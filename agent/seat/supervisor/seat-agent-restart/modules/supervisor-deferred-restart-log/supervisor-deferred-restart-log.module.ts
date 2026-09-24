import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorDeferredRestartLog = {
  id: "01a0683e-3dbe-701c-bda1-241e26dc0af9",
  type: "page-type/module",
  slug: "supervisor-deferred-restart-log",
  definition: "what a deferred restart says while it waits and when it fires",
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
} as const satisfies Module
