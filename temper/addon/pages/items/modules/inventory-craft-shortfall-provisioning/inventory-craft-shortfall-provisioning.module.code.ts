import {
  PR_DRINK_4X,
  PR_FOOD_4X,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-required-skill/writ-required-skill.module.code.ts"
import type {
  CraftCandidate,
  CraftFound,
  CraftShortfallResolver,
  Takes,
} from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall/inventory-craft-shortfall.module.code.ts"
import {
  type PassiveNeed,
  yieldPassive,
} from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall-plan/inventory-craft-shortfall-plan.module.code.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

const RECIPE_IMPROVEMENT = "Recipe Improvement"

const RECIPE_QUALITY = "Recipe Quality"

function recipePassives(
  this: void,
  listIndex: number,
  recipeIndex: number,
  qualityReq: number,
  itemLink: string
): PassiveNeed[] {
  const passives: PassiveNeed[] = []
  const numRequirements = GetNumRecipeTradeskillRequirements(listIndex, recipeIndex)
  for (let i = 1; i <= numRequirements; i++) {
    const [tradeskill, levelRequirement] = GetRecipeTradeskillRequirement(listIndex, recipeIndex, i)
    passives.push({
      passive:
        tradeskill === CRAFTING_TYPE_PROVISIONING
          ? RECIPE_IMPROVEMENT
          : `${GetCraftingSkillName(tradeskill)} level`,
      have: GetNonCombatBonus(GetNonCombatBonusLevelTypeForTradeskillType(tradeskill)),
      need: levelRequirement,
    })
  }
  if (qualityReq > 0) {
    passives.push({
      passive: RECIPE_QUALITY,
      have: GetNonCombatBonus(NON_COMBAT_BONUS_PROVISIONING_RARITY_LEVEL),
      need: qualityReq,
    })
  }
  const [itemType] = GetItemLinkItemType(itemLink)
  passives.push(yieldPassive(itemType === ITEMTYPE_DRINK ? PR_DRINK_4X : PR_FOOD_4X))
  return passives
}

function candidateFor(
  this: void,
  listIndex: number,
  recipeIndex: number,
  qualityReq: number,
  itemLink: string
): CraftCandidate {
  return {
    made: itemLink,
    passives: recipePassives(listIndex, recipeIndex, qualityReq, itemLink),
    yieldPerCraft: function (this: void): number {
      return GetRecipeResultQuantity(listIndex, recipeIndex, 1)
    },
    maxCrafts: function (this: void): number {
      const [most] = GetMaxIterationsPossibleForRecipe(listIndex, recipeIndex)
      return most
    },
    craft: function (this: void, crafts: number): undefined {
      CraftProvisionerItem(listIndex, recipeIndex, crafts)
    },
  }
}

function findRecipe(this: void, takes: Takes): CraftFound {
  const numLists = GetNumRecipeLists()
  for (let listIndex = 1; listIndex <= numLists; listIndex++) {
    const [, numRecipes] = GetRecipeListInfo(listIndex)
    for (let recipeIndex = 1; recipeIndex <= numRecipes; recipeIndex++) {
      const [known, , , , qualityReq, , stationType] = GetRecipeInfo(listIndex, recipeIndex)
      if (!known || stationType !== CRAFTING_TYPE_PROVISIONING) continue
      const itemLink = GetRecipeResultItemLink(listIndex, recipeIndex, LINK_STYLE_BRACKETS)
      if (itemLink === "" || !takes(itemLink)) continue
      return {
        kind: "found",
        candidate: candidateFor(listIndex, recipeIndex, qualityReq, itemLink),
      }
    }
  }
  return { kind: "refused", why: "this character knows no recipe for anything the rule takes" }
}

export function provisioningShortfallResolver(this: void): CraftShortfallResolver {
  return {
    craftType: CRAFTING_TYPE_PROVISIONING,
    categoryIds: ["food", "drink"],
    itemTypes: [ITEMTYPE_FOOD, ITEMTYPE_DRINK],
    find: findRecipe,
  }
}
