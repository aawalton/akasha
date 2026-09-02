import { asNumberOpt, asPresent, asTyped } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asHiddenProbeCtrl,
  asNumStrOpt,
  asSetLangNamesOpt,
  asVariadicThunk,
} from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import { langToUse } from "../lib-sets-tip-header/lib-sets-tip-header.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

const lib = LibSets

const libPrefix = lib.prefix
const doesClientLangEqualFallbackLang = lib.clientLang === lib.fallbackLang
const fallbackLang = lib.fallbackLang

let slashCommandsCreated = false

function hideGamepadTooltip(this: void, tooltipType?: number): undefined {
  const resolvedType = tooltipType ?? GAMEPAD_LEFT_TOOLTIP
  GAMEPAD_TOOLTIPS.ClearTooltip.call(GAMEPAD_TOOLTIPS, resolvedType, true)
}

function showGamepadTooltipWithItemLink(
  this: void,
  tooltipType: number | undefined,
  itemLink: string
): undefined {
  const resolvedType = tooltipType ?? GAMEPAD_LEFT_TOOLTIP
  const tooltipContainer = GAMEPAD_TOOLTIPS.GetTooltipInfo.call(GAMEPAD_TOOLTIPS, resolvedType)
    .control.container
  if (!tooltipContainer) {
    d("[LibSets]tooltip container for " + tostring(resolvedType) + " is missing!")
  }
  GAMEPAD_TOOLTIPS.LayoutItem.call(GAMEPAD_TOOLTIPS, resolvedType, itemLink, false, undefined, true)
}

function createPreviewTooltipAndShow(this: void, setId: number | undefined): string | undefined {
  const useGamepadTooltip = IsConsoleUI() || IsInGamepadPreferredMode() || false

  const popupCtrl = asHiddenProbeCtrl(PopupTooltip)
  if (!useGamepadTooltip && PopupTooltip && !popupCtrl.IsControlHidden()) {
    ZO_PopupTooltip_Hide()
  } else if (useGamepadTooltip) {
    hideGamepadTooltip(undefined)
  }
  if (setId === undefined || setId <= 0) {
    return undefined
  }

  const sv = asPresent(STATE.setPreviewTooltipSV)
  const equipType = asNumberOpt(sv["equipType"])
  const traitType = asNumberOpt(sv["traitType"])
  const enchantSearchCategoryType = asNumStrOpt(sv["enchantSearchCategoryType"])
  const quality = asNumberOpt(sv["quality"])

  let setItemIdOfPreferedCriteria = lib.GetSetItemId(
    setId,
    undefined,
    equipType,
    traitType,
    enchantSearchCategoryType
  )
  if (setItemIdOfPreferedCriteria === undefined || setItemIdOfPreferedCriteria <= 0) {
    setItemIdOfPreferedCriteria = lib.GetSetItemId(setId, undefined, equipType)
    if (setItemIdOfPreferedCriteria === undefined || setItemIdOfPreferedCriteria <= 0) {
      setItemIdOfPreferedCriteria = lib.GetSetItemId(setId)
    }
  }
  if (setItemIdOfPreferedCriteria === undefined || setItemIdOfPreferedCriteria <= 0) {
    return undefined
  }

  const itemLink = lib.buildItemLink(setItemIdOfPreferedCriteria, quality)
  if (itemLink === undefined || itemLink === "") {
    return undefined
  }
  d(libPrefix + "SetId '" + tostring(setId) + "': " + itemLink)
  if (!useGamepadTooltip) {
    ZO_PopupTooltip_SetLink(itemLink)
  } else {
    showGamepadTooltipWithItemLink(undefined, itemLink)
  }
  return itemLink
}
lib.CreatePreviewTooltipAndShow = asVariadicThunk(createPreviewTooltipAndShow)

function previewSetTooltipBySlashCommand(this: void, args: string | undefined): undefined {
  if (lib.libSlashCommander !== undefined) {
    return
  }
  if (args === undefined || args === "") {
    return
  }

  const options: string[] = []
  for (const [param] of string.gmatch(args, "([^%s]+)%s*")) {
    if (param !== undefined && param !== "") {
      options[options.length] = string.lower(param)
    }
  }

  const options1Number = tonumber(options[0])
  let setId: number | undefined
  if (options1Number !== undefined && type(options1Number) === "number") {
    setId = options1Number
  } else {
    let setName = args
    if (setName === undefined || setName === "") {
      return
    }
    setName = string.lower(setName)
    const setNameToSearch = string.gsub(setName, "%s+", "·")[0]

    STATE.allSetNamesCached = STATE.allSetNamesCached ?? asSetLangNamesOpt(lib.GetAllSetNames())

    for (const [setIdOfSearchedData, setNameOfEachLanguage] of pairs(
      asPresent(STATE.allSetNamesCached)
    )) {
      const setNameInlangToUse = string.lower(asPresent(setNameOfEachLanguage[langToUse]))
      let setNameNoSpaces = string.gsub(setNameInlangToUse, "%s+", "·")[0]
      if (setNameNoSpaces === "") {
        setNameNoSpaces = setNameInlangToUse
      }
      const [setNameInlangMatchStart] = string.find(setNameInlangToUse, setNameToSearch, 1, true)
      if (
        setNameInlangToUse !== undefined &&
        setNameInlangToUse !== "" &&
        setNameNoSpaces !== "" &&
        (setNameInlangToUse === setNameToSearch || setNameInlangMatchStart !== undefined)
      ) {
        setId = setIdOfSearchedData
        break
      } else {
        if (!doesClientLangEqualFallbackLang) {
          const setNameInFallbackLang = string.lower(asPresent(setNameOfEachLanguage[fallbackLang]))
          setNameNoSpaces = ""
          setNameNoSpaces = string.gsub(setNameInFallbackLang, "%s+", "·")[0]
          if (setNameNoSpaces === "") {
            setNameNoSpaces = setNameInFallbackLang
          }
          const [setNameInFallbackMatchStart] = string.find(
            setNameInFallbackLang,
            setNameToSearch,
            1,
            true
          )
          if (
            setNameInFallbackLang !== undefined &&
            setNameInFallbackLang !== "" &&
            setNameNoSpaces !== "" &&
            (setNameInFallbackLang === setNameToSearch || setNameInFallbackMatchStart !== undefined)
          ) {
            setId = setIdOfSearchedData
            break
          }
        }
      }
    }
  }
  if (setId === undefined) {
    return
  }

  const itemLink = createPreviewTooltipAndShow(setId)
  if (itemLink !== undefined && asPresent(STATE.setPreviewTooltipSV)["sendToChatToo"] === true) {
    lib.SafeStartChatInput(itemLink)
  }
}

function createSetTooltipPreviewSlashCommand(this: void): undefined {
  if (lib.libSlashCommander === undefined && !slashCommandsCreated) {
    SLASH_COMMANDS["/libsetspreview"] = previewSetTooltipBySlashCommand
    SLASH_COMMANDS["/setpreview"] = previewSetTooltipBySlashCommand
    SLASH_COMMANDS["/setsp"] = previewSetTooltipBySlashCommand
    SLASH_COMMANDS["/lsp"] = previewSetTooltipBySlashCommand
    slashCommandsCreated = true
  }
}

asTyped<{ [slot: string]: unknown }>(lib)["_createSetTooltipPreviewSlashCommand"] =
  createSetTooltipPreviewSlashCommand
