import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sshTarget = {
  id: "01a05c2f-0f03-7a96-92f5-8ad7d60942cc",
  pageTypeSlug: "module",
  slug: "ssh-target",
  definition: "the machine a script is run on, and the key it is reached with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target names a key path rather than carrying a key.",
    },
  ],
} as const satisfies Module
