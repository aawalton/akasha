"use client"

import type { BadgeToggleGroupItem } from "@akasha/design-badges/badge-toggle-group"
import type { InventoryLocationConditionId } from "@akasha/temper-items-core/location-condition"
import type { ComparisonOpId } from "@akasha/temper-items-rules-core/comparison-op-data"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { LOCATION_OPTIONS } from "@akasha/temper-items-rules-core/location-filter"
import type { RequiredCurseStateCondition } from "@akasha/temper-items-rules-core/required-curse-state-filter-types"
import type {
  RequiredSkillLinesCondition,
  RequiredSkillLinesMode,
} from "@akasha/temper-items-rules-core/required-skill-lines-filter-types"
import { patchConditions } from "../rule-card-conditions-patch/rule-card-conditions-patch.module.code.ts"

export function useConditionHandlers(
  ruleId: string,
  conditions: CategoryRule["conditions"],
  onUpdate: (ruleId: string, patch: Partial<CategoryRule>) => void
) {
  function handleQualityChange(value: string) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { maxQuality: Number(value) }),
    })
  }

  function handleQualityOpChange(op: ComparisonOpId) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, {
        qualityOp: op === "<=" ? undefined : op,
      }),
    })
  }

  function handleTraitChange(selected: readonly BadgeToggleGroupItem[]) {
    const traits = selected.length > 0 ? selected.map((s) => s.value) : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { traits }) })
  }

  function handleSetSourceTypesChange(selected: readonly BadgeToggleGroupItem[]) {
    const types = selected.length > 0 ? selected.map((s) => s.value) : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { setSourceTypes: types }) })
  }

  function handleLocationChange(selected: readonly BadgeToggleGroupItem[]) {
    const validIds = new Set(LOCATION_OPTIONS.map((o) => o.value))
    const ids = selected
      .map((s) => s.value)
      .filter((v): v is InventoryLocationConditionId => validIds.has(v))
    const location = ids.length > 0 ? ids : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { location }) })
  }

  function handleLevelChange(value: string) {
    onUpdate(ruleId, { conditions: patchConditions(conditions, { maxLevel: Number(value) }) })
  }

  function handleLevelOpChange(op: ComparisonOpId) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, {
        levelOp: op === "<=" ? undefined : op,
      }),
    })
  }

  function handleStolenChange(value: string) {
    const stolen = value === "stolen" || value === "not-stolen" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { stolen }) })
  }

  function handleCraftedChange(value: string) {
    const crafted = value === "crafted" || value === "not-crafted" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { crafted }) })
  }

  function handleBoundChange(value: string) {
    const bound = value === "bound" || value === "not-bound" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { bound }) })
  }

  function handleBopTradeableChange(value: string) {
    const bopTradeable =
      value === "bop-tradeable" || value === "not-bop-tradeable" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { bopTradeable }) })
  }

  function handleQuestRelevantChange(value: string) {
    const questRelevant =
      value === "quest-relevant" || value === "not-quest-relevant" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { questRelevant }) })
  }

  function handleStackFullnessChange(value: string) {
    const stackFullness = value === "full" || value === "partial" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { stackFullness }) })
  }

  function handleLockedChange(value: string) {
    const locked = value === "locked" || value === "not-locked" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { locked }) })
  }

  function handleReconstructedChange(value: string) {
    const reconstructed =
      value === "reconstructed" || value === "not-reconstructed" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { reconstructed }) })
  }

  function handleTransmutedChange(value: string) {
    const transmuted = value === "transmuted" || value === "not-transmuted" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { transmuted }) })
  }

  function handleKnownChange(value: string) {
    const known = value === "known" || value === "not-known" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { known }) })
  }

  function handleCanInspireChange(value: string) {
    const canInspire = value === "can-inspire" || value === "cannot-inspire" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { canInspire }) })
  }

  function handleCanUnlockChange(value: string) {
    const canUnlock = value === "can-unlock" || value === "cannot-unlock" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { canUnlock }) })
  }

  function handleCanOpenChange(value: string) {
    const canOpen = value === "can-open" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { canOpen }) })
  }

  function handleCanGiveMaxRewardsChange(value: string) {
    const canGiveMaxRewards = value === "can-give-max-rewards" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { canGiveMaxRewards }) })
  }

  function handleCanCompanionEquipChange(value: string) {
    const canCompanionEquip =
      value === "can-companion-equip" || value === "cannot-companion-equip" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { canCompanionEquip }) })
  }

  function handleAllStockedChange(value: string) {
    const allStocked = value === "all-stocked" || value === "not-all-stocked" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { allStocked }) })
  }

  function handleStockThresholdChange(value: string) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { stockThreshold: Number(value) }),
    })
  }

  function handleCanResearchChange(value: string) {
    const canResearch = value === "can-research" || value === "cannot-research" ? value : undefined
    onUpdate(ruleId, { conditions: patchConditions(conditions, { canResearch }) })
  }

  function handleValueChange(value: string) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { value: Number(value) }),
    })
  }

  function handleValueOpChange(op: ComparisonOpId) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, {
        valueOp: op === "<=" ? undefined : op,
      }),
    })
  }

  function handleMarketValueChange(value: string) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { marketValue: Number(value) }),
    })
  }

  function handleMarketValueOpChange(op: ComparisonOpId) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, {
        marketValueOp: op === "<=" ? undefined : op,
      }),
    })
  }

  function handleMerchantValueChange(value: string) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { merchantValue: Number(value) }),
    })
  }

  function handleMerchantValueOpChange(op: ComparisonOpId) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, {
        merchantValueOp: op === "<=" ? undefined : op,
      }),
    })
  }

  function handleReplacementValueChange(value: string) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { replacementValue: Number(value) }),
    })
  }

  function handleReplacementValueOpChange(op: ComparisonOpId) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, {
        replacementValueOp: op === "<=" ? undefined : op,
      }),
    })
  }

  function handleKeepQuantityChange(value: string) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { keepQuantity: Number(value) }),
    })
  }

  function handleTargetQuantityChange(value: string) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { targetQuantity: Number(value) }),
    })
  }

  function handleItemNamePatternChange(value: string | undefined) {
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, {
        itemNamePattern: value != null && value !== "" ? value : undefined,
      }),
    })
  }

  function handleRequiredSkillLineIdsChange(selected: readonly BadgeToggleGroupItem[]) {
    const currentMode: RequiredSkillLinesMode = conditions?.requiredSkillLines?.mode ?? "all-maxed"
    if (selected.length === 0) {
      onUpdate(ruleId, {
        conditions: patchConditions(conditions, { requiredSkillLines: undefined }),
      })
      return
    }
    const next: RequiredSkillLinesCondition = {
      skillLineIds: selected.map((s) => s.value),
      mode: currentMode,
    }
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { requiredSkillLines: next }),
    })
  }

  function handleRequiredSkillLinesModeChange(value: string) {
    const mode: RequiredSkillLinesMode = value === "any-not-maxed" ? "any-not-maxed" : "all-maxed"
    const ids = conditions?.requiredSkillLines?.skillLineIds ?? []
    if (ids.length === 0) return
    const next: RequiredSkillLinesCondition = { skillLineIds: ids, mode }
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { requiredSkillLines: next }),
    })
  }

  function handlePotionEffectsChange(selected: readonly BadgeToggleGroupItem[]) {
    const currentMode: "all" | "any" = conditions?.potionEffectsMode ?? "any"
    if (selected.length === 0) {
      onUpdate(ruleId, {
        conditions: patchConditions(conditions, {
          potionEffects: undefined,
          potionEffectsMode: undefined,
        }),
      })
      return
    }
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, {
        potionEffects: selected.map((s) => s.value),
        potionEffectsMode: currentMode,
      }),
    })
  }

  function handlePotionEffectsModeChange(value: string) {
    const mode: "all" | "any" = value === "all" ? "all" : "any"
    const effects = conditions?.potionEffects ?? []
    if (effects.length === 0) return
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, {
        potionEffects: effects,
        potionEffectsMode: mode,
      }),
    })
  }

  function handleRequiredCurseStateChange(value: string) {
    if (value !== "vampire" && value !== "werewolf") {
      onUpdate(ruleId, {
        conditions: patchConditions(conditions, { requiredCurseState: undefined }),
      })
      return
    }
    const next: RequiredCurseStateCondition = { state: value }
    onUpdate(ruleId, {
      conditions: patchConditions(conditions, { requiredCurseState: next }),
    })
  }

  return {
    handleQualityChange,
    handleQualityOpChange,
    handleTraitChange,
    handleSetSourceTypesChange,
    handleLocationChange,
    handleLevelChange,
    handleLevelOpChange,
    handleStolenChange,
    handleCraftedChange,
    handleBoundChange,
    handleBopTradeableChange,
    handleQuestRelevantChange,
    handleStackFullnessChange,
    handleLockedChange,
    handleReconstructedChange,
    handleTransmutedChange,
    handleKnownChange,
    handleCanInspireChange,
    handleCanUnlockChange,
    handleCanOpenChange,
    handleCanGiveMaxRewardsChange,
    handleCanCompanionEquipChange,
    handleAllStockedChange,
    handleStockThresholdChange,
    handleCanResearchChange,
    handleValueChange,
    handleValueOpChange,
    handleMarketValueChange,
    handleMarketValueOpChange,
    handleMerchantValueChange,
    handleMerchantValueOpChange,
    handleReplacementValueChange,
    handleReplacementValueOpChange,
    handleKeepQuantityChange,
    handleTargetQuantityChange,
    handleItemNamePatternChange,
    handleRequiredSkillLineIdsChange,
    handleRequiredSkillLinesModeChange,
    handlePotionEffectsChange,
    handlePotionEffectsModeChange,
    handleRequiredCurseStateChange,
  }
}
