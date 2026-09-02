import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { z } from "zod"

export const SAVED_VARIABLES_TOP_LEVEL = "TemperCatalog_SavedVariables"

const AccountWideSchema = z
  .object({
    completed: z.boolean().optional(),
    collectionSkips: z.record(z.string(), z.string()).optional(),
    apiVersion: z.string().optional(),
    manifestApiVersion: z.number().optional(),
    lastSeenInvalidateVersion: z.number().int().nonnegative().optional(),
  })
  .passthrough()

export interface AccountSummary {
  readonly account: string
  readonly completed: boolean
  readonly collectionSkips: Readonly<Record<string, string>>
  readonly apiVersion: string | undefined
  readonly manifestApiVersion: number | undefined
  readonly lastSeenInvalidateVersion: number
  readonly presentDomainKeys: readonly string[]
}

const KNOWN_METADATA_KEYS = new Set([
  "completed",
  "collectionSkips",
  "apiVersion",
  "manifestApiVersion",
  "lastSeenInvalidateVersion",
  "perf",
])

export function readAccountSummaries(content: string): readonly AccountSummary[] {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, SAVED_VARIABLES_TOP_LEVEL)
  } catch {
    return []
  }

  const def = root.Default
  if (!isRecord(def)) return []

  const summaries: AccountSummary[] = []
  for (const [account, value] of Object.entries(def)) {
    if (!account.startsWith("@")) continue
    if (!isRecord(value)) continue
    const accountWide = value.$AccountWide
    if (!isRecord(accountWide)) continue
    const parsed = AccountWideSchema.safeParse(accountWide)
    if (!parsed.success) continue

    const presentDomainKeys = Object.keys(accountWide).filter((k) => !KNOWN_METADATA_KEYS.has(k))

    summaries.push({
      account,
      completed: parsed.data.completed ?? false,
      collectionSkips: parsed.data.collectionSkips ?? {},
      apiVersion: parsed.data.apiVersion,
      manifestApiVersion: parsed.data.manifestApiVersion,
      lastSeenInvalidateVersion: parsed.data.lastSeenInvalidateVersion ?? 0,
      presentDomainKeys,
    })
  }
  return summaries
}
