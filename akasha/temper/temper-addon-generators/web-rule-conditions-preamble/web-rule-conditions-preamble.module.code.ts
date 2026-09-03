export const WEB_CONDITIONS_PREAMBLE = `\
/**
 * Inventory Rule Conditions (Generated)
 *
 * Condition evaluation for the inventory rule matcher (web platform).
 * Source: akasha/rules-engine/rule-conditions/rule-conditions.module.code.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { findCooldownGroup, isRftwContainer } from "@temper/game-items-core/cooldown-groups"
import { isCraftingRankBelowCap } from "@temper/game-items-core/crafting-passive-ranks"
import { inferDeconCraftingTypeFromItem } from "@temper/game-items-core/decon-crafting-type-inference"
import { signatureMatchesItem } from "@temper/game-items-core/equipment-signature-matcher"
import { esoTraitToTemperId } from "@temper/game-items-core/eso-trait-reverse-map"
import { SET_ESO_ID_TO_CATEGORY } from "@temper/game-items-core/generated/set-category-mappings.generated"
import { computeValue } from "@temper/game-items-core/inventory-display-value"
import {
  ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
  ESO_ITEMTYPE_RECIPE,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
  type InventoryItemData,
} from "@temper/game-items-core/inventory-types"
import { itemNameMatchesPattern } from "@temper/game-items-core/item-name-pattern"
import { STYLE_TO_CHAPTERS } from "@temper/game-items-core/motif-chapter-set"
import { parseMotifBookName } from "@temper/game-items-core/motif-name-parser"
import { getRecipeResultId } from "@temper/game-items-core/recipe-result-id-lookup"
import { getScriptItemIdByName } from "@temper/game-items-core/script-knowledge-lookup"
import { compareWithOp } from "../filters/comparison-op"
import { TOTAL_SCRIPT_COUNT } from "../generated/scribing-total-script-count.generated"
import { isTraitResearchableByAnyCharacter } from "../inventory-rule-trait-research"
import type { CategoryRule } from "../inventory-rule-types"
import { resolvePotionRestoreMetricIds } from "../potion-restore-resolve"
import { resolveThreshold } from "../rule-constants"
import type { RuleMatcherContext } from "../rule-matcher-context-types"
`
