import type { Module } from "../../code-system/modules/module.page-type.ts"

export const processEnding = {
  id: "01a05d02-889b-7af1-bb37-7f74754eefe1",
  pageTypeSlug: "module",
  slug: "process-ending",
  definition: "a process asked to end and then made to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every process is asked before any process is waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A process is waited on again after the process is made to end.",
    },
    {
      invariantKind: "departure",
      statement: "A pid already gone is neither asked nor waited on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process gone between the reading and the signal has ended rather than failed to take the signal.",
    },
    {
      invariantKind: "departure",
      statement:
        "A signal refused for want of permission is refused here rather than read as an end.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a process is alive folds toward alive.",
    },
    {
      invariantKind: "departure",
      statement: "One process outliving the force leaves the whole answered as not all gone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a process was running or what the process belonged to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a process.",
    },
  ],
} as const satisfies Module
