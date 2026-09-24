import { defined } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-defined/craft-defined.module.code.ts"
import * as PlayerState from "akasha/temper/addon/pages/items/crafting-station/modules/craft-player-state/craft-player-state.module.code.ts"
import {
  type CsQualityColor,
  QUALITY,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-quality/craft-quality.module.code.ts"
import * as Tooltips from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import {
  hideControl,
  toChat,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const WM = WINDOW_MANAGER

export interface CsRecipeButtonData {
  link: string
  rec: number
  id: number
  buttons: [string, string]
}

export interface CsRecipeButton extends ButtonControl {
  data?: CsRecipeButtonData
}

function asRecipeButton(c: ButtonControl): CsRecipeButton {
  return c as CsRecipeButton
}

export function closeRecipeWindow(): undefined {
  TemperItemsCrafting_Recipe_Window.SetHidden(true)
  const numChildren = TemperItemsCrafting_RecipePanelScrollChild.GetNumChildren()
  for (let x = 1; x <= numChildren; x++) {
    hideControl(`TemperItemsCrafting_RecipePanelScrollChildButton${x}`)
  }
}

export function getRecipeChild(id: number): CsRecipeButton {
  let btn = WM.GetControlByName<CsRecipeButton>(
    `TemperItemsCrafting_RecipePanelScrollChildButton${id}`
  )
  if (btn === undefined) {
    const created = asRecipeButton(
      WM.CreateControl(
        `TemperItemsCrafting_RecipePanelScrollChildButton${id}`,
        TemperItemsCrafting_RecipePanelScrollChild,
        CT_BUTTON
      )
    )
    created.SetAnchor(3, undefined, 3, 8, 5 + (id - 1) * 22)
    created.SetDimensions(508, 22)
    created.SetFont("TemperItemsCraftingFont")
    created.SetHidden(true)
    created.EnableMouseButton(2, true)
    created.EnableMouseButton(3, true)
    created.SetClickSound("Click")
    created.SetMouseOverFontColor(1, 0.66, 0.2, 1)
    created.SetHorizontalAlignment(0)
    created.SetVerticalAlignment(1)
    created.SetHandler("OnMouseEnter", () => {
      Tooltips.tooltip(created, true, false, TemperItemsCrafting_Recipe, "tl")
    })
    created.SetHandler("OnMouseExit", () => {
      Tooltips.tooltip(created, false)
    })
    created.SetHandler("OnMouseDown", (_self: Control, button: number) => {
      recipeMark(created, button)
    })
    btn = created
  } else {
    const [hasAnchor] = btn.GetAnchor(0)
    if (hasAnchor === false) {
      btn.SetAnchor(3, undefined, 3, 8, 5 + (id - 1) * 22)
    }
  }
  return btn
}

export function recipeMark(control: CsRecipeButton, button: number): undefined {
  const data = control.data
  if (data === undefined) {
    return
  }
  if (button === 2) {
    toChat(data.link)
  } else {
    const account = STATE.Account
    if (account === undefined) {
      return
    }
    const tracked = account.cook.ingredients[data.id] ?? false
    let mark: string
    if (tracked === true) {
      mark = ""
      account.cook.ingredients[data.id] = undefined
    } else {
      mark = "|t22:22:esoui/art/inventory/newitem_icon.dds|t "
      account.cook.ingredients[data.id] = true
    }
    const recipe = defined(STATE.Cook.recipe[data.rec])
    control.SetText(`${mark}(${recipe.level}) ${recipe.name}`)
    zo_callLater(PlayerState.updateIngredientTracking, 500)
  }
}

export function recipeShow(id: number, inc: number): number {
  const account = STATE.Account
  if (account === undefined) {
    return inc
  }
  const recipe = defined(STATE.Cook.recipe[id])
  let mark: string
  if (account.cook.ingredients[recipe.id] === true) {
    mark = "|t22:22:esoui/art/inventory/newitem_icon.dds|t "
  } else {
    mark = ""
  }
  let color: CsQualityColor
  if (recipe.known === true) {
    color = QUALITY[recipe.quality] ?? error("TemperItemsCrafting: unknown quality")
  } else {
    color = { 1: 1, 2: 0, 3: 0, 4: 1 }
  }
  const control = getRecipeChild(inc)
  control.SetNormalFontColor(color[1], color[2], color[3], color[4])
  control.SetText(`${mark}(${recipe.level}) ${recipe.name}`)
  control.SetHidden(false)
  control.data = {
    link: recipe.link,
    rec: id,
    id: recipe.id,
    buttons: [STATE.Loc.TT[6], STATE.Loc.TT[5]],
  }
  return inc + 1
}

export function recipeShowCategory(list?: number): undefined {
  const character = STATE.Character
  if (character === undefined) {
    return
  }
  let listIndex = list
  if (listIndex === undefined || listIndex > 16) {
    listIndex = 1
  }
  let inc = 1
  let known = 0
  let total = 0
  const numChildren = TemperItemsCrafting_RecipePanelScrollChild.GetNumChildren()
  for (let x = 1; x <= numChildren; x++) {
    hideControl(`TemperItemsCrafting_RecipePanelScrollChildButton${x}`)
  }
  for (const [id, recipe] of pairs(STATE.Cook.recipe)) {
    if (recipe.stat === listIndex) {
      if (recipe.known === true) {
        known = known + 1
      }
      total = total + 1
      if (
        (character.hideKnownRecipes !== true && recipe.known === true) ||
        (character.hideUnknownRecipes !== true && recipe.known !== true)
      ) {
        inc = recipeShow(id, inc)
      }
    }
  }
  TemperItemsCrafting_RecipePanelScrollChild.SetHeight(inc * 22 - 13)
  const [listName] = GetRecipeListInfo(listIndex)
  TemperItemsCrafting_RecipeHeadline.SetText(zo_strformat("<<C:1>>", listName))
  if (character.hideKnownRecipes === true && character.hideUnknownRecipes === true) {
    TemperItemsCrafting_RecipeInfo.SetText(`(0 / ${total})`)
  } else if (character.hideKnownRecipes !== true) {
    TemperItemsCrafting_RecipeInfo.SetText(`(${known} / ${total})`)
  } else if (character.hideUnknownRecipes !== true) {
    TemperItemsCrafting_RecipeInfo.SetText(`(${total - known} / ${total})`)
  }
  character.recipe = listIndex
}

export function recipeSearch(): undefined {
  const search = TemperItemsCrafting_RecipeSearch.GetText()
  let inc = 1
  if (search !== "") {
    const numChildren = TemperItemsCrafting_RecipePanelScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      const control = getRecipeChild(x)
      control.SetHidden(true)
      control.ClearAnchors()
      control.data = undefined
    }
    for (const [id, food] of pairs(STATE.Cook.recipe)) {
      const [found] = string.find(string.lower(food.name), string.lower(search))
      if (found !== undefined) {
        inc = recipeShow(id, inc)
      }
    }
    TemperItemsCrafting_RecipePanelScrollChild.SetHeight(inc * 22 - 13)
    TemperItemsCrafting_RecipeHeadline.SetText(STATE.Loc.searchfor)
    TemperItemsCrafting_RecipeInfo.SetText(`${search} (${inc - 1})`)
  }
}

export function recipeLearned(list: number, id: number): undefined {
  const link: string | undefined = GetRecipeResultItemLink(list, id, LINK_STYLE_DEFAULT)
  if (link !== undefined) {
    for (const [, recipe] of pairs(STATE.Cook.recipe)) {
      if (recipe.result === link) {
        recipe.known = true
        break
      }
    }
  }
}
