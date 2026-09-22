import { asNumber } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-casts/potion-casts.module.code.ts"
import {
  TRAIT_EFFECT,
  type TraitEffect,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-constants/potion-constants.module.code.ts"
import { getPlayerSettings } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-state/potion-state.module.code.ts"
import type { Potion } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-types/potion-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export type FavoriteFilter = (this: void, potion: Potion) => unknown

export type ConditionData = Record<string, QuestConditionRow>

function asFavoriteFilter(value: unknown): FavoriteFilter {
  return value as FavoriteFilter
}

function asTraitEffect(value: unknown): TraitEffect {
  return value as TraitEffect
}

function asConditionData(value: unknown): ConditionData {
  return value as ConditionData
}

function parseLinkNumber(this: void, raw: string | undefined): number | undefined {
  return tonumber(raw)
}

function parseLinkPart(this: void, raw: string | undefined): string {
  return raw ?? ""
}

export function matchesQuest(this: void, self: Potion): boolean {
  const quests = PotMaker.quests
  if (quests === undefined || quests.length === 0) {
    return false
  }

  let itemId: number | undefined
  let traits: number | undefined
  for (let i = 0; i < quests.length; i = i + 1) {
    const quest = quests[i]
    if (quest === undefined) {
      continue
    }
    const questIndex = asNumber(quest.questIndex)
    const rawConditionData = quest.conditionData
    const conditionData =
      rawConditionData === undefined ? undefined : asConditionData(rawConditionData)
    if (conditionData === undefined) {
      continue
    }
    for (const key in conditionData) {
      const condition = conditionData[key]
      if (condition === undefined) {
        continue
      }
      if (condition.isMasterWrit === true) {
        const solvent = self.solvent
        if (solvent === undefined) {
          continue
        }
        for (const pack of solvent.pack) {
          if (pack === undefined) {
            continue
          }
          if (
            IsAlchemySolventForItemAndMaterialId(
              pack.bagId,
              pack.slotIndex,
              condition.itemId,
              condition.materialItemId
            )
          ) {
            if (itemId === undefined) {
              const [matchedItemId, matchedTraits] = string.match(
                self.itemLink,
                "^|H[^:]+:item:([^:]+):[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:([^|]+)|h"
              )
              itemId = parseLinkNumber(matchedItemId)
              traits = parseLinkNumber(matchedTraits)
            }
            if (condition.itemId === itemId && condition.encodedAlchemyTraits === traits) {
              return true
            }
          }
        }
      } else {
        if (
          DoesItemLinkFulfillJournalQuestCondition(
            self.itemLink,
            questIndex,
            1,
            condition.conditionIndex,
            true
          )
        ) {
          return true
        }
      }
    }
  }
  return false
}

export interface QuestConditionRow {
  isMasterWrit?: boolean
  itemId: number
  materialItemId: number
  encodedAlchemyTraits: number
  conditionIndex: number
}

const MUST_HAVES: Record<string, boolean> = {}

export function conformsToSearch(
  this: void,
  self: Potion,
  searchTerms: Record<string, TraitEffect>
): boolean {
  const playerSettings = getPlayerSettings()
  if (
    self.solvent !== undefined &&
    self.itemLink === "" &&
    !(playerSettings.useUnknown || playerSettings.useMissing)
  ) {
    return false
  }

  if (PotMaker.questPotionsOnly) {
    if (self.itemLink === "") {
      return false
    }
    if (!matchesQuest(self)) {
      return false
    }
  }

  if (PotMaker.favoritesOnly) {
    createFavoriteIdentifier(self)
    const favoriteFilter = PotMaker.favoriteFilter
    if (favoriteFilter === undefined) {
      return false
    }
    const filterFn = asFavoriteFilter(favoriteFilter)
    if (filterFn(self) === undefined || filterFn(self) === false) {
      return false
    }
  }

  const terms = searchTerms
  const [firstTermKey] = next(terms)
  const searchTermsExist = firstTermKey !== undefined
  let unknownTrait = false
  ZO_ClearTable(MUST_HAVES)

  const useUnknown = playerSettings.useUnknown
  if (searchTermsExist || useUnknown) {
    for (const traitName in self.traits) {
      if (terms[traitName] === asTraitEffect(false)) {
        return false
      }
      if (useUnknown) {
        for (let j = 0; j < self.ingredients.length; j = j + 1) {
          const ingredient = self.ingredients[j]
          if (ingredient !== undefined && ingredient.traits[traitName] === TRAIT_EFFECT.None) {
            unknownTrait = true
            break
          }
        }
      }
      if (terms[traitName] === asTraitEffect(true)) {
        MUST_HAVES[traitName] = true
      }
    }
    for (const k in terms) {
      const v = terms[k]
      if (v !== undefined && v !== asTraitEffect(false) && MUST_HAVES[k] === undefined) {
        return false
      }
    }
  }
  if (!(useUnknown && playerSettings.training) || (useUnknown && unknownTrait)) {
    return true
  }
  return self.solvent === undefined
}

const FAV_INGREDIENTS: (number | undefined)[] = [0, 0, 0]

export function createFavoriteIdentifier(this: void, self: Potion): undefined {
  if (typeof self.itemId === "string" && self.itemId !== "") {
    return
  }

  const [matchedItem1, matchedItem3, matchedItem2] = string.match(
    self.itemLink,
    "^|H[^:]+:item:([^:]+):[^:]+:([^:]+):[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:([^|]+)|h"
  )
  let item1 = parseLinkPart(matchedItem1)
  let item3 = parseLinkPart(matchedItem3)
  let item2 = parseLinkPart(matchedItem2)
  if (matchedItem1 === undefined) {
    item1 = ""
    item2 = ""
    item3 = ""
  }
  let index = 0
  FAV_INGREDIENTS[2] = undefined
  for (const ingredient of self.ingredients) {
    if (ingredient !== undefined) {
      FAV_INGREDIENTS[index] = ingredient.itemId
      index = index + 1
    }
  }
  table.sort(FAV_INGREDIENTS)
  self.sameTraitsId = `${item1}_${item2}`
  self.samePotionId = `${self.sameTraitsId}_${item3}`
  const a = FAV_INGREDIENTS[0] ?? 0
  const b = FAV_INGREDIENTS[1] ?? 0
  const c = FAV_INGREDIENTS[2]
  self.itemId =
    index === 3 && c !== undefined
      ? `${self.samePotionId}_${a}_${b}_${c}`
      : `${self.samePotionId}_${a}_${b}`
}
