import * as BlueprintFurnisher from "../craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import * as Knowledge from "../craft-knowledge/craft-knowledge.module.code.ts"
import * as Options from "../craft-options/craft-options.module.code.ts"
import * as PlayerState from "../craft-player-state/craft-player-state.module.code.ts"
import * as RecipeCooking from "../craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import * as Research from "../craft-research/craft-research.module.code.ts"
import * as ResearchGrid from "../craft-research-grid/craft-research-grid.module.code.ts"
import * as StyleTracking from "../craft-style-tracking/craft-style-tracking.module.code.ts"
import * as Utilities from "../craft-utilities/craft-utilities.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"
import { runeView } from "../rune-panel/rune-panel.module.code.ts"

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
        ResearchGrid.updatePanelIcon(craft, line, trait)
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
  TemperCrafting_PanelButtonCharacters.SetText(STATE.SelectedPlayer)
  const incomeBase =
    STATE.Character.income[2] ?? error("TemperCrafting: missing login gold baseline")
  TemperCrafting_PanelFenceGoldText.SetText(
    `|cC5C29E${fused}/${fmax} |r  ${setPoint(
      GetCurrentMoney() - incomeBase
    )} |t14:14:esoui/art/currency/currency_gold.dds|t`
  )
}

export function updateIcons(): undefined {
  const icons = [8, 5, 9, 12, 7, 3, 2, 1, 14, 10, 6, 13, 4, 11]
  const styleLib = STATE.Style ?? error("TemperCrafting: style API not initialized")
  for (const [id, data] of ipairs(STATE.styleNames)) {
    const style = GetValidItemStyleId(data.id)
    if (styleLib.checkStyle(style)) {
      let [icon] = styleLib.getHeadline(style)
      for (const [, y] of ipairs(icons)) {
        ;[icon] = styleLib.getIconAndLink(style, y)
        const tex = WM.GetControlByName<TextureControl>(
          `TemperCrafting_StylePanelScrollChild${id}Button${y}Texture`
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
  const styleLib = STATE.Style ?? error("TemperCrafting: style API not initialized")
  const combo = TemperCrafting_StylePreviewType
  const dropdown = combo.dropdown

  if (STATE.Character.previewType === undefined || STATE.Character.previewType === false) {
    STATE.Character.previewType = 1
  }

  const previewType = STATE.Character.previewType
  if (typeof previewType !== "number") {
    error("TemperCrafting: preview type not initialized")
  }
  dropdown.SetSelectedItem(
    STATE.Loc.previewType[previewType - 1] ?? error("TemperCrafting: unknown preview type")
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
  TemperCrafting_CharacterPanel.SetHidden(true)
  RecipeCooking.closeRecipeWindow()
  TemperCrafting_Style_Window.SetHidden(true)
  TemperCrafting_SetPanel.SetHidden(true)
  if (preview === undefined || preview === false) {
    BlueprintFurnisher.closeBlueprintWindow()
  }
  SM.HideTopLevel(TemperCrafting_Panel)
  runeView(2)
}

export function controlShow(scene: Control): undefined {
  const closed = scene.IsHidden()
  TemperCrafting_CharacterPanel.SetHidden(true)
  RecipeCooking.closeRecipeWindow()
  BlueprintFurnisher.closeBlueprintWindow()
  TemperCrafting_Style_Window.SetHidden(true)
  TemperCrafting_SetPanel.SetHidden(true)
  if (ZO_EnchantingTopLevel.IsHidden()) {
    TemperCrafting_Rune.SetHidden(true)
  }
  if (scene === TemperCrafting_SetPanel) {
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
  SM.ToggleTopLevel(TemperCrafting_Panel)
  if (!TemperCrafting_Panel.IsHidden()) {
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
      TemperCrafting_PanelQuestButton.data = { info: questText }
    } else {
      TemperCrafting_PanelQuestButton.data = undefined
    }
    if (STATE.Account.mainchar !== false) {
      STATE.SelectedPlayer = STATE.Account.mainchar
    }
    PlayerState.updatePlayer()
    updateScreen()
    const timer12 = STATE.Account.timer[12] ?? error("TemperCrafting: missing 12h alarm timer")
    const timer24 = STATE.Account.timer[24] ?? error("TemperCrafting: missing 24h alarm timer")
    if (timer12 > 0) {
      TemperCrafting_Panel12Hours.SetText(Utilities.getTime(timer12 - GetTimeStamp()))
    } else {
      TemperCrafting_Panel12Hours.SetText("12:00h")
    }
    if (timer24 > 0) {
      TemperCrafting_Panel24Hours.SetText(Utilities.getTime(timer24 - GetTimeStamp()))
    } else {
      TemperCrafting_Panel24Hours.SetText("24:00h")
    }
  }
}
