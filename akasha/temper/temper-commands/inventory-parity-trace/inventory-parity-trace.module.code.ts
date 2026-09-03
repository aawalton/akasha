import { DataError } from "@akasha/errors-core/exit-code"
import { savedVariablesRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { z } from "zod"

const FILE_NAME = "TemperInventory.lua"

const VARIABLES_NAME = "TemperInventory_SavedVariables"

const ACCOUNT_MARK = "@"

const SIGNALS_SCHEMA = z
  .object({
    itemType: z.number(),
    specializedItemType: z.number().optional(),
    filterType: z.number(),
    traitType: z.number(),
    equipType: z.number(),
    armorType: z.number(),
    weaponType: z.number(),
    quality: z.number(),
  })
  .passthrough()

const CLASSIFICATION_SCHEMA = z
  .object({
    leafCategoryId: z.string(),
    ancestorChain: luaArrayOrEmpty(z.string()),
    categoryPath: z.string(),
  })
  .passthrough()

const ORDERED_WALK_MATCHED_SCHEMA = z
  .object({
    index: z.number(),
    categoryId: z.string(),
    action: z.string(),
    destination: z.string().nullable().optional(),
    conditions: z.string(),
  })
  .passthrough()

const ORDERED_WALK_REJECTION_SCHEMA = z
  .object({
    index: z.number(),
    categoryId: z.string(),
    action: z.string(),
    reason: z.string(),
    detail: z.string().optional(),
  })
  .passthrough()

const ORDERED_WALK_SCHEMA = z
  .object({
    rulesConsidered: z.number(),
    rulesEvaluated: z.number(),
    matched: ORDERED_WALK_MATCHED_SCHEMA.optional(),
    rejections: luaArrayOrEmpty(ORDERED_WALK_REJECTION_SCHEMA),
  })
  .passthrough()

const EXPLAIN_TRACE_SCHEMA = z
  .object({
    schemaVersion: z.number(),
    timestamp: z.number(),
    itemId: z.number(),
    itemName: z.string(),
    itemLink: z.string(),
    signals: SIGNALS_SCHEMA,
    classification: CLASSIFICATION_SCHEMA,
    orderedWalk: ORDERED_WALK_SCHEMA,
  })
  .passthrough()

export type ParityAddonTrace = z.infer<typeof EXPLAIN_TRACE_SCHEMA>

const ROOT_SCHEMA = savedVariablesRootSchema(
  z
    .object({
      diagnostics: z
        .object({
          lastExplain: z.unknown().optional(),
        })
        .passthrough()
        .optional(),
    })
    .passthrough()
)

export function loadParityAddonTraceFromContent(content: string, itemId: number): ParityAddonTrace {
  const rawRoot = parseLuaSavedVariablesFile(content, VARIABLES_NAME)
  const root = ROOT_SCHEMA.parse(rawRoot)
  const defaultTable = root.Default
  if (!defaultTable) {
    throw new DataError(`${FILE_NAME}: missing Default table`)
  }
  for (const accountKey of Object.keys(defaultTable)) {
    if (!accountKey.startsWith(ACCOUNT_MARK)) continue
    const lastExplainRaw = defaultTable[accountKey]?.$AccountWide?.diagnostics?.lastExplain
    if (lastExplainRaw === undefined) continue
    const trace = EXPLAIN_TRACE_SCHEMA.parse(lastExplainRaw)
    if (trace.itemId !== itemId) {
      throw new DataError(
        `no addon trace for itemId ${itemId}: stored lastExplain is for itemId ${trace.itemId}`
      )
    }
    return trace
  }
  throw new DataError(
    `no addon trace for itemId ${itemId}: diagnostics.lastExplain not present in ${FILE_NAME}`
  )
}
