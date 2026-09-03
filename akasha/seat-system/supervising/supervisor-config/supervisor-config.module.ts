import type { Module } from "@akasha/code-system/module"

export const supervisorConfig = {
  id: "01a0683e-3dbe-7014-bf13-b392ad858c1e",
  pageTypeSlug: "module",
  slug: "supervisor-config",
  definition: "the directories, home and log mark a supervisor works from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account's config directory carries symlinks to the shared Claude directories.",
    },
    {
      invariantKind: "departure",
      statement: "A symlink pointing elsewhere is replaced rather than left as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "The repository root is read from the checkout rather than from the environment.",
    },
  ],
} as const satisfies Module
