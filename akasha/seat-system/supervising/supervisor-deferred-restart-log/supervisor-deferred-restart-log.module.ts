import type { Module } from "@akasha/code-system/module"

export const supervisorDeferredRestartLog = {
  id: "01a0683e-3dbe-701c-bda1-241e26dc0af9",
  pageTypeSlug: "module",
  slug: "supervisor-deferred-restart-log",
  definition: "what a deferred restart says while it waits and when it fires",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A busy reason unchanged is repeated only once a throttle window has passed.",
    },
    {
      invariantKind: "departure",
      statement: "A fire while busy says the whole history of busy signals that preceded it.",
    },
    {
      invariantKind: "departure",
      statement: "Children that could not be enumerated are said as such rather than as none.",
    },
  ],
} as const satisfies Module
