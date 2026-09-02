import { asNumber } from "../potion-casts/potion-casts.module.code.ts"
import type { TraitEffect } from "../potion-constants/potion-constants.module.code.ts"
import {
  COLOR_SELECT,
  TEXTURE_HIGHLIGHT,
  TEXTURE_REAGENTUNKNOWN,
  TRAIT_EFFECT,
} from "../potion-constants/potion-constants.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import type {
  Ingredient,
  IngredientFactory,
  MatchResult,
} from "../potion-types/potion-types.module.code.ts"

function asIngredient(value: unknown): Ingredient {
  return value as Ingredient
}

function matchIngredient1(
  this: void,
  self: Ingredient,
  passiveIngredient: Ingredient
): MatchResult {
  const matched: Record<string, TraitEffect> = {}
  const badTraitMatches = PotMaker.badTraitMatches
  const oppositeTraits = PotMaker.oppositeTraits
  for (const trait in self.traits) {
    const opposite = oppositeTraits[trait]
    const oppositePresent =
      opposite !== undefined && passiveIngredient.traits[opposite] !== undefined
    if (passiveIngredient.traits[trait] !== undefined && !oppositePresent) {
      matched[trait] = badTraitMatches[trait] === true ? TRAIT_EFFECT.Bad : TRAIT_EFFECT.Good
    }
  }
  return { matched, passSingleTrait: false, count: 0 }
}

function matchIngredient(this: void, self: Ingredient, passiveIngredient: Ingredient): MatchResult {
  const matched: Record<string, TraitEffect> = {}
  let passSingleTrait = false
  let addsOpposite = false
  let addsBad = false
  const badTraitMatches = PotMaker.badTraitMatches
  const oppositeTraits = PotMaker.oppositeTraits
  const passiveTraits = passiveIngredient.traits
  let activeTraits = 0
  let count = 0
  for (const trait in self.traits) {
    const effect = self.traits[trait]
    const double = effect === TRAIT_EFFECT.Bad || effect === TRAIT_EFFECT.Good
    let doubleInserted = false
    if (double) {
      activeTraits = activeTraits + 1
    }
    const oppositeTrait = oppositeTraits[trait]
    const passiveHasOpposite =
      oppositeTrait !== undefined && passiveTraits[oppositeTrait] !== undefined
    if (double && passiveHasOpposite) {
      doubleInserted = true
      if (effect === TRAIT_EFFECT.Bad) {
        if (addsBad) {
          return { matched, passSingleTrait: false, count }
        }
        addsBad = true
        addsOpposite = true
      }
    }
    const oppositeAbsentOnPassive =
      oppositeTrait === undefined || passiveTraits[oppositeTrait] === undefined
    const oppositeAbsentOnSelf =
      oppositeTrait === undefined || self.traits[oppositeTrait] === undefined
    if (passiveTraits[trait] !== undefined && oppositeAbsentOnPassive && oppositeAbsentOnSelf) {
      if (badTraitMatches[trait] === true) {
        if (double) {
          matched[trait] = TRAIT_EFFECT.VeryBad
          count = count + 1
          doubleInserted = true
          passSingleTrait = true
        } else if (!addsBad) {
          matched[trait] = TRAIT_EFFECT.Bad
          count = count + 1
        }
      } else {
        if (double) {
          matched[trait] = TRAIT_EFFECT.VeryGood
          count = count + 1
          doubleInserted = true
          passSingleTrait = true
        } else {
          matched[trait] = TRAIT_EFFECT.Good
          count = count + 1
        }
      }
    }
    if (double && !doubleInserted && effect !== undefined) {
      matched[trait] = effect
      count = count + 1
    }
  }
  if (addsOpposite && addsBad && count === 1 && activeTraits > 1) {
    passSingleTrait = true
  }
  return { matched, passSingleTrait, count }
}

function resetStack(this: void, self: Ingredient): undefined {
  self.pack = []
  self.stack = 0
}

function newIngredient(this: void, o: Partial<Ingredient> & { itemId: number }): Ingredient {
  const instance = asIngredient(o)
  instance.stack = 0
  if (instance.itemId > 0) {
    const ref = PotMaker.allReagents[instance.itemId]
    instance.itemLink = ref?.itemLink
  }
  if (instance.itemLink !== undefined) {
    instance.name = GetItemLinkName(instance.itemLink)
  }
  instance.matchIngredient1 = matchIngredient1
  instance.matchIngredient = matchIngredient
  instance.ResetStack = resetStack
  return instance
}

function solventIngredient(this: void, o: Partial<Ingredient>): Ingredient {
  const instance = asIngredient(o)
  instance.stack = 0
  instance.matchIngredient1 = matchIngredient1
  instance.matchIngredient = matchIngredient
  instance.ResetStack = resetStack
  return instance
}

const INGREDIENT_FACTORY: IngredientFactory = {
  name: "",
  itemId: 0,
  level: 0,
  icon: TEXTURE_REAGENTUNKNOWN,
  new: newIngredient,
  solvent: solventIngredient,
}

PotMaker.Ingredient = INGREDIENT_FACTORY

function toggleButton(this: void, resultButton: TemperCraftingControl, button: number): undefined {
  if (button !== MOUSE_BUTTON_INDEX_LEFT) {
    return
  }

  const checkState = resultButton.checkState ?? TRISTATE_CHECK_BUTTON_INDETERMINATE
  if (resultButton.tristate === true) {
    if (checkState === TRISTATE_CHECK_BUTTON_INDETERMINATE) {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_CHECKED)
    } else if (checkState === TRISTATE_CHECK_BUTTON_UNCHECKED) {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_INDETERMINATE)
    } else {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_UNCHECKED)
    }
  } else {
    if (checkState !== TRISTATE_CHECK_BUTTON_CHECKED) {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_CHECKED)
    } else {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_UNCHECKED)
    }
  }
}

function setToggleButton(
  this: void,
  resultButton: TemperCraftingControl,
  checkState: number | boolean
): undefined {
  const control = resultButton.GetNamedChild<TextureControl>("Outline")
  resultButton.checkState = asNumber(checkState)
  if (control === undefined) {
    return
  }
  if (resultButton.tristate === true) {
    if (checkState === TRISTATE_CHECK_BUTTON_CHECKED) {
      const color = PotMaker.traitColor[TRAIT_EFFECT.VeryGood]
      if (color !== undefined) {
        const [r, g, b] = color.UnpackRGB()
        control.SetColor(r, g, b)
      }
      control.SetTexture("esoui/art/cadwell/check.dds")
    } else if (checkState === TRISTATE_CHECK_BUTTON_UNCHECKED) {
      const color = PotMaker.traitColor[TRAIT_EFFECT.VeryBad]
      if (color !== undefined) {
        const [r, g, b] = color.UnpackRGB()
        control.SetColor(r, g, b)
      }
      control.SetTexture("esoui/art/dye/gamepad/gp_disabled_x.dds")
    }
    control.SetHidden(checkState === TRISTATE_CHECK_BUTTON_INDETERMINATE)
  } else {
    if (checkState === TRISTATE_CHECK_BUTTON_CHECKED) {
      const [r, g, b] = COLOR_SELECT.UnpackRGB()
      control.SetColor(r, g, b)
      control.SetTexture(TEXTURE_HIGHLIGHT)
    }
    control.SetHidden(checkState !== TRISTATE_CHECK_BUTTON_CHECKED)
  }
}

function toggleButtonIsChecked(this: void, resultButton: TemperCraftingControl): boolean {
  return resultButton.checkState === TRISTATE_CHECK_BUTTON_CHECKED
}

function getToggleButtonCheckState(this: void, resultButton: TemperCraftingControl): number {
  return resultButton.checkState ?? TRISTATE_CHECK_BUTTON_INDETERMINATE
}

PotMaker.ToggleButton = toggleButton
PotMaker.SetToggleButton = setToggleButton
PotMaker.ToggleButtonIsChecked = toggleButtonIsChecked
PotMaker.GetToggleButtonCheckState = getToggleButtonCheckState
