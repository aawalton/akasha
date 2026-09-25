import { defined } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-defined/craft-defined.module.code.ts"
import * as PlayerState from "akasha/temper/addon/pages/items/crafting-station/modules/craft-player-state/craft-player-state.module.code.ts"
import {
  type CsQualityColor,
  QUALITY,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-quality/craft-quality.module.code.ts"
import * as Tooltips from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import {
  CHAT,
  hideControl,
  toChat,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import {
  colorOf,
  fontPathOf,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const WM = WINDOW_MANAGER

const BLUEPRINT_LIMIT = 500

const ROW_HEIGHT = 22

const LIST_INSET = spaceOf("1")

function listHeight(rows: number): number {
  return rows * ROW_HEIGHT + LIST_INSET * 2
}

export interface CsBlueprintButtonData {
  link: string
  rec: number
  id: number
  buttons: [string, string]
}

export interface CsBlueprintButton extends ButtonControl {
  data?: CsBlueprintButtonData
}

function asBlueprintButton(c: ButtonControl): CsBlueprintButton {
  return c as CsBlueprintButton
}

export function closeBlueprintWindow(): undefined {
  TemperItemsCrafting_Blueprint_Window.SetHidden(true)
  const numChildren = TemperItemsCrafting_BlueprintPanelScrollChild.GetNumChildren()
  for (let x = 1; x <= numChildren; x++) {
    hideControl(`TemperItemsCrafting_BlueprintPanelScrollChildButton${x}`)
  }
}

export function getBlueprintChild(id: number): CsBlueprintButton {
  let btn = WM.GetControlByName<CsBlueprintButton>(
    `TemperItemsCrafting_BlueprintPanelScrollChildButton${id}`
  )
  if (btn === undefined) {
    const created = asBlueprintButton(
      WM.CreateControl(
        `TemperItemsCrafting_BlueprintPanelScrollChildButton${id}`,
        TemperItemsCrafting_BlueprintPanelScrollChild,
        CT_BUTTON
      )
    )
    created.SetAnchor(3, undefined, 3, spaceOf("2"), LIST_INSET + (id - 1) * ROW_HEIGHT)
    created.SetDimensions(508, ROW_HEIGHT)
    created.SetFont(fontPathOf("body"))
    created.SetHidden(true)
    created.EnableMouseButton(1, false)
    created.EnableMouseButton(2, true)
    created.EnableMouseButton(3, true)
    created.SetClickSound("Click")
    const [red, green, blue] = colorOf("body")
    created.SetMouseOverFontColor(red, green, blue, 1)
    created.SetHorizontalAlignment(0)
    created.SetVerticalAlignment(1)
    created.SetHandler("OnMouseEnter", () => {
      Tooltips.tooltip(created, true, false, TemperItemsCrafting_Blueprint, "tl")
    })
    created.SetHandler("OnMouseExit", () => {
      Tooltips.tooltip(created, false)
    })
    created.SetHandler("OnMouseDown", (_self: unknown, button: number) => {
      blueprintMark(created, button)
    })
    btn = created
  } else {
    const [hasAnchor] = btn.GetAnchor(0)
    if (hasAnchor === false) {
      btn.SetAnchor(3, undefined, 3, spaceOf("2"), LIST_INSET + (id - 1) * ROW_HEIGHT)
    }
  }
  return btn
}

export function blueprintMark(control: CsBlueprintButton, button: number): undefined {
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
    const tracked = account.furnisher.ingredients[data.id] ?? false
    let mark: string
    if (tracked === true) {
      mark = ""
      account.furnisher.ingredients[data.id] = undefined
    } else {
      mark = "|t22:22:esoui/art/inventory/newitem_icon.dds|t "
      account.furnisher.ingredients[data.id] = true
    }
    const recipe = defined(STATE.Furnisher.recipe[data.rec])
    control.SetText(`${mark}(${recipe.level}) ${recipe.name}`)
    zo_callLater(PlayerState.updateIngredientTracking, 500)
  }
}

export function blueprintShow(id: number, inc: number): number {
  const account = STATE.Account
  if (account === undefined) {
    return inc
  }
  const recipe = defined(STATE.Furnisher.recipe[id])
  let mark: string
  if (account.furnisher.ingredients[recipe.id] === true) {
    mark = "|t22:22:esoui/art/inventory/newitem_icon.dds|t "
  } else {
    mark = ""
  }
  let color: CsQualityColor
  if (recipe.known === true) {
    color = defined(QUALITY[recipe.quality])
  } else {
    color = { 1: 1, 2: 0, 3: 0, 4: 1 }
  }
  const control = getBlueprintChild(inc)
  control.SetNormalFontColor(color[1], color[2], color[3], color[4])
  control.SetText(`${mark}(${recipe.level}) ${recipe.name}`)
  control.SetHidden(false)
  control.data = {
    link: recipe.link,
    rec: id,
    id: recipe.id,
    buttons: [STATE.Loc.TT[5], STATE.Loc.TT[6]],
  }
  return inc + 1
}

export function blueprintShowCategory(list?: number): undefined {
  const character = STATE.Character
  if (character === undefined) {
    return
  }
  let listIndex = list
  if (listIndex === undefined || listIndex > 7) {
    listIndex = 1
  }
  let inc = 1
  let known = 0
  let total = 0
  const numChildren = TemperItemsCrafting_BlueprintPanelScrollChild.GetNumChildren()
  for (let x = 1; x <= numChildren; x++) {
    hideControl(`TemperItemsCrafting_BlueprintPanelScrollChildButton${x}`)
  }
  for (const [id, recipe] of pairs(STATE.Furnisher.recipe)) {
    if (recipe.stat === listIndex) {
      if (recipe.known === true) {
        known = known + 1
      }
      total = total + 1
      if (
        (character.hideKnownBlueprints !== true && recipe.known === true) ||
        (character.hideUnknownBlueprints !== true && recipe.known !== true)
      ) {
        inc = blueprintShow(id, inc)
      }
    }
  }
  TemperItemsCrafting_BlueprintPanelScrollChild.SetHeight(listHeight(inc - 1))
  TemperItemsCrafting_BlueprintHeadline.SetText(
    zo_strformat("<<C:1>>", GetString("SI_RECIPECRAFTINGSYSTEM", listIndex))
  )
  if (character.hideKnownBlueprints === true && character.hideUnknownBlueprints === true) {
    TemperItemsCrafting_BlueprintInfo.SetText(`(0 / ${total})`)
  } else if (character.hideKnownBlueprints !== true) {
    TemperItemsCrafting_BlueprintInfo.SetText(`(${known} / ${total})`)
  } else if (character.hideUnknownBlueprints !== true) {
    TemperItemsCrafting_BlueprintInfo.SetText(`(${total - known} / ${total})`)
  }
  character.furniture = listIndex
}

export function blueprintSearch(): undefined {
  const character = STATE.Character
  if (character === undefined) {
    return
  }
  const search = TemperItemsCrafting_BlueprintSearch.GetText()
  let inc = 1
  if (search !== "") {
    const numChildren = TemperItemsCrafting_BlueprintPanelScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      const control = getBlueprintChild(x)
      control.SetHidden(true)
      control.data = undefined
    }
    if (character.hideKnownBlueprints !== true || character.hideUnknownBlueprints !== true) {
      for (const [id, food] of pairs(STATE.Furnisher.recipe)) {
        const [found] = string.find(string.lower(food.name), string.lower(search))
        if (found !== undefined) {
          if (
            (character.hideKnownBlueprints !== true && character.hideUnknownBlueprints !== true) ||
            (character.hideUnknownBlueprints === true && food.known === true) ||
            (character.hideKnownBlueprints === true && food.known !== true)
          ) {
            if (inc > BLUEPRINT_LIMIT) {
              CHAT.Print(STATE.Loc.blueprintSearchLimit)
              break
            } else {
              inc = blueprintShow(id, inc)
            }
          }
        }
      }
    }
    TemperItemsCrafting_BlueprintPanelScrollChild.SetHeight(listHeight(inc - 1))
    TemperItemsCrafting_BlueprintHeadline.SetText(STATE.Loc.searchfor)
    TemperItemsCrafting_BlueprintInfo.SetText(`${search} (${inc - 1})`)
  }
}

export function blueprintLearned(list: number, id: number): undefined {
  const link: string | undefined = GetRecipeResultItemLink(list, id, LINK_STYLE_DEFAULT)
  if (link !== undefined) {
    for (const [, recipe] of pairs(STATE.Furnisher.recipe)) {
      if (recipe.result === link) {
        recipe.known = true
        break
      }
    }
  }
}
