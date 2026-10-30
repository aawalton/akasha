import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorClaudeConfig = {
  id: "01a0683e-3dbe-7012-8f94-55170087009a",
  type: "page-type/module",
  slug: "supervisor-claude-config",
  definition: "how code adds the config in akasha to the config file of a model account",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A declared project entry is merged into the existing entry rather than replacing that entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A project path is expanded against the home directory before that path is keyed on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration that cannot be read leaves the account's own file untouched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The declaration sits inside the akasha folder rather than beside an account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That folder is found by walking up rather than by folders counted up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inherited child keeps the config file the prior supervisor reconciled.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T15:47:18.583Z",
} as const satisfies Module
