import type { Module } from "@akasha/code-system/module"

export const bindWithRetry = {
  id: "01a0622e-02ab-7b1e-a875-ff5fdad4afbf",
  pageTypeSlug: "module",
  slug: "bind-with-retry",
  definition: "a port bind retried while the port is still held by the process on its way out",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A bind is retried only where the error names EADDRINUSE.",
    },
    {
      invariantKind: "departure",
      statement: "An error names EADDRINUSE by its code or by its message.",
    },
    {
      invariantKind: "departure",
      statement: "A bind on port zero is never retried.",
    },
    {
      invariantKind: "constraint",
      statement: "A gateway asked to exit does not always exit inside the shutdown wait.",
    },
    {
      invariantKind: "upkeep",
      statement: "The retry budget outlasts the shutdown wait a respawn gives the old gateway.",
    },
    {
      invariantKind: "departure",
      statement: "The budget covers the whole run of attempts rather than each attempt.",
    },
    {
      invariantKind: "departure",
      statement: "Retries are spaced by a fixed interval rather than a growing one.",
    },
    {
      invariantKind: "constraint",
      statement: "The wait between two attempts blocks the thread.",
    },
    {
      invariantKind: "departure",
      statement: "The error ending the last attempt is the error thrown once the budget runs out.",
    },
    {
      invariantKind: "departure",
      statement: "The clock and the wait are handed in for a test to supply.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows how a bind is done.",
    },
  ],
} as const satisfies Module
