import type { Module } from "@akasha/code-system/module"

export const messagesConsoleStdoutGuard = {
  id: "01a0686c-f06b-7010-8514-3620ed64900f",
  pageTypeSlug: "module",
  slug: "messages-console-stdout-guard",
  definition: "standard output kept clear of logging where the protocol itself is spoken there",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A log written to standard output goes to standard error instead.",
    },
    {
      invariantKind: "departure",
      statement: "This is loaded for what loading it does rather than for anything it exports.",
    },
    {
      invariantKind: "departure",
      statement: "This is loaded before anything that might log.",
    },
  ],
} as const satisfies Module
