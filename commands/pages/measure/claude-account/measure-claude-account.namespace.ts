import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const measureClaudeAccount = {
  id: "01a0796e-608f-717c-b6a8-4843088b5a0e",
  type: "namespace",
  slug: "measure-claude-account",
  definition: "what the fleet of claude accounts has spent",
  parts: ["command/measure-claude-account-cost", "command/measure-claude-account-usage"],
  name: "claude-account",
} as const satisfies Namespace
