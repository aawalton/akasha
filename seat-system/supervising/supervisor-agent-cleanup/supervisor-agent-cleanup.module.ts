import type { Module } from "@akasha/code-system/module"

export const supervisorAgentCleanup = {
  id: "01a0683e-3dbe-7008-b3e4-d8d8c255aa10",
  pageTypeSlug: "module",
  slug: "supervisor-agent-cleanup",
  definition: "what a finished seat process lets go of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A credential push that does not answer within its bound does not hold up the exit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A per-process config directory is removed, and a shared one is pushed back instead.",
    },
    {
      invariantKind: "departure",
      statement: "Every timer and watch the process took is released before the process is freed.",
    },
  ],
} as const satisfies Module
