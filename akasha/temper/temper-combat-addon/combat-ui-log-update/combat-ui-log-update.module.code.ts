import { getCombatLogString } from "@akasha/temper-combat-addon/combat-core-events"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import {
  getFormattedAbilityName,
  LIBCOMBAT_EVENT_BOSSHP,
  LIBCOMBAT_EVENT_DAMAGE_IN,
  LIBCOMBAT_EVENT_DAMAGE_OUT,
  LIBCOMBAT_EVENT_DAMAGE_SELF,
  LIBCOMBAT_EVENT_DEATH,
  LIBCOMBAT_EVENT_EFFECTS_IN,
  LIBCOMBAT_EVENT_EFFECTS_OUT,
  LIBCOMBAT_EVENT_GROUPEFFECTS_IN,
  LIBCOMBAT_EVENT_GROUPEFFECTS_OUT,
  LIBCOMBAT_EVENT_HEAL_IN,
  LIBCOMBAT_EVENT_HEAL_OUT,
  LIBCOMBAT_EVENT_HEAL_SELF,
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_EVENT_PERFORMANCE,
  LIBCOMBAT_EVENT_PLAYERSTATS,
  LIBCOMBAT_EVENT_RESOURCES,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { isLogLine } from "@akasha/temper-combat-addon/combat-lib-log-lines"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import type { TooltipCarrier } from "@akasha/temper-combat-addon/combat-ui-helpers"
import type {
  CLButtonControl,
  CombatLogWindowControl,
} from "@akasha/temper-combat-addon/combat-ui-log-window"
import {
  getCurrentCLPage,
  getFightData,
  getFontsize,
  getSelections,
} from "@akasha/temper-combat-addon/combat-ui-state"

export interface CLPageButtonRowControl extends Control {
  Update?: (this: void, buttonrow: Control, page: number, maxpage: number) => undefined
}

export function updateCLPageButtons(
  this: void,
  buttonrow: Control,
  page: number,
  maxpage: number
): undefined {
  const first = zo_max(page - 2, 1)
  const last = first + 4

  buttonrow.GetNamedChild("PageLeft")?.SetHidden(page === 1)
  buttonrow.GetNamedChild("PageRight")?.SetHidden(page >= maxpage)

  for (let i = first; i <= last; i++) {
    const key = `Page${i - first + 1}`

    const button = buttonrow.GetNamedChild<CLButtonControl & TooltipCarrier>(key)
    if (button == null) {
      continue
    }

    button.tooltip = [zo_strformat(SI_TEMPER_COMBAT_PAGE, i)]
    button.value = i

    button.SetHidden(i > maxpage)
    buttonrow.GetNamedChild<LabelControl>(`${key}Label`)?.SetText(tostring(i))

    const bg = buttonrow.GetNamedChild<BackdropControl>(`${key}Overlay`)

    bg?.SetCenterColor(0, 0, 0, page === i ? 0 : 0.8)
    bg?.SetEdgeColor(1, 1, 1, page === i ? 1 : 0.4)
  }
  return undefined
}

const LOG_TYPE_CATEGORIES: Record<number, string> = {
  [LIBCOMBAT_EVENT_DAMAGE_OUT]: "damageOut",
  [LIBCOMBAT_EVENT_DAMAGE_IN]: "damageIn",
  [LIBCOMBAT_EVENT_DAMAGE_SELF]: "damageSelf",
  [LIBCOMBAT_EVENT_HEAL_OUT]: "healingOut",
  [LIBCOMBAT_EVENT_HEAL_IN]: "healingIn",
  [LIBCOMBAT_EVENT_HEAL_SELF]: "healSelf",
  [LIBCOMBAT_EVENT_EFFECTS_IN]: "buff",
  [LIBCOMBAT_EVENT_EFFECTS_OUT]: "buff",
  [LIBCOMBAT_EVENT_GROUPEFFECTS_IN]: "buff",
  [LIBCOMBAT_EVENT_GROUPEFFECTS_OUT]: "buff",
  [LIBCOMBAT_EVENT_PLAYERSTATS]: "stats",
  [LIBCOMBAT_EVENT_RESOURCES]: "resource",
  [LIBCOMBAT_EVENT_MESSAGES]: "message",
}

export function updateCombatLog(this: void, panel: Control): undefined {
  const fightData = getFightData()
  if (fightData == null || panel.IsHidden()) {
    return undefined
  }

  log("UI", LOG_LEVEL_DEBUG, "Updating CombatLog")

  const db = getDb()
  const clSelection = db.FightReport.CLSelection

  const window = panel.GetNamedChild<CombatLogWindowControl>("Window")
  const copyPasteBox = panel.GetNamedChild<EditControl & Control>("CopyPasteBox")
  const buffer = window?.GetNamedChild<TextBufferControl & Control>("Buffer")
  const slider = window?.GetNamedChild<SliderControl & Control>("Slider")
  if (window == null || copyPasteBox == null || buffer == null || slider == null) {
    return undefined
  }

  const logdata = fightData.log ?? []
  const loglength = logdata.length

  const isCopyPasteMode = buffer.IsHidden()
  const lastLine = buffer.GetNumHistoryLines() - buffer.GetScrollPosition()
  const firstLine = lastLine - buffer.GetNumVisibleLines()
  const copyPasteText: string[] = []

  buffer.Clear()
  if (loglength === 0) {
    return undefined
  }

  buffer.SetMaxHistoryLines(zo_min(loglength, 1000))
  buffer.SetFont(
    string.format(
      "%s|%s|%s",
      GetString(SI_TEMPER_COMBAT_STD_FONT),
      (tonumber(GetString(SI_TEMPER_COMBAT_FONT_SIZE)) ?? 0) * db.FightReport.scale,
      ""
    )
  )

  let maxpage = zo_ceil(loglength / 1000)
  const currentPage = getCurrentCLPage() ?? 1
  const page = currentPage <= maxpage ? currentPage : 1

  let writtenlines = 0

  const selections = getSelections()
  const unitSelection = selections.unit
  const abilitySelection = selections.ability
  const buffSelection = selections.buff["buff"]
  const resourceSelection = selections.resource["resource"]

  const unitSelectionAll: Record<string | number, unknown> = {}

  let unitsSelected = false

  for (const [, category] of ipairs(["healingIn", "healingOut", "damageIn", "damageOut"])) {
    const subcategory = unitSelection[category]

    if (subcategory != null) {
      for (const [unitId, value] of pairs(subcategory)) {
        unitSelectionAll[unitId] = value
        unitsSelected = true
      }
    }
  }

  for (const [, logline] of ipairs(logdata)) {
    if (!isLogLine(logline)) {
      continue
    }
    let condition2 = false
    const logtype = logline[0]

    const condition1 =
      clSelection[logtype] === true ||
      (logtype === LIBCOMBAT_EVENT_DAMAGE_SELF &&
        (clSelection[LIBCOMBAT_EVENT_DAMAGE_IN] === true ||
          clSelection[LIBCOMBAT_EVENT_DAMAGE_OUT] === true)) ||
      (logtype === LIBCOMBAT_EVENT_HEAL_SELF &&
        (clSelection[LIBCOMBAT_EVENT_HEAL_IN] === true ||
          clSelection[LIBCOMBAT_EVENT_HEAL_OUT] === true)) ||
      (logtype === LIBCOMBAT_EVENT_BOSSHP && clSelection[LIBCOMBAT_EVENT_MESSAGES] === true) ||
      (logtype === LIBCOMBAT_EVENT_DEATH && clSelection[LIBCOMBAT_EVENT_MESSAGES] === true)

    if (condition1) {
      const category = LOG_TYPE_CATEGORIES[logtype] ?? ""
      const unitSelCat = unitSelection[category]

      if (
        logtype === LIBCOMBAT_EVENT_DAMAGE_IN ||
        logtype === LIBCOMBAT_EVENT_DAMAGE_OUT ||
        logtype === LIBCOMBAT_EVENT_HEAL_IN ||
        logtype === LIBCOMBAT_EVENT_HEAL_OUT
      ) {
        const sourceUnitId = logline[3]
        const targetUnitId = logline[4]
        const abilityId = logline[5]

        condition2 =
          (unitSelCat == null ||
            (unitSelCat[targetUnitId] != null &&
              (logtype === LIBCOMBAT_EVENT_HEAL_OUT || logtype === LIBCOMBAT_EVENT_DAMAGE_OUT)) ||
            (unitSelCat[sourceUnitId] != null &&
              (logtype === LIBCOMBAT_EVENT_HEAL_IN || logtype === LIBCOMBAT_EVENT_DAMAGE_IN))) &&
          (abilitySelection[category] == null || abilitySelection[category]?.[abilityId] != null)
      } else if (logtype === LIBCOMBAT_EVENT_HEAL_SELF) {
        const sourceUnitId = logline[3]
        const targetUnitId = logline[4]
        const abilityId = logline[5]

        condition2 =
          ((unitSelection["healingIn"] == null && clSelection[LIBCOMBAT_EVENT_HEAL_IN] === true) ||
            unitSelection["healingIn"]?.[sourceUnitId] != null ||
            (unitSelection["healingOut"] == null &&
              clSelection[LIBCOMBAT_EVENT_HEAL_OUT] === true) ||
            unitSelection["healingOut"]?.[targetUnitId] != null) &&
          ((abilitySelection["healingIn"] == null &&
            clSelection[LIBCOMBAT_EVENT_HEAL_IN] === true) ||
            abilitySelection["healingIn"]?.[abilityId] != null ||
            (abilitySelection["healingOut"] == null &&
              clSelection[LIBCOMBAT_EVENT_HEAL_OUT] === true) ||
            abilitySelection["healingOut"]?.[abilityId] != null)
      } else if (
        logtype === LIBCOMBAT_EVENT_EFFECTS_IN ||
        logtype === LIBCOMBAT_EVENT_EFFECTS_OUT ||
        logtype === LIBCOMBAT_EVENT_GROUPEFFECTS_IN ||
        logtype === LIBCOMBAT_EVENT_GROUPEFFECTS_OUT
      ) {
        const unitId = logline[2]
        const abilityId = logline[3]

        const ability = getFormattedAbilityName(abilityId)

        condition2 =
          (buffSelection == null && unitsSelected === false) ||
          (buffSelection != null && buffSelection[ability] != null && unitsSelected === false) ||
          (buffSelection == null && unitId != null && unitSelectionAll[unitId] != null) ||
          (buffSelection != null &&
            buffSelection[ability] != null &&
            unitsSelected === true &&
            unitId != null &&
            unitSelectionAll[unitId] != null)
      } else if (logtype === LIBCOMBAT_EVENT_RESOURCES) {
        const abilityId = logline[2]
        const powerType = logline[4]

        condition2 =
          powerType !== COMBAT_MECHANIC_FLAGS_HEALTH &&
          (resourceSelection == null || resourceSelection[abilityId ?? 0] != null)
      } else if (
        logtype === LIBCOMBAT_EVENT_PLAYERSTATS ||
        logtype === LIBCOMBAT_EVENT_MESSAGES ||
        logtype === LIBCOMBAT_EVENT_SKILL_TIMINGS ||
        logtype === LIBCOMBAT_EVENT_BOSSHP ||
        logtype === LIBCOMBAT_EVENT_DEATH ||
        logtype === LIBCOMBAT_EVENT_PERFORMANCE
      ) {
        condition2 = true
      }

      if (condition2) {
        writtenlines = writtenlines + 1
        if (isCopyPasteMode) {
          if (
            writtenlines >= (page - 1) * 1000 + firstLine &&
            writtenlines <= (page - 1) * 1000 + lastLine
          ) {
            const [text] = getCombatLogString(fightData, logline, getFontsize())
            if (text != null) {
              let stripped = text
              ;[stripped] = string.gsub(stripped, "|c......", "")
              ;[stripped] = string.gsub(stripped, "|r", "")
              ;[stripped] = string.gsub(stripped, "|t.-|t ", "")
              copyPasteText[copyPasteText.length] = stripped
            }
          }
        } else {
          if (writtenlines > (page - 1) * 1000 && writtenlines <= page * 1000) {
            const [text, color] = getCombatLogString(fightData, logline, getFontsize())
            window.AddColoredText?.(window, text, color)
          }
        }
      }
    }
  }

  maxpage = zo_max(zo_ceil(writtenlines / 1000), 1)
  const buttonrow = GetControl<CLPageButtonRowControl>(panel, "HeaderPageButtonRow")

  buttonrow?.Update?.(buttonrow, page, maxpage)
  const totalLines = buffer.GetNumHistoryLines()

  buffer.SetScrollPosition(
    zo_min(
      buffer.GetScrollPosition() + totalLines,
      zo_floor(buffer.GetNumHistoryLines() - buffer.GetNumVisibleLines())
    )
  )
  slider.SetValue(slider.GetValue() - totalLines)

  if (isCopyPasteMode) {
    const text = table.concat(copyPasteText, "\n")
    copyPasteBox.SetText(text)
    copyPasteBox.SelectAll()
    copyPasteBox.TakeFocus()
  }
  return undefined
}
