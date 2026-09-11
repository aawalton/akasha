import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const sshTarget = {
  id: "01a05c2f-0f03-7a96-92f5-8ad7d60942cc",
  type: "module",
  slug: "ssh-target",
  definition: "the machine a script is run on, and the key it is reached with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target names a key path rather than carrying a key.",
    },
    {
      invariantKind: "departure",
      statement: "The options a target is reached with are stated here rather than by each caller.",
    },
  ],
} as const satisfies Module
