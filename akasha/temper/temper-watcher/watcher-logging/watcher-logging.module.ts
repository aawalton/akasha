import type { Module } from "@akasha/code-system/module"

export const watcherLogging = {
  id: "01a0633f-8d1e-79dd-b620-f4a7e7e43bb1",
  pageTypeSlug: "module",
  slug: "watcher-logging",
  definition: "how the watcher worker writes its log and rolls the log over once it grows large",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line opens with the time in UTC to the millisecond.",
    },
    {
      invariantKind: "departure",
      statement: "The level follows the time.",
    },
    {
      invariantKind: "departure",
      statement: "The message follows the level.",
    },
    {
      invariantKind: "departure",
      statement: "A line the worker writes is a line the log reader parses back whole.",
    },
    {
      invariantKind: "departure",
      statement: "The worker writes only the two levels the log reader admits from a worker.",
    },
    {
      invariantKind: "departure",
      statement: "A log grown to the largest size allowed is rolled over before the next write.",
    },
    {
      invariantKind: "departure",
      statement: "A roll is renamed from the highest number downward.",
    },
    {
      invariantKind: "departure",
      statement: "The roll that would exceed the count kept is dropped.",
    },
    {
      invariantKind: "departure",
      statement:
        "The log file takes the name the daemon page gives rather than a name written again here.",
    },
    {
      invariantKind: "departure",
      statement: "A failure to write the log leaves the worker running.",
    },
    {
      invariantKind: "departure",
      statement: "A line reaches the terminal only where the worker runs attached to a terminal.",
    },
  ],
} as const satisfies Module
