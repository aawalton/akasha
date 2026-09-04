import type { Module } from "@akasha/code-system/module"

export const tickSleeping = {
  id: "01a0686a-7a57-7c23-b825-02e6e8625bad",
  pageTypeSlug: "module",
  slug: "tick-sleeping",
  definition: "the wait between one tick of a standing service and the next",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wait ends early where the service has been asked to stop.",
    },
    {
      invariantKind: "departure",
      statement: "A wait says whether it ran out or was cut short, so a loop knows to stop.",
    },
    {
      invariantKind: "departure",
      statement: "A wait asked for after the stop was asked returns at once.",
    },
    {
      invariantKind: "departure",
      statement: "SIGTERM and SIGINT both ask a standing service to stop.",
    },
    {
      invariantKind: "departure",
      statement: "A timer left behind holds the process up, so every wait clears its own.",
    },
    {
      invariantKind: "absence",
      statement:
        "No standing service writes this wait for itself, so no two of them drift on how a stop is honoured.",
    },
  ],
} as const satisfies Module
