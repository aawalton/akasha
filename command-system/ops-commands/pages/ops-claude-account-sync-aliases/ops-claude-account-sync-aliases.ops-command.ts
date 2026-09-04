import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsClaudeAccountSyncAliases = {
  id: "01a06904-5242-738d-a719-40e27a1d0891",
  pageTypeSlug: "ops-command",
  slug: "ops-claude-account-sync-aliases",
  definition: "the local alias snapshot rewritten from the account pages.",
  opsPath: "claude-account sync-aliases",
  opsEntryFile:
    "agents/claude-accounts/modules/alias-sync/claude-account-alias-sync.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
