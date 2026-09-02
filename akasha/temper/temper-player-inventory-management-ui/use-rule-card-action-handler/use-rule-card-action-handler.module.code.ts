"use client"

import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { INVENTORY_RULE_FILTERS } from "@akasha/temper-items-rules-core/rule-filter-registry"
import type { FilterId } from "@akasha/temper-items-rules-core/rule-filter-types"
import type React from "react"
import { ACTION_OPTIONS, SELL_ACTIONS } from "../action-options/action-options.module.code.ts"
import { patchConditions } from "../rule-card-conditions-patch/rule-card-conditions-patch.module.code.ts"
import type { RuleCardOnUpdate } from "../use-rule-card/use-rule-card.module.code.ts"

export function buildActionChangeHandler(
  rule: CategoryRule,
  addedFilters: readonly FilterId[],
  setAddedFilters: React.Dispatch<React.SetStateAction<FilterId[]>>,
  onUpdate: RuleCardOnUpdate
): (value: string) => void {
  return function handleActionChange(value: string) {
    const option = ACTION_OPTIONS.find((o) => o.value === value)
    if (!option) return

    let conditionsPatch: Partial<NonNullable<CategoryRule["conditions"]>> | undefined
    const filtersToRemove: FilterId[] = []
    for (const filter of INVENTORY_RULE_FILTERS) {
      if (!filter.isEligibleForAction) continue
      if (filter.isEligibleForAction(option.value)) continue
      if (filter.isPresent(rule.conditions) || addedFilters.includes(filter.id)) {
        filtersToRemove.push(filter.id)
        conditionsPatch = { ...conditionsPatch, ...filter.clear() }
      }
    }
    if (rule.action === "deconstruct" && option.value !== "deconstruct") {
      conditionsPatch = { ...conditionsPatch, canInspire: undefined }
      filtersToRemove.push("can-inspire")
    }
    if (rule.action === "list" && option.value !== "list") {
      conditionsPatch = { ...conditionsPatch, canListAtGuildTrader: undefined }
      filtersToRemove.push("can-list-at-guild-trader")
    }
    if (rule.action === "open" && option.value !== "open") {
      conditionsPatch = { ...conditionsPatch, canOpen: undefined, canGiveMaxRewards: undefined }
      filtersToRemove.push("can-open", "can-give-max-rewards")
    }
    if (rule.action === "fence-launder" && option.value !== "fence-launder") {
      conditionsPatch = { ...conditionsPatch, stolen: undefined }
      filtersToRemove.push("stolen")
    }
    if (rule.action === "fence-sell" && !SELL_ACTIONS.has(option.value)) {
      conditionsPatch = { ...conditionsPatch, stolen: undefined, canSell: undefined }
      filtersToRemove.push("stolen", "can-sell")
    }
    if (
      (rule.action === "lock" || rule.action === "unlock") &&
      option.value !== "lock" &&
      option.value !== "unlock"
    ) {
      conditionsPatch = { ...conditionsPatch, locked: undefined }
      filtersToRemove.push("locked")
    }

    if (filtersToRemove.length > 0) {
      setAddedFilters((prev) => prev.filter((id) => !filtersToRemove.includes(id)))
    }

    const conditions = conditionsPatch
      ? patchConditions(rule.conditions, conditionsPatch)
      : undefined

    if (option.value === "use") {
      const usePatch = patchConditions(conditions !== undefined ? conditions : rule.conditions, {
        canUnlock: "can-unlock",
      })
      setAddedFilters((prev) => (prev.includes("can-unlock") ? prev : [...prev, "can-unlock"]))
      onUpdate(rule.id, {
        action: option.value,
        destination: undefined,
        conditions: usePatch,
      })
      return
    }

    if (option.value === "open") {
      const openPatch = patchConditions(conditions !== undefined ? conditions : rule.conditions, {
        canOpen: "can-open",
        canGiveMaxRewards: "can-give-max-rewards",
      })
      setAddedFilters((prev) => {
        let next: FilterId[] = prev.includes("can-open") ? prev : [...prev, "can-open"]
        next = next.includes("can-give-max-rewards") ? next : [...next, "can-give-max-rewards"]
        return next
      })
      onUpdate(rule.id, {
        action: option.value,
        destination: undefined,
        conditions: openPatch,
      })
      return
    }

    if (option.value === "research") {
      const researchPatch = patchConditions(
        conditions !== undefined ? conditions : rule.conditions,
        { canResearch: "can-research" }
      )
      setAddedFilters((prev) => (prev.includes("can-research") ? prev : [...prev, "can-research"]))
      onUpdate(rule.id, {
        action: option.value,
        destination: "character:by-priority",
        conditions: researchPatch,
      })
      return
    }

    if (option.value === "fence-launder") {
      const launderPatch = patchConditions(
        conditions !== undefined ? conditions : rule.conditions,
        { stolen: "stolen" }
      )
      setAddedFilters((prev) => (prev.includes("stolen") ? prev : [...prev, "stolen"]))
      onUpdate(rule.id, {
        action: option.value,
        destination: undefined,
        conditions: launderPatch,
      })
      return
    }

    if (option.value === "character-equip") {
      const equipPatch = patchConditions(conditions !== undefined ? conditions : rule.conditions, {
        isTargetEquip: "is-target-equip",
      })
      setAddedFilters((prev) =>
        prev.includes("needed-for-target-character-build")
          ? prev
          : [...prev, "needed-for-target-character-build"]
      )
      onUpdate(rule.id, {
        action: option.value,
        destination: rule.destination,
        conditions: equipPatch,
      })
      return
    }

    if (option.value === "companion-equip") {
      const companionEquipPatch = patchConditions(
        conditions !== undefined ? conditions : rule.conditions,
        {
          canCompanionEquip: "can-companion-equip",
          isTargetCompanionEquip: "is-target-companion-equip",
        }
      )
      setAddedFilters((prev) => {
        let next: FilterId[] = prev.includes("can-companion-equip")
          ? prev
          : [...prev, "can-companion-equip"]
        next = next.includes("needed-for-target-companion-build")
          ? next
          : [...next, "needed-for-target-companion-build"]
        return next
      })
      onUpdate(rule.id, {
        action: option.value,
        destination: rule.destination,
        conditions: companionEquipPatch,
      })
      return
    }

    if (option.value === "deconstruct") {
      const deconPatch = patchConditions(conditions !== undefined ? conditions : rule.conditions, {
        canInspire: "can-inspire",
      })
      setAddedFilters((prev) => (prev.includes("can-inspire") ? prev : [...prev, "can-inspire"]))
      onUpdate(rule.id, {
        action: option.value,
        destination: "character:by-priority",
        conditions: deconPatch,
      })
      return
    }

    if (option.value === "unlock") {
      const unlockPatch = patchConditions(conditions !== undefined ? conditions : rule.conditions, {
        locked: "locked",
      })
      setAddedFilters((prev) => (prev.includes("locked") ? prev : [...prev, "locked"]))
      onUpdate(rule.id, {
        action: option.value,
        destination: undefined,
        conditions: unlockPatch,
      })
      return
    }

    if (option.value === "lock") {
      const lockPatch = patchConditions(conditions !== undefined ? conditions : rule.conditions, {
        locked: "not-locked",
      })
      setAddedFilters((prev) => (prev.includes("locked") ? prev : [...prev, "locked"]))
      onUpdate(rule.id, {
        action: option.value,
        destination: undefined,
        conditions: lockPatch,
      })
      return
    }

    if (option.value === "stock") {
      const stockPatch = patchConditions(conditions !== undefined ? conditions : rule.conditions, {
        targetQuantity: rule.conditions?.targetQuantity ?? 200,
      })
      onUpdate(rule.id, {
        action: option.value,
        stockScope: "any-character",
        destination: rule.destination ?? "bank",
        conditions: stockPatch,
      })
      return
    }

    if (option.value === "move-to") {
      onUpdate(rule.id, {
        action: option.value,
        destination: rule.destination ?? "bank",
        ...(conditions !== undefined ? { conditions } : {}),
      })
    } else if (option.value === "sell") {
      if (!SELL_ACTIONS.has(rule.action)) {
        const sellPatch = patchConditions(conditions !== undefined ? conditions : rule.conditions, {
          canSell: "can-sell",
        })
        setAddedFilters((prev) => (prev.includes("can-sell") ? prev : [...prev, "can-sell"]))
        onUpdate(rule.id, {
          action: "sell",
          destination: undefined,
          conditions: sellPatch,
        })
      } else if (conditions !== undefined) {
        onUpdate(rule.id, { conditions })
      }
    } else {
      onUpdate(rule.id, {
        action: option.value,
        destination: undefined,
        ...(conditions !== undefined ? { conditions } : {}),
      })
    }
  }
}
