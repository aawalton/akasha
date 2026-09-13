import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const tickSleeping = {
  id: "01a0686a-7a57-7c23-b825-02e6e8625bad",
  type: "module",
  slug: "tick-sleeping",
  definition: "the wait between one tick of a service that keeps running and the next",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wait ends early where the service has been asked to stop.",
    },
    {
      invariantKind: "departure",
      statement: "A wait is where a service that keeps running leaves for code that moved.",
    },
    {
      invariantKind: "departure",
      statement: "The tick before a wait has landed, which is what makes the wait a safe point.",
    },
    {
      invariantKind: "departure",
      statement: "A service leaves as a wait opens rather than as a wait ends.",
    },
    {
      invariantKind: "departure",
      statement:
        "A wait a service defers its first tick by is waited out, so that deferral is never lost.",
    },
    {
      invariantKind: "departure",
      statement: "A stop already asked is answered before code that moved is weighed.",
    },
    {
      invariantKind: "departure",
      statement: "A wait says whether that wait ran out or was ended early.",
    },
    {
      invariantKind: "departure",
      statement: "A loop reads that answer to know whether to stop.",
    },
    {
      invariantKind: "departure",
      statement: "A wait asked for after the stop was asked returns at once.",
    },
    {
      invariantKind: "departure",
      statement: "SIGTERM and SIGINT both ask a service that keeps running to stop.",
    },
    {
      invariantKind: "departure",
      statement: "A timer left behind holds the process up.",
    },
    {
      invariantKind: "departure",
      statement: "Every wait clears its own timer.",
    },
    {
      invariantKind: "absence",
      statement: "No service that keeps running writes this wait for itself.",
    },
  ],
} as const satisfies Module
