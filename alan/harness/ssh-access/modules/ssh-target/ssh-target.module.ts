import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sshTarget = {
  id: "01a05c2f-0f03-7a96-92f5-8ad7d60942cc",
  type: "page-type/module",
  slug: "ssh-target",
  definition: "the machine running a script, and that machine's key",
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
} as const satisfies Module
