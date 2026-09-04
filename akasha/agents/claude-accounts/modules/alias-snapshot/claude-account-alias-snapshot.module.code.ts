import { writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { aliasIndexesIn } from "../reading/claude-account-reading.module.code.ts"

export const ACCOUNT_ALIAS_SNAPSHOT_PATH = join(homedir(), ".claude", "account-aliases.json")

export type AliasEntry = {
  readonly account: string
  readonly aliasIndex: number
}

function inAliasIndexOrder(entries: readonly AliasEntry[]): readonly AliasEntry[] {
  return [...entries].sort((a, b) => a.aliasIndex - b.aliasIndex)
}

function writeAliasSnapshot(entries: readonly AliasEntry[], path: string): undefined {
  writeFileSync(path, `${JSON.stringify(inAliasIndexOrder(entries), null, 2)}\n`)
}

export function syncAliasSnapshotFromPages(
  path = ACCOUNT_ALIAS_SNAPSHOT_PATH
): readonly AliasEntry[] {
  const root = rootFor(resolveRoots(), AKASHA)
  const entries = inAliasIndexOrder(
    [...aliasIndexesIn(root)].map(([account, aliasIndex]) => ({ account, aliasIndex }))
  )
  writeAliasSnapshot(entries, path)
  return entries
}
