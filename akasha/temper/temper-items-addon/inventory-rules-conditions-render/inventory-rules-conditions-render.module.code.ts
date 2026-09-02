import { compareWithOp } from "@akasha/temper-items-rules-core/comparison-op"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import { ALL_CATEGORIES_ID } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { resolveThreshold } from "@akasha/temper-items-rules-core/rule-constants"
import { requireAt } from "@akasha/utils-narrow/require-at"
export interface MatchContext {
  quality: number
  itemLink: string
  bagId: number
  slotIndex: number
  itemType: number
  traitType: number
  equipType: number
  armorType: number
  weaponType: number
  deconCraftingType: number
  isStolenVal: boolean
  isBoundVal: boolean
  isBoPTradeableVal: boolean
  isQuestRelevantVal: boolean
  isCraftedVal: boolean
  isReconstructedVal: boolean
  isTransmutedVal: boolean
  isLocked: boolean
  temperTraitId: string | undefined
  itemId: number
  itemName: string
  saleAvg: number | undefined
  minPrice: number | undefined
  amountCount: number | undefined
  saleAmountCount: number | undefined
  estimatedValue: number | undefined
  merchantValue: number | undefined
  replacementCost: number | undefined
}

export function formatCategoryPath(chain: string[]): string {
  const parts: string[] = []
  for (let i = chain.length - 1; i >= 0; i--) {
    const id = requireAt(chain, i)
    if (id === ALL_CATEGORIES_ID) continue
    parts.push(id)
  }
  return parts.join(" > ")
}

export function formatConditionResult(label: string, pass: boolean): string {
  return `${label} ${pass ? "✓" : "✗"}`
}

function fmtNum(n: number | undefined): string {
  return n === undefined ? "?" : `${n}`
}

function deriveStrLabel(ac: number | undefined, sac: number | undefined): string {
  if (ac === undefined || sac === undefined) return "?"
  if (sac === 0) return "?"
  if (ac > 0) return Math.min(1, sac / ac).toFixed(2)
  return "1.00"
}

function ttcBlend(ctx: MatchContext): string {
  if (ctx.saleAvg === undefined && ctx.minPrice === undefined && ctx.estimatedValue === undefined) {
    return ""
  }
  const str = deriveStrLabel(ctx.amountCount, ctx.saleAmountCount)
  return ` [TTC SA=${fmtNum(ctx.saleAvg)} Min=${fmtNum(ctx.minPrice)} AC=${fmtNum(ctx.amountCount)} SAC=${fmtNum(ctx.saleAmountCount)} STR=${str} est=${fmtNum(ctx.estimatedValue)}]`
}

function computeCombinedValue(ctx: MatchContext): number | undefined {
  if (
    ctx.estimatedValue === undefined &&
    ctx.merchantValue === undefined &&
    ctx.replacementCost === undefined
  ) {
    return undefined
  }
  return Math.max(ctx.estimatedValue ?? 0, ctx.merchantValue ?? 0, ctx.replacementCost ?? 0)
}

function pushValueConditions(
  parts: string[],
  rule: CompiledOrderedRule,
  ctx: MatchContext
): undefined {
  const ev = ctx.estimatedValue

  if (rule.marketValue !== undefined) {
    const op = rule.marketValueOp ?? "<="
    const pass =
      ev === undefined
        ? rule.marketValue === 0 && op === "<="
        : compareWithOp(op, ev, resolveThreshold(rule.marketValue))
    parts.push(
      `${formatConditionResult(`marketValue${op}${rule.marketValue}`, pass)}${ttcBlend(ctx)}`
    )
  } else if (rule.maxValue !== undefined || rule.minValue !== undefined) {
    const label =
      rule.maxValue !== undefined
        ? `marketValue<=${rule.maxValue}`
        : `marketValue>=${rule.minValue}`
    let mark: string
    if (ev === undefined) {
      mark = "?"
    } else {
      const ok =
        (rule.maxValue === undefined || ev <= rule.maxValue) &&
        (rule.minValue === undefined || ev >= rule.minValue)
      mark = ok ? "✓" : "✗"
    }
    parts.push(`${label} ${mark}${ttcBlend(ctx)}`)
  }

  if (rule.value !== undefined) {
    const op = rule.valueOp ?? "<="
    const cv = computeCombinedValue(ctx)
    const pass =
      cv === undefined
        ? rule.value === 0 && op === "<="
        : compareWithOp(op, cv, resolveThreshold(rule.value))
    parts.push(
      `${formatConditionResult(`value${op}${rule.value}`, pass)} (cv=${cv === undefined ? "?" : cv})`
    )
  }

  if (rule.merchantValue !== undefined) {
    const op = rule.merchantValueOp ?? "<="
    const sell = ctx.merchantValue ?? 0
    parts.push(
      `${formatConditionResult(`merchantValue${op}${rule.merchantValue}`, compareWithOp(op, sell, resolveThreshold(rule.merchantValue)))} (sell=${sell})`
    )
  }

  if (rule.replacementValue !== undefined) {
    const op = rule.replacementValueOp ?? "<="
    const rc = ctx.replacementCost ?? 0
    parts.push(
      `${formatConditionResult(`replacementValue${op}${rule.replacementValue}`, compareWithOp(op, rc, resolveThreshold(rule.replacementValue)))} (rc=${rc})`
    )
  }
}

export function describeInlineConditions(rule: CompiledOrderedRule, ctx: MatchContext): string {
  const parts: string[] = []

  if (rule.stolen !== undefined) {
    const pass =
      (rule.stolen === "stolen" && ctx.isStolenVal) ||
      (rule.stolen === "not-stolen" && !ctx.isStolenVal)
    parts.push(formatConditionResult(`stolen=${rule.stolen}`, pass))
  }
  if (rule.crafted !== undefined) {
    const pass =
      (rule.crafted === "crafted" && ctx.isCraftedVal) ||
      (rule.crafted === "not-crafted" && !ctx.isCraftedVal)
    parts.push(formatConditionResult(`crafted=${rule.crafted}`, pass))
  }
  if (rule.bound !== undefined) {
    const pass =
      (rule.bound === "bound" && ctx.isBoundVal) || (rule.bound === "not-bound" && !ctx.isBoundVal)
    parts.push(formatConditionResult(`bound=${rule.bound}`, pass))
  }
  if (rule.bopTradeable !== undefined) {
    const pass =
      (rule.bopTradeable === "bop-tradeable" && ctx.isBoPTradeableVal) ||
      (rule.bopTradeable === "not-bop-tradeable" && !ctx.isBoPTradeableVal)
    parts.push(formatConditionResult(`bopTradeable=${rule.bopTradeable}`, pass))
  }
  if (rule.questRelevant !== undefined) {
    const pass =
      (rule.questRelevant === "quest-relevant" && ctx.isQuestRelevantVal) ||
      (rule.questRelevant === "not-quest-relevant" && !ctx.isQuestRelevantVal)
    parts.push(formatConditionResult(`questRelevant=${rule.questRelevant}`, pass))
  }
  if (rule.locked !== undefined) {
    const pass =
      (rule.locked === "locked" && ctx.isLocked) || (rule.locked === "not-locked" && !ctx.isLocked)
    parts.push(formatConditionResult(`locked=${rule.locked}`, pass))
  }
  if (rule.reconstructed !== undefined) {
    const pass =
      (rule.reconstructed === "reconstructed" && ctx.isReconstructedVal) ||
      (rule.reconstructed === "not-reconstructed" && !ctx.isReconstructedVal)
    parts.push(formatConditionResult(`reconstructed=${rule.reconstructed}`, pass))
  }
  if (rule.transmuted !== undefined) {
    const pass =
      (rule.transmuted === "transmuted" && ctx.isTransmutedVal) ||
      (rule.transmuted === "not-transmuted" && !ctx.isTransmutedVal)
    parts.push(formatConditionResult(`transmuted=${rule.transmuted}`, pass))
  }
  if (rule.maxQuality !== undefined) {
    const op = rule.qualityOp ?? "<="
    parts.push(formatConditionResult(`quality${op}${rule.maxQuality}`, true))
  }
  if (rule.traits !== undefined) {
    parts.push(`traits=[${rule.traits.join(",")}]`)
  }
  if (rule.location !== undefined) {
    parts.push(`location=[${rule.location.join(",")}]`)
  }
  if (rule.canCompanionEquip !== undefined) {
    const canCE = ctx.traitType >= 34 && ctx.traitType <= 60
    const pass =
      (rule.canCompanionEquip === "can-companion-equip" && canCE) ||
      (rule.canCompanionEquip === "cannot-companion-equip" && !canCE)
    parts.push(formatConditionResult(`canCompanionEquip=${rule.canCompanionEquip}`, pass))
  }
  if (rule.isTargetEquip !== undefined) {
    parts.push(`isTargetEquip=${rule.isTargetEquip}`)
  }
  if (rule.isTargetCompanionEquip !== undefined) {
    parts.push(`isTargetCompanionEquip=${rule.isTargetCompanionEquip}`)
  }
  if (rule.allStocked !== undefined) {
    parts.push(`allStocked=${rule.allStocked}`)
  }
  if (rule.itemNamePattern !== undefined) {
    parts.push(`name~"${rule.itemNamePattern}"`)
  }
  if (rule.potionEffects !== undefined && rule.potionEffects.length > 0) {
    const mode = rule.potionEffectsMode ?? "any"
    parts.push(`potionEffects(${mode})=[${rule.potionEffects.join(",")}]`)
  }
  if (rule.canInspire !== undefined) {
    parts.push(`canInspire=${rule.canInspire}`)
  }
  if (rule.canOpen !== undefined) {
    parts.push(`canOpen=${rule.canOpen}`)
  }
  if (rule.canGiveMaxRewards !== undefined) {
    parts.push(`canGiveMaxRewards=${rule.canGiveMaxRewards}`)
  }
  if (rule.known !== undefined) {
    parts.push(`known=${rule.known}`)
  }
  if (rule.canUnlock !== undefined) {
    parts.push(`canUnlock=${rule.canUnlock}`)
  }
  if (rule.canResearch !== undefined) {
    parts.push(`canResearch=${rule.canResearch}`)
  }

  pushValueConditions(parts, rule, ctx)

  return parts.length > 0 ? parts.join(", ") : ""
}
