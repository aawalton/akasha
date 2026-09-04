import type { Module } from "@akasha/code-system/module"

export const supervisorClaudeConfig = {
  id: "01a0683e-3dbe-7012-8f94-55170087009a",
  pageTypeSlug: "module",
  slug: "supervisor-claude-config",
  definition: "the declared Claude configuration reconciled into an account's config file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A declared project entry is merged into the existing one rather than replacing it.",
    },
    {
      invariantKind: "departure",
      statement: "A project path is expanded against the home directory before it is keyed on.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration that cannot be read leaves the account's own file untouched.",
    },
  ],
} as const satisfies Module
