import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sshTarget = {
  id: "01a05c2f-0f03-7a96-92f5-8ad7d60942cc",
  type: "page-type/module",
  slug: "ssh-target",
  definition: "how code reaches a machine through SSH",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A target names a key path rather than carrying a key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The options a target is reached with are stated here rather than by each caller.",
    },
  ],
  createdAt: "2026-09-01T08:56:23.043Z",
  updatedAt: "2026-10-30T16:11:34.713Z",
} as const satisfies Module
