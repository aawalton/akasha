import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { z } from "zod"
import { readInventoryDiagnostic } from "../inventory-diagnostics-reading/inventory-diagnostics-reading.module.code.ts"

const ENTRY_SCHEMA = z
  .object({
    kind: z.enum(["closure", "cfunction"]),
    name: z.string(),
    source: z.string(),
    line: z.number(),
    callCount: z.number(),
    inclusiveMs: z.number(),
    selfMs: z.number(),
  })
  .strict()

const SOURCE_BUCKET_SCHEMA = z
  .object({
    source: z.string(),
    selfMs: z.number(),
    inclusiveMs: z.number(),
    callCount: z.number(),
  })
  .strict()

export const PROFILE_SCHEMA = z
  .object({
    schemaVersion: z.number(),
    timestamp: z.number(),
    bankingBag: z.number(),
    profilerAvailable: z.boolean(),
    frameCount: z.number(),
    recordCount: z.number(),
    truncated: z.boolean(),
    totalLuaMs: z.number(),
    totalSelfMs: z.number(),
    gcMs: z.number(),
    bySource: luaArrayOrEmpty(SOURCE_BUCKET_SCHEMA),
    topByInclusive: luaArrayOrEmpty(ENTRY_SCHEMA),
    topBySelf: luaArrayOrEmpty(ENTRY_SCHEMA),
  })
  .strict()

type BankProfile = z.infer<typeof PROFILE_SCHEMA>

const DIAGNOSTICS_SCHEMA = z
  .object({
    lastBankProfile: PROFILE_SCHEMA.optional(),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    diagnostics: DIAGNOSTICS_SCHEMA.optional(),
  })
  .passthrough()

export async function readBankProfile(inventoryPath: string): Promise<BankProfile> {
  return await readInventoryDiagnostic(
    inventoryPath,
    ACCOUNT_WIDE_SCHEMA,
    (wide) => wide.diagnostics?.lastBankProfile,
    "no diagnostics.lastBankProfile (interact with a banker, then /reloadui, then re-run)"
  )
}
