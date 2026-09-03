import { InputError } from "@akasha/errors-core/exit-code"
import {
  type CategoryRule,
  type DestinationChain,
  ITEM_ACTION_VALUES,
  type ItemAction,
  type MoveToDestination,
  type StockScope,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { RULE_CONSTANT_KEYS } from "@akasha/temper-items-rules-core/rule-constants"
import { z } from "zod"

export const STOCK_SCOPE_VALUES = ["current-character", "any-character"] as const

export function itemActionValues(): readonly ItemAction[] {
  return ITEM_ACTION_VALUES
}

export function narrowItemAction(value: string, flagName: string): ItemAction {
  const found = ITEM_ACTION_VALUES.find((one) => one === value)
  if (found === undefined) {
    throw new InputError(
      `${flagName}: invalid action '${value}' (expected one of: ${ITEM_ACTION_VALUES.join(", ")})`
    )
  }
  return found
}

export function narrowStockScope(value: string, flagName: string): StockScope {
  const found = STOCK_SCOPE_VALUES.find((one) => one === value)
  if (found === undefined) {
    throw new InputError(
      `${flagName}: invalid stock scope '${value}' (expected one of: ${STOCK_SCOPE_VALUES.join(", ")})`
    )
  }
  return found
}

export function narrowMoveToDestination(value: string, flagName: string): MoveToDestination {
  if (value.length === 0) {
    throw new InputError(`${flagName}: destination must be non-empty`)
  }
  const SCHEMA = z.custom<MoveToDestination>((v) => typeof v === "string" && v.length > 0)
  return SCHEMA.parse(value)
}

export function parseBooleanFlag(value: string | undefined, flagName: string): boolean | undefined {
  if (value === undefined) return undefined
  if (value === "true") return true
  if (value === "false") return false
  throw new InputError(`${flagName}: expected 'true' or 'false', got '${value}'`)
}

const COMPARISON_OP_SCHEMA = z.enum(["<", "<=", "=", ">=", ">"])

const RULE_CONSTANT_KEY_SCHEMA = z.lazy(() => z.enum(RULE_CONSTANT_KEYS))
const VALUE_THRESHOLD_SCHEMA = z.union([z.number(), RULE_CONSTANT_KEY_SCHEMA])

const CategoryRuleConditionsSchema: z.ZodType<NonNullable<CategoryRule["conditions"]>> = z
  .object({
    maxQuality: z.number().optional(),
    qualityOp: COMPARISON_OP_SCHEMA.optional(),
    traits: z.array(z.string()).readonly().optional(),
    location: z
      .enum([
        "worn",
        "backpack",
        "bank",
        "craftbag",
        "housing-storage",
        "house",
        "companion",
        "guild",
      ])
      .array()
      .readonly()
      .optional(),
    setSourceTypes: z.array(z.string()).readonly().optional(),
    maxLevel: z.number().optional(),
    levelOp: COMPARISON_OP_SCHEMA.optional(),
    stolen: z.enum(["stolen", "not-stolen"]).optional(),
    crafted: z.enum(["crafted", "not-crafted"]).optional(),
    bound: z.enum(["bound", "not-bound"]).optional(),
    bopTradeable: z.enum(["bop-tradeable", "not-bop-tradeable"]).optional(),
    questRelevant: z.enum(["quest-relevant", "not-quest-relevant"]).optional(),
    locked: z.enum(["locked", "not-locked"]).optional(),
    reconstructed: z.enum(["reconstructed", "not-reconstructed"]).optional(),
    transmuted: z.enum(["transmuted", "not-transmuted"]).optional(),
    known: z.enum(["known", "not-known"]).optional(),
    canInspire: z.enum(["can-inspire", "cannot-inspire"]).optional(),
    canResearch: z.enum(["can-research", "cannot-research"]).optional(),
    canUnlock: z.enum(["can-unlock", "cannot-unlock"]).optional(),
    canOpen: z.enum(["can-open"]).optional(),
    canSell: z.enum(["can-sell"]).optional(),
    canListAtGuildTrader: z.enum(["can-list-at-guild-trader"]).optional(),
    canGiveMaxRewards: z.enum(["can-give-max-rewards"]).optional(),
    canCompanionEquip: z.enum(["can-companion-equip", "cannot-companion-equip"]).optional(),
    isTargetEquip: z.enum(["is-target-equip", "not-target-equip"]).optional(),
    isTargetCompanionEquip: z
      .enum(["is-target-companion-equip", "not-target-companion-equip"])
      .optional(),
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
    keepFloor: z.number().optional(),
    itemNamePattern: z.string().optional(),
    potionEffects: z.array(z.string()).readonly().optional(),
    potionEffectsMode: z.enum(["all", "any"]).optional(),
  })
  .passthrough()

export function parseConditionsJson(
  raw: string | undefined
): CategoryRule["conditions"] | undefined {
  if (raw === undefined) return undefined
  try {
    return CategoryRuleConditionsSchema.parse(JSON.parse(raw))
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new InputError(`--conditions: not valid JSON (${err.message})`)
    }
    throw new InputError(`--conditions: ${err instanceof Error ? err.message : String(err)}`)
  }
}

const TierCharEligibilitySchema = z
  .object({
    requiredSkillLines: z
      .object({
        skillLineIds: z.array(z.string()).readonly(),
        mode: z.enum(["all-maxed", "any-not-maxed"]),
      })
      .optional(),
    canLevelMorphs: z.object({ mode: z.literal("can-level") }).optional(),
  })
  .strict()

const TierSchema = z
  .object({
    destination: z.custom<MoveToDestination>((v) => typeof v === "string" && v.length > 0),
    targetQuantity: z.number().optional(),
    charEligibility: TierCharEligibilitySchema.optional(),
  })
  .strict()

const DestinationChainSchema: z.ZodType<DestinationChain> = z.array(TierSchema).readonly()

export function parseDestinationChainJson(raw: string | undefined): DestinationChain | undefined {
  if (raw === undefined) return undefined
  try {
    return DestinationChainSchema.parse(JSON.parse(raw))
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new InputError(`--destination-chain: not valid JSON (${err.message})`)
    }
    throw new InputError(`--destination-chain: ${err instanceof Error ? err.message : String(err)}`)
  }
}
