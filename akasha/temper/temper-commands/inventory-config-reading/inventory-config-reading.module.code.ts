import { DataError } from "@akasha/errors-core/exit-code"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import { RULE_CONSTANT_KEYS } from "@akasha/temper-items-rules-core/rule-constants"
import { savedVariablesRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { z } from "zod"

export interface CompiledRule {
  readonly id: string
  readonly action: string
  readonly conditions?: unknown
  readonly destination?: string
  readonly categoryId?: string
  readonly [extra: string]: unknown
}

export interface CompiledInventoryConfig {
  readonly rules: ReadonlyArray<CompiledRule>
  readonly orderedRules: ReadonlyArray<CompiledOrderedRule>
  readonly wantedConsumables: Record<string, unknown>
  readonly characterPriority: ReadonlyArray<string>
}

const FILE_NAME = "TemperInventory.lua"

const VARIABLES_NAME = "TemperInventory_SavedVariables"

const ACCOUNT_MARK = "@"

const ITEM_ACTION_SCHEMA = z.enum([
  "nothing",
  "lock",
  "unlock",
  "move-to",
  "stock",
  "character-equip",
  "companion-equip",
  "deconstruct",
  "refine",
  "destroy",
  "fence-launder",
  "fence-sell",
  "list",
  "mail",
  "research",
  "sell",
  "use",
  "open",
])

const COMPARISON_OP_SCHEMA = z.enum(["<=", "<", ">=", ">", "=", "!="])

const RULE_CONSTANT_KEY_SCHEMA = z.lazy(() => z.enum(RULE_CONSTANT_KEYS))
const VALUE_THRESHOLD_SCHEMA = z.union([z.number(), RULE_CONSTANT_KEY_SCHEMA])

const CHARACTER_SCOPE_SCHEMA: z.ZodType<
  "current-character" | "any-character" | `character:${string}`
> = z
  .string()
  .refine(
    (v): v is "current-character" | "any-character" | `character:${string}` =>
      v === "current-character" || v === "any-character" || v.startsWith("character:"),
    {
      message:
        "expected 'current-character' | 'any-character' | 'character:<id>' (got non-conforming value)",
    }
  )
const COMPANION_SCOPE_SCHEMA = z.enum(["active-companion", "any-companion"])
const STOCK_SCOPE_SCHEMA = z.enum(["current-character", "any-character"])

const COMPILED_ORDERED_RULE_SCHEMA = z
  .object({
    id: z.string().optional(),
    categoryId: z.string(),
    action: ITEM_ACTION_SCHEMA,
    destination: z.string().optional(),

    maxQuality: z.number().optional(),
    qualityOp: COMPARISON_OP_SCHEMA.optional(),
    maxLevel: z.number().optional(),
    levelOp: COMPARISON_OP_SCHEMA.optional(),
    setSourceTypes: luaArrayOrEmpty(z.string()).readonly().optional(),

    bound: z.enum(["bound", "not-bound"]).optional(),
    bopTradeable: z.enum(["bop-tradeable", "not-bop-tradeable"]).optional(),
    questRelevant: z.enum(["quest-relevant", "not-quest-relevant"]).optional(),
    locked: z.enum(["locked", "not-locked"]).optional(),
    known: z.enum(["known", "not-known"]).optional(),
    canResearch: z.enum(["can-research", "cannot-research"]).optional(),
    researchScope: CHARACTER_SCOPE_SCHEMA.optional(),
    canInspire: z.enum(["can-inspire", "cannot-inspire"]).optional(),
    inspireScope: CHARACTER_SCOPE_SCHEMA.optional(),
    canUnlock: z.enum(["can-unlock", "cannot-unlock"]).optional(),
    unlockScope: CHARACTER_SCOPE_SCHEMA.optional(),
    canSell: z.literal("can-sell").optional(),
    canListAtGuildTrader: z.literal("can-list-at-guild-trader").optional(),
    canCompanionEquip: z.enum(["can-companion-equip", "cannot-companion-equip"]).optional(),
    isTargetEquip: z.enum(["is-target-equip", "not-target-equip"]).optional(),
    targetEquipScope: CHARACTER_SCOPE_SCHEMA.optional(),
    isTargetCompanionEquip: z
      .enum(["is-target-companion-equip", "not-target-companion-equip"])
      .optional(),
    targetCompanionEquipScope: COMPANION_SCOPE_SCHEMA.optional(),
    allStocked: z.enum(["all-stocked", "not-all-stocked"]).optional(),
    stockThreshold: z.number().optional(),

    maxValue: z.number().optional(),
    minValue: z.number().optional(),
    value: VALUE_THRESHOLD_SCHEMA.optional(),
    valueOp: COMPARISON_OP_SCHEMA.optional(),
    marketValue: VALUE_THRESHOLD_SCHEMA.optional(),
    marketValueOp: COMPARISON_OP_SCHEMA.optional(),
    merchantValue: VALUE_THRESHOLD_SCHEMA.optional(),
    merchantValueOp: COMPARISON_OP_SCHEMA.optional(),
    replacementValue: VALUE_THRESHOLD_SCHEMA.optional(),
    replacementValueOp: COMPARISON_OP_SCHEMA.optional(),

    keepQuantity: z.number().optional(),
    targetQuantity: z.number().optional(),
    stockScope: STOCK_SCOPE_SCHEMA.optional(),
    itemNamePattern: z.string().optional(),

    stolen: z.enum(["stolen", "not-stolen"]).optional(),
    crafted: z.enum(["crafted", "not-crafted"]).optional(),
    reconstructed: z.enum(["reconstructed", "not-reconstructed"]).optional(),
    transmuted: z.enum(["transmuted", "not-transmuted"]).optional(),
    canOpen: z.literal("can-open").optional(),
    canGiveMaxRewards: z.literal("can-give-max-rewards").optional(),
    traits: luaArrayOrEmpty(z.string()).readonly().optional(),
    location: luaArrayOrEmpty(
      z.enum([
        "worn",
        "backpack",
        "bank",
        "craftbag",
        "housing-storage",
        "house",
        "companion",
        "guild",
      ])
    )
      .readonly()
      .optional(),
  })
  .passthrough()

const WANTED_CONSUMABLES_SCHEMA = z.record(z.string(), z.unknown())

const COMPILED_BLOCK_SCHEMA = z
  .object({
    orderedRules: luaArrayOrEmpty(COMPILED_ORDERED_RULE_SCHEMA).default([]),
    wantedConsumables: WANTED_CONSUMABLES_SCHEMA.default({}),
    characterPriority: luaArrayOrEmpty(z.string()).default([]),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    sellCompiled: COMPILED_BLOCK_SCHEMA.optional(),
  })
  .passthrough()

const ROOT_SCHEMA = savedVariablesRootSchema(ACCOUNT_WIDE_SCHEMA)

function ruleIdFor(rule: { categoryId?: string }, index: number): string {
  return `${rule.categoryId ?? "rule"}#${index}`
}

export function parseTemperInventoryConfig(content: string): CompiledInventoryConfig {
  const rawRoot = parseLuaSavedVariablesFile(content, VARIABLES_NAME)
  const root = ROOT_SCHEMA.parse(rawRoot)

  const defaultTable = root.Default
  if (!defaultTable) {
    throw new DataError(`${FILE_NAME}: missing Default table`)
  }

  const accountKeys = Object.keys(defaultTable).filter((one) => one.startsWith(ACCOUNT_MARK))
  if (accountKeys.length === 0) {
    throw new DataError(`${FILE_NAME}: no ${ACCOUNT_MARK}<account> entry under Default`)
  }

  let compiled: z.infer<typeof COMPILED_BLOCK_SCHEMA> | undefined
  for (const key of accountKeys) {
    const block = defaultTable[key]?.$AccountWide?.sellCompiled
    if (block) {
      compiled = block
      break
    }
  }

  if (!compiled) {
    throw new DataError(
      `${FILE_NAME}: no compiled rule config (sellCompiled) under any ${ACCOUNT_MARK}<account>/$AccountWide`
    )
  }

  const rules: CompiledRule[] = compiled.orderedRules.map((rule, index) => {
    const { id, ...rest } = rule
    return { ...rest, id: id ?? ruleIdFor(rule, index) }
  })

  const orderedRules: ReadonlyArray<CompiledOrderedRule> = compiled.orderedRules.map((rule) => {
    const { id: _id, ...rest } = rule
    return rest
  })

  return {
    rules,
    orderedRules,
    wantedConsumables: compiled.wantedConsumables,
    characterPriority: compiled.characterPriority,
  }
}

export async function loadTemperInventoryConfigFromPath(
  path: string
): Promise<CompiledInventoryConfig> {
  const file = Bun.file(path)
  if (!(await file.exists())) {
    throw new DataError(`${FILE_NAME}: file not found at ${path}`)
  }
  let content: string
  try {
    content = await file.text()
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new DataError(`${FILE_NAME}: failed to read ${path} — ${reason}`)
  }
  return parseTemperInventoryConfig(content)
}
