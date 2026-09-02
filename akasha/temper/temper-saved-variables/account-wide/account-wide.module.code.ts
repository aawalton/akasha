import { asRecord } from "@akasha/utils-narrow/as-record"
import { z } from "zod"

export function savedVariablesRootSchema<AccountWide extends z.ZodTypeAny>(
  accountWide: AccountWide
) {
  return z
    .object({
      Default: z
        .record(z.string(), z.object({ $AccountWide: accountWide.optional() }).passthrough())
        .optional(),
    })
    .passthrough()
}

export function readFirstAccountWide(
  defaultTable: Record<string, unknown>
): Record<string, unknown> | undefined {
  for (const key of Object.keys(defaultTable)) {
    if (!key.startsWith("@")) continue
    const accountTable = asRecord(defaultTable[key])
    const accountWide = asRecord(accountTable?.["$AccountWide"])
    if (accountWide) return accountWide
  }
  return undefined
}
