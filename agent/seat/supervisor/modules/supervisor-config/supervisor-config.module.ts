import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorConfig = {
  id: "01a0683e-3dbe-7014-bf13-b392ad858c1e",
  type: "page-type/module",
  slug: "supervisor-config",
  definition: "the folders a supervisor uses",
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
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:49:42.398Z",
} as const satisfies Module
