import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { z } from "zod"

const ALIAS_ENTRY_SCHEMA = z.object({
  account: z.string().min(1),
  aliasIndex: z.number().int(),
})

export type AliasEntry = z.infer<typeof ALIAS_ENTRY_SCHEMA>

export const ACCOUNT_ALIAS_SNAPSHOT_PATH = join(homedir(), ".claude", "account-aliases.json")

export function readAliasSnapshot(path = ACCOUNT_ALIAS_SNAPSHOT_PATH): readonly AliasEntry[] {
  try {
    const arr = z.array(z.unknown()).safeParse(JSON.parse(readFileSync(path, "utf-8")))
    if (!arr.success) return []
    const out: AliasEntry[] = []
    for (const entry of arr.data) {
      const parsed = ALIAS_ENTRY_SCHEMA.safeParse(entry)
      if (parsed.success) out.push(parsed.data)
    }
    return out.sort((a, b) => a.aliasIndex - b.aliasIndex)
  } catch {
    return []
  }
}
