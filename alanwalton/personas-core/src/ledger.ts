import { z } from "zod"
import type { Ledger } from "../../../alan/persona/ledger/ledger.ts"

export const LedgerContractSchema: z.ZodType<Ledger> = z
  .object({
    netBytes: z.number().int().nonnegative(),
    greenDayTotal: z.number().nonnegative(),
    wallpaperCount: z.number().int().nonnegative(),
    spent: z.number().int().nonnegative(),
    balance: z.number().int(),
    level: z.number().int().min(1),
    percentProgress: z.number().min(0).lt(100),
    nextWallpaperDeficit: z.number().int().nonnegative(),
  })
  .strict()
