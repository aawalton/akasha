import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsClaudeAccountSyncAliases = {
  id: "01a06904-5242-738d-a719-40e27a1d0891",
  pageTypeSlug: "ops-command",
  slug: "ops-claude-account-sync-aliases",
  definition: "the local alias snapshot rewritten from the account pages.",
  opsPath: "claude-account sync-aliases",
  opsEntryFile: "tools/commands/claude-account/sync-aliases.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
