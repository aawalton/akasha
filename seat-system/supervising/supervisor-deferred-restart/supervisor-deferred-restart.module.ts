import type { Module } from "@akasha/code-system/module"

export const supervisorDeferredRestart = {
  id: "01a0683e-3dbe-701a-a109-8a13a6084415",
  pageTypeSlug: "module",
  slug: "supervisor-deferred-restart",
  definition: "a restart held until the session is idle, wedged or past its ceiling",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A restart fires once, and the timers it armed are cleared when it does.",
    },
    {
      invariantKind: "departure",
      statement: "A tick still in flight is not joined by the next tick.",
    },
    {
      invariantKind: "departure",
      statement: "A child past the edge cliff overrides busy children rather than deferring on.",
    },
    {
      invariantKind: "departure",
      statement: "The ceiling is counted from when the gate was armed rather than from this tick.",
    },
  ],
} as const satisfies Module
