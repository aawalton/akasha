import { defined } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-defined/craft-defined.module.code.ts"
import type { NameSortable } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-player-state/craft-player-state.module.code.ts"
import * as PlayerState from "akasha/temper/addon/pages/items/crafting-station/modules/craft-player-state/craft-player-state.module.code.ts"
import * as ResearchGrid from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research-grid/craft-research-grid.module.code.ts"
import {
  type CraftedSetEntry,
  SETS,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-sets-data/craft-sets-data.module.code.ts"
import type { CsTooltipOwner } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import * as Tooltips from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import {
  mustControl,
  nilCheckSet,
  toChat,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const allNamed = (
  sets: Record<number, CraftedSetEntry>
): sets is Record<number, CraftedSetEntry & NameSortable> => {
  for (const [, set] of pairs(sets)) {
    if (set.name === undefined) {
      return false
    }
  }
  return true
}

export function optionSetSelect(control: TemperItemsCraftingButton, button: number): undefined {
  const data = control.data
  if (data === undefined) {
    return
  }
  if (button === 2) {
    toChat(defined(data.link))
  } else {
    for (let x = 1; x <= 3; x++) {
      const zoneName = GetZoneNameByIndex(defined(data.zone?.[x]))
      const [nodeKnown, nodeName] = GetFastTravelNodeInfo(defined(data.node?.[x]))
      const nr = defined(data.nr)
      let travel = true
      const zonename = zo_strformat("<<C:1>>", zoneName)
      let nodename: string = STATE.Loc.unknown
      if (defined(SETS[nr]).nodes[x] === -1) {
        nodename = STATE.Loc.TT[16]
      } else if (defined(SETS[nr]).nodes[x] === -2) {
        nodename = STATE.Loc.TT[17]
      } else if (defined(SETS[nr]).nodes[x] === -3) {
        nodename = ""
      }
      let cost = ` (|cFFFF00${GetRecallCost()}|r|t1:0:x.dds|t |t14:14:esoui/art/currency/currency_gold.dds|t)`
      if (nodeKnown) {
        nodename = zo_strformat("<<C:1>>", nodeName)
      } else {
        travel = false
        cost = ""
      }
      mustControl<TemperItemsCraftingControl>(`TemperItemsCrafting_PanelButtonWayshrine${x}`).data =
        {
          set: nr,
          travel: travel,
          info: `${nodename}\n${zonename}${cost}`,
        }
    }
    TemperItemsCrafting_PanelButtonCraftedSets.data = { link: data.link }
    TemperItemsCrafting_PanelButtonCraftedSets.SetText(defined(data.name))
    TemperItemsCrafting_SetPanel.SetHidden(true)
  }
}

export function optionSelect(
  control: TemperItemsCraftingButton,
  condition: boolean | undefined,
  text: string
): boolean
export function optionSelect(
  control: TemperItemsCraftingButton | undefined,
  condition: boolean | undefined,
  text: string
): boolean | undefined
export function optionSelect(
  control: TemperItemsCraftingButton | undefined,
  condition: boolean | undefined,
  text: string
): boolean | undefined {
  if (control === undefined) {
    return
  }
  const newCondition = condition !== true
  let tex = "esoui/art/buttons/checkbox_unchecked.dds"
  if (newCondition) {
    tex = "esoui/art/buttons/checkbox_checked.dds"
  }
  control.SetText(`|t16:16:${tex}|t ${text}`)
  return newCondition
}

export function traitToggle(
  control: TemperItemsCraftingButton,
  char: string,
  text: string
): boolean {
  const crafts = [
    CRAFTING_TYPE_BLACKSMITHING,
    CRAFTING_TYPE_CLOTHIER,
    CRAFTING_TYPE_WOODWORKING,
    CRAFTING_TYPE_JEWELRYCRAFTING,
  ]
  const value = optionSelect(control, defined(STATE.Account).trait.tracking[char], text)
  for (const [, craft] of ipairs(crafts)) {
    const numLines = GetNumSmithingResearchLines(craft)
    for (let line = 1; line <= numLines; line++) {
      const maxTraits = STATE.MaxTraits
      for (let trait = 1; trait <= maxTraits; trait++) {
        nilCheckSet(STATE.Account.crafting.studies, value, char, craft, line, trait)
      }
      if (STATE.SelectedPlayer === char) {
        ResearchGrid.updateStudyLine(
          mustControl<TemperItemsCraftingControl>(
            `TemperItemsCrafting_PanelCraft${craft}`
          ).GetChild<TemperItemsCraftingControl>(line),
          value
        )
      }
    }
  }
  return value
}

export function optionSet(): undefined {
  const account = defined(STATE.Account)
  TemperItemsCrafting_ButtonFrame.SetHidden(!account.options.showbutton)
  TemperItemsCrafting_ButtonFrameButtonBG.SetMovable(!account.options.lockbutton)
  TemperItemsCrafting_ButtonFrameButtonBG.SetMouseEnabled(!account.options.lockbutton)

  TemperItemsCrafting_Quest.SetMovable(!account.options.lockelements)
  TemperItemsCrafting_Quest.SetMouseEnabled(!account.options.lockelements)

  TemperItemsCrafting_Panel.SetMovable(!account.options.lockelements)
  TemperItemsCrafting_Panel.SetMouseEnabled(!account.options.lockelements)

  TemperItemsCrafting_Blueprint_Window.SetMovable(!account.options.lockelements)
  TemperItemsCrafting_Blueprint_Window.SetMouseEnabled(!account.options.lockelements)

  TemperItemsCrafting_Cook.SetMovable(!account.options.lockelements)
  TemperItemsCrafting_Cook.SetMouseEnabled(!account.options.lockelements)

  TemperItemsCrafting_Recipe_Window.SetMovable(!account.options.lockelements)
  TemperItemsCrafting_Recipe_Window.SetMouseEnabled(!account.options.lockelements)

  TemperItemsCrafting_Rune.SetMovable(!account.options.lockelements)
  TemperItemsCrafting_Rune.SetMouseEnabled(!account.options.lockelements)

  TemperItemsCrafting_Style_Window.SetMovable(!account.options.lockelements)
  TemperItemsCrafting_Style_Window.SetMouseEnabled(!account.options.lockelements)
}

export function setsSet(): undefined {
  const account = defined(STATE.Account)
  const character = defined(STATE.Character)
  const rawPreviewType = character.previewType
  const invalidPreview =
    typeof rawPreviewType !== "number" || rawPreviewType < 1 || rawPreviewType > 4
  if (invalidPreview) {
    character.previewType = 1
  }
  const previewType = invalidPreview ? 1 : rawPreviewType
  for (const [, set] of pairs(SETS)) {
    const link = `|H1:item:${set.item[previewType]}:370:50:0:370:50:0:0:0:0:0:0:0:0:0:${GetHighestItemStyleId()}:0:0:0:10000:0|h|h`
    const [, setName] = GetItemLinkSetInfo(link, false)
    set.name = setName
  }
  if (!allNamed(SETS)) {
    error("TemperItemsCrafting: crafted-set names missing after preview refresh")
  }
  if (account.options.sortsets === 1) {
    table.sort(SETS as never, PlayerState.asort)
  } else if (account.options.sortsets === 2) {
    table.sort(SETS as never, PlayerState.traitsort)
  }
  for (const [x, set] of pairs(SETS)) {
    let btn = WINDOW_MANAGER.GetControlByName<TemperItemsCraftingButton>(
      `TemperItemsCrafting_SetPanelScrollChildButton${x}`
    )
    if (btn === undefined) {
      btn = WINDOW_MANAGER.CreateControl(
        `TemperItemsCrafting_SetPanelScrollChildButton${x}`,
        TemperItemsCrafting_SetPanelScrollChild,
        CT_BUTTON
      )
      btn.SetAnchor(3, undefined, 3, 8, 5 + (x - 1) * 22)
      btn.SetDimensions(280, 22)
      btn.SetFont("TemperItemsCraftingFont")
      btn.SetClickSound("Click")
      btn.EnableMouseButton(2, true)
      btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
      btn.SetMouseOverFontColor(1, 0.66, 0.2, 1)
      btn.SetHorizontalAlignment(0)
      btn.SetVerticalAlignment(1)
      btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
        Tooltips.tooltip(self, true, false, TemperItemsCrafting_SetPanel, "tl")
      )
      btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.tooltip(self, false))
      btn.SetHandler("OnMouseDown", (self: TemperItemsCraftingButton, button: number) =>
        optionSetSelect(self, button)
      )
    }
    const link = `|H1:item:${set.item[previewType]}:370:50:0:370:50:0:0:0:0:0:0:0:0:0:${GetHighestItemStyleId()}:0:0:0:10000:0|h|h`
    const [, rawSetName] = GetItemLinkSetInfo(link, false)
    const setName = zo_strformat("[<<1>>] <<C:2>>", set.traits, rawSetName)
    btn.SetText(setName)
    btn.data = {
      link: link,
      nr: x,
      zone: set.zone,
      node: set.nodes,
      name: setName,
      buttons: [STATE.Loc.TT[4], STATE.Loc.TT[5]],
    }
  }
}
