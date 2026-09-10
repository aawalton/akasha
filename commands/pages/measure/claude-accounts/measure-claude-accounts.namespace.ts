import type { Namespace } from "../../../namespaces/namespace.page-type.types.ts"

export const measureClaudeAccounts = {
  id: "01a0796e-608f-717c-b6a8-4843088b5a0e",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "measure-claude-accounts",
  definition: "what the fleet of claude accounts has spent",
  parts: ["command/measure-claude-accounts-usage", "command/measure-claude-accounts-cost"],
} as const satisfies Namespace
