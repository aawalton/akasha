import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import {
  ACCOUNT_ALIAS_SNAPSHOT_PATH,
  syncAliasSnapshotFromPages,
} from "../alias-snapshot/claude-account-alias-snapshot.module.code.ts"

export const HELP: CommandHelp = {
  flags: [],
  examples: ["ops claude-account sync-aliases"],
}

export default async function claudeAccountSyncAliases(args: readonly string[]): Promise<void> {
  parseArgs(help, args)

  const entries = syncAliasSnapshotFromPages()
  process.stdout.write(
    `${entries.length} account(s) written to ${ACCOUNT_ALIAS_SNAPSHOT_PATH}\n` +
      entries.map((e) => `  c${e.aliasIndex}  ${e.account}\n`).join("")
  )
}

export const help = HELP
