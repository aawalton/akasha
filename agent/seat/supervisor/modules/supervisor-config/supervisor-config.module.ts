import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorConfig = {
  id: "01a0683e-3dbe-7014-bf13-b392ad858c1e",
  type: "page-type/module",
  slug: "supervisor-config",
  definition: "a supervisor's working directories, home and log mark",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account's config directory carries symlinks to the shared Claude directories.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A symlink pointing elsewhere is replaced rather than left as the symlink is.",
    },
  ],
} as const satisfies Module
