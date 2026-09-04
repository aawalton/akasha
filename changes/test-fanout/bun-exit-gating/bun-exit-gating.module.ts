import type { Module } from "@akasha/code-system/module"

export const bunExitGating = {
  id: "01a069e2-ffd4-70f4-ae31-4cf0a3ea1c65",
  pageTypeSlug: "module",
  slug: "bun-exit-gating",
  definition: "the exit code a bun test run earns once its own printed summary is read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A nonzero bun exit is a pass when the run's own summary counts no failure.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run reporting fewer test files than it was handed is refused rather than read as green.",
    },
    {
      invariantKind: "departure",
      statement:
        "A death by signal is told apart from a test failure so the shard can be run again alone.",
    },
    {
      invariantKind: "departure",
      statement: "An output file that cannot be found propagates the exit code bun gave.",
    },
    {
      invariantKind: "departure",
      statement: "Terminal escapes are stripped from the log before the summary is read.",
    },
  ],
} as const satisfies Module
