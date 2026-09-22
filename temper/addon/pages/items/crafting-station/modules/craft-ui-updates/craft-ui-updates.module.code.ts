import * as BlueprintFurnisher from "akasha/temper/addon/pages/items/crafting-station/modules/craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import * as Knowledge from "akasha/temper/addon/pages/items/crafting-station/modules/craft-knowledge/craft-knowledge.module.code.ts"
import * as Options from "akasha/temper/addon/pages/items/crafting-station/modules/craft-options/craft-options.module.code.ts"
import * as PlayerState from "akasha/temper/addon/pages/items/crafting-station/modules/craft-player-state/craft-player-state.module.code.ts"
import * as RecipeCooking from "akasha/temper/addon/pages/items/crafting-station/modules/craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import * as Research from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research/craft-research.module.code.ts"
import { updatePanelIcon } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research-trait-icon/craft-research-trait-icon.module.code.ts"
import * as StyleTracking from "akasha/temper/addon/pages/items/crafting-station/modules/craft-style-tracking/craft-style-tracking.module.code.ts"
import * as Utilities from "akasha/temper/addon/pages/items/crafting-station/modules/craft-utilities/craft-utilities.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import { runeView } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-panel/rune-panel.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enchanting-station/eso-enchanting-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-port/eso-item-browser-port.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

const WM = WINDOW_MANAGER
const SM = SCENE_MANAGER

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

export function updateScreen(): undefined {
  const setPoint = (x: number): string => {
    const [leftRaw, numRaw, rightRaw] = string.match(tostring(x), "^([^%d]*%d)(%d*)(,-)$")
    const left = parseLuaCapture(leftRaw)
    const num = parseLuaCapture(numRaw)
    const right = parseLuaCapture(rightRaw)
    if (left === undefined || num === undefined || right === undefined) {
      return tostring(x)
    }
    const [grouped] = string.gsub(
      string.reverse(num),
      "(%d%d%d)",
      `%1${GetCVar("language.2") === "en" ? "," : "."}`
    )
    return `${left}${string.reverse(grouped)}${right}`
  }
  for (const [craft] of pairs(STATE.Data.crafting.researched[STATE.SelectedPlayer] ?? {})) {
    for (let line = 1; line <= GetNumSmithingResearchLines(craft); line++) {
      for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
        updatePanelIcon(craft, line, trait)
      }
    }
  }
  for (const [, recipe] of pairs(STATE.Cook.recipe)) {
    recipe.known = Knowledge.isItemKnownByLink(STATE.SelectedPlayer, recipe.link)
  }
  for (const [, recipe] of pairs(STATE.Furnisher.recipe)) {
    recipe.known = Knowledge.isItemKnownByLink(STATE.SelectedPlayer, recipe.link)
  }
  Research.updateAllStudies()
  Research.updateResearchWindows()
  StyleTracking.updateStyleKnowledge()
  const [fmax, fused] = GetFenceSellTransactionInfo()
  TemperItemsCrafting_PanelButtonCharacters.SetText(STATE.SelectedPlayer)
  const incomeBase =
    STATE.Character.income[2] ?? error("TemperItemsCrafting: missing login gold baseline")
  TemperItemsCrafting_PanelFenceGoldText.SetText(
    `|cC5C29E${fused}/${fmax} |r  ${setPoint(
      GetCurrentMoney() - incomeBase
    )} |t14:14:esoui/art/currency/currency_gold.dds|t`
  )
}

export function updateIcons(): undefined {
  const icons = [8, 5, 9, 12, 7, 3, 2, 1, 14, 10, 6, 13, 4, 11]
  const styleLib = STATE.Style ?? error("TemperItemsCrafting: style API not initialized")
  for (const [id, data] of ipairs(STATE.styleNames)) {
    const style = GetValidItemStyleId(data.id)
    if (styleLib.checkStyle(style)) {
      let [icon] = styleLib.getHeadline(style)
      for (const [, y] of ipairs(icons)) {
        ;[icon] = styleLib.getIconAndLink(style, y)
        const tex = WM.GetControlByName<TextureControl>(
          `TemperItemsCrafting_StylePanelScrollChild${id}Button${y}Texture`
        )
        tex?.SetTexture(icon)
      }
    }
  }
}

export function initPreviews(): undefined {
  const previews = [
    STATE.Loc.previewType[0],
    STATE.Loc.previewType[1],
    STATE.Loc.previewType[2],
    STATE.Loc.previewType[3],
  ]
  const styleLib = STATE.Style ?? error("TemperItemsCrafting: style API not initialized")
  const combo = TemperItemsCrafting_StylePreviewType
  const dropdown = combo.dropdown

  if (STATE.Character.previewType === undefined || STATE.Character.previewType === false) {
    STATE.Character.previewType = 1
  }

  const previewType = STATE.Character.previewType
  if (typeof previewType !== "number") {
    error("TemperItemsCrafting: preview type not initialized")
  }
  dropdown.SetSelectedItem(
    STATE.Loc.previewType[previewType - 1] ?? error("TemperItemsCrafting: unknown preview type")
  )

  const onItemSelect = (_: unknown, choiceText: string, _choice: ComboBoxItem): undefined => {
    STATE.Character.previewType = STATE.previewType[choiceText]
    styleLib.updatePreview(STATE.previewType[choiceText])
    updateIcons()
  }

  for (const preview of previews) {
    const entry = dropdown.CreateItemEntry(preview, onItemSelect)
    dropdown.AddItem(entry)
  }
}

export function controlCloseAll(preview?: boolean): undefined {
  TemperItemsCrafting_CharacterPanel.SetHidden(true)
  RecipeCooking.closeRecipeWindow()
  TemperItemsCrafting_Style_Window.SetHidden(true)
  TemperItemsCrafting_SetPanel.SetHidden(true)
  if (preview === undefined || preview === false) {
    BlueprintFurnisher.closeBlueprintWindow()
  }
  SM.HideTopLevel(TemperItemsCrafting_Panel)
  runeView(2)
}

export function controlShow(scene: Control): undefined {
  const closed = scene.IsHidden()
  TemperItemsCrafting_CharacterPanel.SetHidden(true)
  RecipeCooking.closeRecipeWindow()
  BlueprintFurnisher.closeBlueprintWindow()
  TemperItemsCrafting_Style_Window.SetHidden(true)
  TemperItemsCrafting_SetPanel.SetHidden(true)
  if (ZO_EnchantingTopLevel.IsHidden()) {
    TemperItemsCrafting_Rune.SetHidden(true)
  }
  if (scene === TemperItemsCrafting_SetPanel) {
    Options.setsSet()
  }
  if (closed) {
    scene.SetHidden(false)
    if (scene.GetType() === CT_TOPLEVELCONTROL) {
      ;(scene as TopLevelWindow).BringWindowToTop()
    }
  }
}

export function showMain(): undefined {
  SM.ToggleTopLevel(TemperItemsCrafting_Panel)
  if (!TemperItemsCrafting_Panel.IsHidden()) {
    Utilities.getQuest()
    let questText = ""
    for (const [, quest] of pairs(STATE.Quest)) {
      if (questText !== "") {
        questText = `${questText}\n\n`
      }
      questText = `${questText}${quest.name}`
      for (const [, step] of pairs(quest.work)) {
        questText = `${questText}\n${step}`
      }
    }
    if (questText !== "") {
      TemperItemsCrafting_PanelQuestButton.data = { info: questText }
    } else {
      TemperItemsCrafting_PanelQuestButton.data = undefined
    }
    if (STATE.Account.mainchar !== false) {
      STATE.SelectedPlayer = STATE.Account.mainchar
    }
    PlayerState.updatePlayer()
    updateScreen()
    const timer12 = STATE.Account.timer[12] ?? error("TemperItemsCrafting: missing 12h alarm timer")
    const timer24 = STATE.Account.timer[24] ?? error("TemperItemsCrafting: missing 24h alarm timer")
    if (timer12 > 0) {
      TemperItemsCrafting_Panel12Hours.SetText(Utilities.getTime(timer12 - GetTimeStamp()))
    } else {
      TemperItemsCrafting_Panel12Hours.SetText("12:00h")
    }
    if (timer24 > 0) {
      TemperItemsCrafting_Panel24Hours.SetText(Utilities.getTime(timer24 - GetTimeStamp()))
    } else {
      TemperItemsCrafting_Panel24Hours.SetText("24:00h")
    }
  }
}
