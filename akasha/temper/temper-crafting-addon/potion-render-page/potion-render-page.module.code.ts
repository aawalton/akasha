import { libAsync } from "../craft-libraries/craft-libraries.module.code.ts"
import { asNumber } from "../potion-casts/potion-casts.module.code.ts"
import {
  COLOR_SELECT,
  COLOR_USEABLE,
  PAGE_SIZE,
  TEXTURE_FAVORITE,
  TEXTURE_REAGENTUNKNOWN,
  TEXTURE_TRAITUNKNOWN,
} from "../potion-constants/potion-constants.module.code.ts"
import {
  asIngredientRuntime,
  asPotion,
  asResultControl,
  type ReagentControl,
  type ResultControl,
  type TraitControl,
} from "../potion-result-controls/potion-result-controls.module.code.ts"
import { getSavedFavorites } from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import type {} from "../potion-types/potion-types.module.code.ts"
import "../potion-refresh-traits/potion-refresh-traits.module.code.ts"

function renderLastStep(this: void): undefined {
  if (PotMaker.doablePotions.length > PotMaker.resultsMaxIndex + PAGE_SIZE) {
    TemperPotionsOutputNextButton.SetEnabled(true)
  } else {
    TemperPotionsOutputNextButton.SetEnabled(false)
  }
  if (PotMaker.resultsMaxIndex > 0) {
    TemperPotionsOutputPreviousButton.SetEnabled(true)
  } else {
    TemperPotionsOutputPreviousButton.SetEnabled(false)
  }
  if (PotMaker.resultsMaxIndex === 0 && PotMaker.doablePotions.length <= PAGE_SIZE) {
    TemperPotionsOutputPageLabel.SetHidden(true)
  } else {
    const currentPage = math.floor(PotMaker.resultsMaxIndex / PAGE_SIZE) + 1
    const totalPages = math.floor((PotMaker.doablePotions.length - 1) / PAGE_SIZE) + 1
    TemperPotionsOutputPageLabel.SetText(
      zo_strjoin(" / ", COLOR_SELECT.Colorize(tostring(currentPage)), totalPages)
    )
    TemperPotionsOutputPageLabel.SetHidden(false)
  }
}

function renderPage(this: void): undefined {
  TemperPotionsOutputPreviousButton.SetEnabled(false)
  TemperPotionsOutputNextButton.SetEnabled(false)
  TemperPotionsOutputPageLabel.SetHidden(true)
  PotMaker.SetSelected(asPotion(undefined))

  const uniqueNamePrefix = "TemperPotionsResult"
  const resultList = TemperPotionsOutputResultsBG
  const numChildren = resultList.GetNumChildren()
  for (let i = 1; i <= numChildren; i++) {
    const child = resultList.GetChild<ResultControl>(i)
    if (child !== undefined) {
      child.SetHidden(true)
      child.potion = undefined
    }
  }
  TemperPotionsOutput.SetHidden(false)
  TemperPotions.SetHidden(true)
  PotMaker.resultListShown = true

  if (PotMaker.doablePotions.length === 0) {
    return
  }

  const resultLineOffsetX = 10
  const resultLineOffsetY = 4
  const allReagents = PotMaker.allReagents
  const savedFavorites = getSavedFavorites()

  const startIndex = math.min(PotMaker.resultsMaxIndex, PotMaker.doablePotions.length) + 1
  const endIndex = math.min(PotMaker.resultsMaxIndex + PAGE_SIZE, PotMaker.doablePotions.length)
  libAsync()
    .For(startIndex, endIndex)
    .Do((rawIndex: unknown): unknown => {
      const i = asNumber(rawIndex)
      const v = PotMaker.doablePotions[i - 1]
      if (v === undefined) {
        return undefined
      }
      const index = i - PotMaker.resultsMaxIndex
      const existingControl = PotMaker.ResultControls[index - 1]
      let control = existingControl === undefined ? undefined : asResultControl(existingControl)
      if (control === undefined) {
        control = GetControl<ResultControl>(uniqueNamePrefix, index)
      }

      if (control === undefined) {
        const created = CreateControlFromVirtual<ResultControl>(
          uniqueNamePrefix + tostring(index),
          TemperPotionsOutputResultsBG,
          "TemperPotionsResult"
        )
        control = created
        const favControl = created.GetNamedChild<TextureControl>("Favorite")
        if (favControl !== undefined) {
          favControl.SetTexture(TEXTURE_FAVORITE)
        }
        const traitControls: Record<number, TraitControl | undefined> = {}
        created.traits = traitControls
        for (let count = 1; count <= 4; count++) {
          const traitName = PotMaker.traitControlNames[count]
          traitControls[count] =
            traitName === undefined ? undefined : created.GetNamedChild<TraitControl>(traitName)
        }
        const reagentControls: Record<number, ReagentControl | undefined> = {}
        created.reagents = reagentControls
        for (let count = 1; count <= 3; count++) {
          const reagentName = PotMaker.reagentControlNames[count]
          reagentControls[count] =
            reagentName === undefined
              ? undefined
              : created.GetNamedChild<ReagentControl>(reagentName)
        }
      } else {
        control.SetHidden(false)
      }

      for (let count = 1; count <= 4; count++) {
        const traitControl = control.traits[count]
        if (traitControl !== undefined) {
          traitControl.Trait = undefined
          traitControl.SetHidden(true)
        }
      }
      for (let count = 1; count <= 3; count++) {
        const reagentControl = control.reagents[count]
        if (reagentControl !== undefined) {
          reagentControl.SetHidden(true)
          reagentControl.reagent = undefined
        }
      }
      let count = 0
      for (const traitName in v.traits) {
        const effect = v.traits[traitName]
        if (effect === undefined) {
          continue
        }
        const traitColor = PotMaker.traitColor[effect]
        if (traitColor !== undefined) {
          count = count + 1
          if (count > 4) {
            break
          }
          let traitTexture: string | undefined
          let known = false
          for (const ingredientEntry of v.ingredients) {
            const ingredient =
              ingredientEntry === undefined ? undefined : asIngredientRuntime(ingredientEntry)
            if (ingredient === undefined) {
              continue
            }
            const reagent = allReagents[ingredient.itemId]
            if (reagent !== undefined && reagent.traits[traitName] !== undefined) {
              if (
                ingredient.iconTraits[traitName] === undefined &&
                reagent.traits[traitName] !== true
              ) {
                traitTexture = TEXTURE_TRAITUNKNOWN
              } else {
                known = true
                if (traitTexture === undefined) {
                  traitTexture = ingredient.iconTraits[traitName]
                }
              }
            }
          }

          const traitControl = control.traits[count]
          if (traitControl !== undefined) {
            traitControl.Trait = traitName
            const [tr, tg, tb] = traitColor.UnpackRGB()
            traitControl.SetColor(tr, tg, tb)
            const texture =
              traitTexture !== undefined
                ? traitTexture
                : known
                  ? TEXTURE_REAGENTUNKNOWN
                  : TEXTURE_TRAITUNKNOWN
            traitControl.SetTexture(texture)
            traitControl.SetHidden(false)
          }
        }
      }
      const trait1 = control.traits[1]
      const trait2 = control.traits[2]
      const trait3 = control.traits[3]
      const trait4 = control.traits[4]
      if (count <= 2) {
        if (trait1 !== undefined) {
          trait1.SetAnchor(TOPRIGHT, undefined, TOPRIGHT, -24, 12)
        }
      } else {
        if (trait1 !== undefined) {
          trait1.SetAnchor(TOPRIGHT, undefined, TOPRIGHT, -24, 0)
        }
      }
      if (count === 2) {
        if (trait2 !== undefined) {
          trait2.SetAnchor(TOPRIGHT, undefined, TOPRIGHT, -48, 12)
        }
      } else {
        if (trait2 !== undefined) {
          trait2.SetAnchor(TOPRIGHT, undefined, TOPRIGHT, -24, 24)
        }
      }
      if (count === 3) {
        if (trait3 !== undefined) {
          trait3.SetAnchor(TOPRIGHT, undefined, TOPRIGHT, -48, 12)
        }
      } else if (count === 4) {
        if (trait3 !== undefined) {
          trait3.SetAnchor(TOPRIGHT, undefined, TOPRIGHT, -48, 0)
        }
        if (trait4 !== undefined) {
          trait4.SetAnchor(TOPRIGHT, undefined, TOPRIGHT, -48, 24)
        }
      }

      control.SetSimpleAnchorParent(
        resultLineOffsetX,
        resultLineOffsetY + control.GetHeight() * (index - 1)
      )

      for (let j = 1; j <= v.ingredients.length; j++) {
        const reagentControl = control.reagents[j]
        const ingredientEntry = v.ingredients[j - 1]
        const ingredient =
          ingredientEntry === undefined ? undefined : asIngredientRuntime(ingredientEntry)
        if (reagentControl !== undefined && ingredient !== undefined) {
          reagentControl.SetTexture(ingredient.icon)
          reagentControl.SetHidden(false)
          const tintColor = ingredient.protected === true ? STAT_LOWER_COLOR : COLOR_USEABLE
          const [rr, rg, rb] = tintColor.UnpackRGB()
          reagentControl.SetColor(rr, rg, rb)
          reagentControl.reagent = ingredient
        }
      }
      const textControl = control.GetNamedChild<LabelControl>("Text")
      if (textControl !== undefined) {
        textControl.SetText(PotMaker.Potion.getIngredientString(v))
      }
      const inBagControl = control.GetNamedChild<LabelControl>("InBag")
      if (inBagControl !== undefined) {
        inBagControl.SetText(PotMaker.Potion.getInBagString(v))
      }

      const favControl = control.GetNamedChild<TextureControl>("Favorite")
      if (favControl !== undefined) {
        let hidden = true
        const reagentsColor = PotMaker.favoriteColor.REAGENTS
        const potionColor = PotMaker.favoriteColor.POTION
        const traitsColor = PotMaker.favoriteColor.TRAITS
        if (savedFavorites[tostring(v.itemId)] !== undefined && reagentsColor !== undefined) {
          hidden = false
          const [fr, fg, fb] = reagentsColor.UnpackRGB()
          favControl.SetColor(fr, fg, fb)
        } else if (
          PotMaker.samePotions[tostring(v.samePotionId)] !== undefined &&
          potionColor !== undefined
        ) {
          hidden = false
          const [fr, fg, fb] = potionColor.UnpackRGB()
          favControl.SetColor(fr, fg, fb)
        } else if (
          PotMaker.sameTraits[tostring(v.sameTraitsId)] !== undefined &&
          traitsColor !== undefined
        ) {
          hidden = false
          const [fr, fg, fb] = traitsColor.UnpackRGB()
          favControl.SetColor(fr, fg, fb)
        }
        favControl.SetHidden(hidden)
      }

      control.potion = v
      PotMaker.ResultControls[index - 1] = control
      return undefined
    })
    .Then(renderLastStep)
}

PotMaker.RenderPage = renderPage
