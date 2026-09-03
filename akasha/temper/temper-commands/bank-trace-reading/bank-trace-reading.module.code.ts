import { z } from "zod"
import { readInventoryDiagnostic } from "../inventory-diagnostics-reading/inventory-diagnostics-reading.module.code.ts"

const NET_WORTH_SCHEMA = z
  .object({
    walkCount: z.number(),
    walkTotalMs: z.number(),
    walkMaxMs: z.number(),
  })
  .strict()

const BRACKET_SCHEMA = z
  .object({
    count: z.number(),
    totalMs: z.number(),
    maxMs: z.number(),
  })
  .strict()

const CRAFTING_SCHEMA = z
  .object({
    count: z.number(),
    totalMs: z.number(),
  })
  .strict()

const PACED_DISPATCH_SCHEMA = z
  .object({
    planned: z.number(),
    issued: z.number(),
    confirmed: z.number(),
    retries: z.number(),
    spanMs: z.number(),
    abortedEarly: z.boolean(),
  })
  .strict()

const SETTLING_SCHEMA = z
  .object({
    evaluateRules: BRACKET_SCHEMA,
    actionsChanged: BRACKET_SCHEMA,
    bankPanelRefresh: BRACKET_SCHEMA,
    slotUpdate: BRACKET_SCHEMA.optional(),
    fullUpdate: BRACKET_SCHEMA.optional(),
    scanCraftBag: BRACKET_SCHEMA.optional(),
    crafting: CRAFTING_SCHEMA.optional(),
    unattributedMs: z.number().optional(),
  })
  .strict()

export const TRACE_SCHEMA = z
  .object({
    schemaVersion: z.number(),
    timestamp: z.number(),
    bankingBag: z.number(),
    scanBankBagsMs: z.number().optional(),
    refreshPanelMs: z.number().optional(),
    withdrawMs: z.number().optional(),
    depositMs: z.number().optional(),
    withdrawCount: z.number().optional(),
    depositCount: z.number().optional(),
    moveCount: z.number().optional(),
    openHandlerMs: z.number().optional(),
    openToCloseMs: z.number().optional(),
    netWorth: NET_WORTH_SCHEMA,
    settling: SETTLING_SCHEMA.optional(),
    pacedDispatch: PACED_DISPATCH_SCHEMA.optional(),
  })
  .strict()

type BankTrace = z.infer<typeof TRACE_SCHEMA>

const DIAGNOSTICS_SCHEMA = z
  .object({
    lastBankTrace: TRACE_SCHEMA.optional(),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    diagnostics: DIAGNOSTICS_SCHEMA.optional(),
  })
  .passthrough()

export async function readBankTrace(inventoryPath: string): Promise<BankTrace> {
  return await readInventoryDiagnostic(
    inventoryPath,
    ACCOUNT_WIDE_SCHEMA,
    (wide) => wide.diagnostics?.lastBankTrace,
    "no diagnostics.lastBankTrace (interact with a banker, then /reloadui, then re-run)"
  )
}
