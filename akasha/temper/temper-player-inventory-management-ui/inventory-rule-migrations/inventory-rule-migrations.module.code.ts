import { DEFAULT_RULES } from "@akasha/temper-items-rules-core/default-rules-data"
import type {
  InventoryRuleSettings,
  ItemAction,
} from "@akasha/temper-items-rules-core/inventory-rule-types"

const DEFAULT_RULE_GOALS = new Map(DEFAULT_RULES.map((r) => [r.id, r.goal]))

export function isInventoryRuleSettings(value: unknown): value is InventoryRuleSettings {
  if (typeof value !== "object" || value === null) return false
  if (!("version" in value) || value.version !== 2) return false
  if (!("rules" in value) || !Array.isArray(value.rules)) return false
  return true
}

export function migrateEquipActions(settings: InventoryRuleSettings): InventoryRuleSettings {
  const characterEquip: ItemAction = "character-equip"
  const companionEquip: ItemAction = "companion-equip"
  let changed = false
  const rules = settings.rules.map((r) => {
    if (r.action === "move-to" && r.destination?.startsWith("character-worn:")) {
      changed = true
      return { ...r, action: characterEquip }
    }
    if (r.action === "move-to" && r.destination?.startsWith("companion-worn:")) {
      changed = true
      return { ...r, action: companionEquip }
    }
    return r
  })
  const itemRules = (settings.itemRules ?? []).map((r) => {
    if (r.action === "move-to" && r.destination?.startsWith("character-worn:")) {
      changed = true
      return { ...r, action: characterEquip }
    }
    if (r.action === "move-to" && r.destination?.startsWith("companion-worn:")) {
      changed = true
      return { ...r, action: companionEquip }
    }
    return r
  })
  return changed ? { ...settings, rules, itemRules } : settings
}

export function migrateRemoveScopesAndFilters(
  settings: InventoryRuleSettings
): InventoryRuleSettings {
  let changed = false

  function stripConditions(
    conditions: Record<string, unknown> | undefined
  ): Record<string, unknown> | undefined {
    if (!conditions) return conditions
    const fieldsToRemove = [
      "inspireScope",
      "researchScope",
      "unlockScope",
      "canEquip",
      "equipScope",
      "targetEquipScope",
      "targetCompanionEquipScope",
      "canUse",
      "useScope",
    ]
    let stripped = false
    for (const field of fieldsToRemove) {
      if (field in conditions) {
        stripped = true
      }
    }
    if (!stripped) return conditions
    changed = true
    const result = { ...conditions }
    for (const field of fieldsToRemove) {
      delete result[field]
    }
    return Object.keys(result).length > 0 ? result : undefined
  }

  const rules = settings.rules.map((r) => {
    const original: Record<string, unknown> | undefined = r.conditions
      ? { ...r.conditions }
      : undefined
    const newConditions = stripConditions(original)
    if (newConditions === original) return r
    return { ...r, conditions: newConditions }
  })

  return changed ? { ...settings, rules } : settings
}

export function migrateGoals(settings: InventoryRuleSettings): InventoryRuleSettings {
  let changed = false
  const rules = settings.rules.map((r) => {
    if ("goal" in r) return r
    const goal = DEFAULT_RULE_GOALS.get(r.id)
    if (goal == null) return r
    changed = true
    return { ...r, goal }
  })
  return changed ? { ...settings, rules } : settings
}

export function migrateValueFieldNames(settings: InventoryRuleSettings): InventoryRuleSettings {
  let changed = false
  const rules = settings.rules.map((r) => {
    if (!r.conditions) return r
    const c: Record<string, unknown> = { ...r.conditions }
    let patched = false

    const needsValueRename =
      ("value" in c && !("marketValue" in c)) ||
      ("valueOp" in c && !("marketValueOp" in c)) ||
      ("replacementCost" in c && !("replacementValue" in c)) ||
      ("replacementCostOp" in c && !("replacementValueOp" in c))

    if (!needsValueRename) return r

    patched = true
    const newConditions = { ...c }

    if ("value" in newConditions && !("marketValue" in newConditions)) {
      newConditions.marketValue = newConditions.value
      delete newConditions.value
    }
    if ("valueOp" in newConditions && !("marketValueOp" in newConditions)) {
      newConditions.marketValueOp = newConditions.valueOp
      delete newConditions.valueOp
    }

    if ("replacementCost" in newConditions && !("replacementValue" in newConditions)) {
      newConditions.replacementValue = newConditions.replacementCost
      delete newConditions.replacementCost
    }
    if ("replacementCostOp" in newConditions && !("replacementValueOp" in newConditions)) {
      newConditions.replacementValueOp = newConditions.replacementCostOp
      delete newConditions.replacementCostOp
    }

    if (patched) changed = true
    return patched ? { ...r, conditions: newConditions } : r
  })
  return changed ? { ...settings, rules } : settings
}

export function migrateCanSellCondition(settings: InventoryRuleSettings): InventoryRuleSettings {
  let changed = false
  const rules = settings.rules.map((r) => {
    if (r.action !== "sell") return r
    if (r.conditions?.canSell !== undefined) return r
    changed = true
    return { ...r, conditions: { ...r.conditions, canSell: "can-sell" as const } }
  })
  return changed ? { ...settings, rules } : settings
}

export function migrateCanListAtGuildTraderCondition(
  settings: InventoryRuleSettings
): InventoryRuleSettings {
  let changed = false
  const rules = settings.rules.map((r) => {
    if (r.action !== "list") return r
    if (r.conditions?.canListAtGuildTrader !== undefined) return r
    changed = true
    return {
      ...r,
      conditions: { ...r.conditions, canListAtGuildTrader: "can-list-at-guild-trader" as const },
    }
  })
  return changed ? { ...settings, rules } : settings
}
