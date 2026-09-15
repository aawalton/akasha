import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bindWithRetry = {
  id: "01a0622e-02ab-7b1e-a875-ff5fdad4afbf",
  type: "module",
  slug: "bind-with-retry",
  definition: "a port bind retried while the port is still held by the process on its way out",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bind is retried only where the error names EADDRINUSE.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error names EADDRINUSE by its code or by its message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bind on port zero is never retried.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A gateway asked to exit does not always exit inside the shutdown wait.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "The retry budget outlasts the shutdown wait a respawn gives the old gateway.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The budget covers the whole run of attempts rather than each attempt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Retries are spaced by a fixed interval rather than a growing interval.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The wait between two attempts blocks the thread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The error ending the last attempt is the error thrown once the budget runs out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The clock and the wait are handed in for a test to supply.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows how a bind is done.",
    },
  ],
} as const satisfies Module
