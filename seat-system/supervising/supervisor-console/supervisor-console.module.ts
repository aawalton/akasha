import type { Module } from "@akasha/code-system/module"

export const supervisorConsole = {
  id: "01a0683e-3dbe-7015-b25d-4d947ec851f0",
  pageTypeSlug: "module",
  slug: "supervisor-console",
  definition: "a supervisor's console lines sent to its seat's log page and its log file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line the log page refuses lands in the file instead rather than being lost.",
    },
    {
      invariantKind: "departure",
      statement: "A page refusing lines is said once rather than on every line it refuses.",
    },
    {
      invariantKind: "departure",
      statement: "Lines written before the agent was known are carried into the agent's own log.",
    },
    {
      invariantKind: "departure",
      statement: "A log at its ceiling is rotated rather than grown.",
    },
  ],
} as const satisfies Module
