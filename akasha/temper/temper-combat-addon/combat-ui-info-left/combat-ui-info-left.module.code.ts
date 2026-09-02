import { ADDON_VERSION } from "@akasha/temper-combat-addon/combat-constants"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import {
  getFormattedAbilityIcon,
  getFormattedAbilityName,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { GetNumFights } from "@akasha/temper-combat-addon/combat-saved-fights"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import {
  updateBottomInfoPanel,
  updateMiscInfoPanel,
} from "@akasha/temper-combat-addon/combat-ui-info-bottom"
import { updateRightInfoPanel } from "@akasha/temper-combat-addon/combat-ui-info-right"
import { numberValue } from "@akasha/temper-combat-addon/combat-ui-main-panel"
import { getFightData } from "@akasha/temper-combat-addon/combat-ui-state"
import type { SkillRowControl } from "@akasha/temper-combat-addon/combat-ui-tooltips"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

const LIB_COMBAT_VERSION = 88

const SKILL_BAR_ITEMS = [
  "LightAttack",
  "HeavyAttack",
  "Ability1",
  "Ability2",
  "Ability3",
  "Ability4",
  "Ability5",
  "Ultimate",
]

export const DisabledColor = ZO_ColorDef.New("FF999999")
export const WerewolfColor = ZO_ColorDef.New("FFf3c86e")
export const WhiteColor = ZO_ColorDef.New("FFFFFFFF")

function legacyNumber(this: void, record: unknown, key: string): number | undefined {
  if (!isObjectRecord(record)) {
    return undefined
  }
  const value = record[key]
  return typeof value === "number" ? value : undefined
}

export function updateLeftInfoPanel(this: void, panel: Control): undefined {
  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const charData = fightData.charData

  if (charData == null) {
    return undefined
  }

  const skillBars = charData.skillBars

  const data = fightData.calculated

  if (data == null) {
    return undefined
  }

  const skilldata = data.skills
  const barStatData = data.barStats

  const db = getDb()
  const category = db.FightReport.category

  for (let subPanelIndex = 1; subPanelIndex <= 2; subPanelIndex++) {
    const subPanel = panel.GetNamedChild(`AbilityBlock${subPanelIndex}`)
    if (subPanel == null) {
      continue
    }

    let dataIndex = subPanelIndex

    if (subPanelIndex === 2) {
      const hasWerewolfData = skillBars?.[HOTBAR_CATEGORY_WEREWOLF + 1] != null

      const titleControl = subPanel.GetNamedChild<LabelControl>("Title")
      const werewolfButton = subPanel.GetNamedChild("Werewolf")

      werewolfButton?.SetHidden(!hasWerewolfData)

      let titleString: string | undefined
      let titleColor = WhiteColor

      if (hasWerewolfData) {
        let color = DisabledColor

        if (db.FightReport.showWereWolf) {
          color = WerewolfColor
          dataIndex = HOTBAR_CATEGORY_WEREWOLF + 1
          titleString = GetString(SI_HOTBARCATEGORY8)
          titleColor = WerewolfColor
        }

        const [r, g, b] = color.UnpackRGB()
        werewolfButton?.GetNamedChild<TextureControl>("Texture")?.SetColor(r, g, b)
        werewolfButton?.GetNamedChild<BackdropControl>("Bg")?.SetEdgeColor(r, g, b)
      }

      titleControl?.SetText(titleString ?? zo_strformat("<<1>> 2", GetString(SI_TEMPER_COMBAT_BAR)))
      const [titleR, titleG, titleB] = titleColor.UnpackRGB()
      titleControl?.SetColor(titleR, titleG, titleB)
    }

    const bardata = skillBars?.[dataIndex]
    const barStats = barStatData?.[dataIndex]

    let dpsratio: number | undefined
    let timeratio: number | undefined

    if (barStats != null && typeof barStats[category] === "number") {
      dpsratio = (barStats[category] ?? 0) / numberValue(data[`${category}Total`])

      const totalTime =
        (category === "healingIn" || category === "healingOut" ? fightData.hpstime : undefined) ??
        fightData.dpstime ??
        1

      timeratio = (barStats.totalTime ?? 0) / totalTime
    }
    subPanel
      .GetNamedChild<LabelControl>("Value1")
      ?.SetText(string.format("%.1f%%", (timeratio ?? 0) * 100))
    subPanel
      .GetNamedChild<LabelControl>("Value2")
      ?.SetText(string.format("%.1f%%", (dpsratio ?? 0) * 100))

    for (const [line, controlName] of ipairs(SKILL_BAR_ITEMS)) {
      const control = subPanel.GetNamedChild<SkillRowControl>(controlName)
      if (control == null) {
        continue
      }
      const abilityId = bardata?.[line]

      control.id = abilityId

      const icon = GetControl<TextureControl & Control>(control, "IconTexture")
      const texture =
        abilityId != null && abilityId > 0
          ? getFormattedAbilityIcon(abilityId)
          : "EsoUI/Art/crafting/gamepad/crafting_alchemy_trait_unknown.dds"
      icon?.SetTexture(texture)

      const name = control.GetNamedChild<LabelControl>("Label")
      const abilityName =
        abilityId != null && abilityId > 0 ? getFormattedAbilityName(abilityId) : ""
      name?.SetText(abilityName)

      const reducedslot = (dataIndex - 1) * 10 + line
      const slotdata = skilldata?.[reducedslot]
      const strings: [string, string, string, string] = ["-", "-", "-", "-"]
      let color = WhiteColor

      if (slotdata?.count != null && slotdata.count > 0) {
        strings[0] = string.format("%d", slotdata.count)

        const weave = slotdata.weavingTimeAvg ?? legacyNumber(slotdata, "skillNextAvg")
        strings[1] = weave != null ? string.format("%.2f", weave / 1000) : "-"

        const errors = slotdata.weavingErrors
        strings[2] = weave != null && errors != null ? string.format("%d", errors) : "-"

        const diff = slotdata.diffTimeAvg ?? legacyNumber(slotdata, "difftimesAvg")
        strings[3] = diff != null ? string.format("%.2f", diff / 1000) : "-"

        control.delay = slotdata.delayAvg
        if (slotdata.ignored === true) {
          color = DisabledColor
        }
        control.ignored = slotdata.ignored
      }

      const [rowR, rowG, rowB] = color.UnpackRGB()
      name?.SetColor(rowR, rowG, rowB)

      for (let k = 1; k <= 4; k++) {
        const label = control.GetNamedChild<LabelControl>(`Value${k}`)

        label?.SetText(strings[k - 1] ?? "-")
        label?.SetColor(rowR, rowG, rowB)
      }
    }
  }

  updateWeavingStatRows(panel, data)
  return undefined
}

function updateWeavingStatRows(
  this: void,
  panel: Control,
  data: Record<string, unknown>
): undefined {
  const statrow = panel.GetNamedChild("AbilityBlock1")?.GetNamedChild("Stats2")
  const statrow2 = panel.GetNamedChild("AbilityBlock2")?.GetNamedChild("Stats2")
  if (statrow == null || statrow2 == null) {
    return undefined
  }

  const totalWeavingTimeCount =
    legacyNumber(data, "totalWeavingTimeCount") ?? legacyNumber(data, "totalSkills")
  const totalWeavingTimeSum =
    legacyNumber(data, "totalWeavingTimeSum") ?? legacyNumber(data, "totalSkillTime")
  const totalWeaponAttacks = legacyNumber(data, "totalWeaponAttacks")
  const totalSkillsFired = legacyNumber(data, "totalSkillsFired")

  let value1string = " -"
  let value2string = " -"

  if (totalWeavingTimeCount != null && totalWeavingTimeCount > 0 && totalWeavingTimeSum != null) {
    value1string = string.format("%.3f s", totalWeavingTimeSum / (1000 * totalWeavingTimeCount))
    value2string = string.format("%.3f s", totalWeavingTimeSum / 1000)
  }

  const value3string = totalWeaponAttacks != null ? tostring(totalWeaponAttacks) : " -"
  const value4string = totalSkillsFired != null ? tostring(totalSkillsFired) : " -"

  statrow
    .GetNamedChild<LabelControl>("Label")
    ?.SetText(string.format("%s  %s", GetString(SI_TEMPER_COMBAT_SKILLTIME_WEAVING), value1string))
  statrow
    .GetNamedChild<LabelControl>("Label2")
    ?.SetText(string.format("%s  %s", GetString(SI_TEMPER_COMBAT_TOTALC), value2string))
  statrow2
    .GetNamedChild<LabelControl>("Label")
    ?.SetText(string.format("%s  %s", GetString(SI_TEMPER_COMBAT_TOTALWA), value3string))
  statrow2
    .GetNamedChild<LabelControl>("Label2")
    ?.SetText(string.format("%s  %s", GetString(SI_TEMPER_COMBAT_TOTALSKILLS), value4string))
  return undefined
}

export function skillbarButtonMouseOver(this: void, control: Control, isOver: boolean): undefined {
  const bg = control.GetNamedChild<BackdropControl>("Bg")

  const alpha = isOver ? 1 : 0

  bg?.SetCenterColor(0.2, 0.2, 0.2, alpha)
  return undefined
}

export function skillbarToggleWerewolf(this: void, control: Control): undefined {
  const db = getDb()
  db.FightReport.showWereWolf = !db.FightReport.showWereWolf

  const panel = control.GetParent()?.GetParent()
  if (panel != null) {
    updateLeftInfoPanel(panel)
  }
  return undefined
}

export function updateInfoPanel(this: void, panel: Control): undefined {
  if (panel.IsHidden()) {
    return undefined
  }

  const left = panel.GetNamedChild("Left")
  const right = panel.GetNamedChild("Right")
  const bottom = panel.GetNamedChild("Bottom")
  const misc = panel.GetNamedChild("Misc")

  if (left != null) {
    updateLeftInfoPanel(left)
  }
  if (right != null) {
    updateRightInfoPanel(right)
  }
  if (bottom != null) {
    updateBottomInfoPanel(bottom)
  }
  if (misc != null) {
    updateMiscInfoPanel(misc)
  }
  return undefined
}

export function updateInfoRowPanel(this: void, panel: Control): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating InfoRow")

  const datetimecontrol = panel.GetNamedChild<LabelControl>("DateTime")
  const versioncontrol = panel.GetNamedChild<LabelControl>("ESOVersion")
  const barcontrol = panel.GetNamedChild<Control & StatusBarControl>("Bar")
  const performancecontrol = panel.GetNamedChild<LabelControl>("Performance")

  const fightData = getFightData()

  const data = fightData ?? {
    date: GetTimeStamp(),
    time: GetTimeString(),
    ESOversion: GetESOVersionString(),
    account: GetDisplayName(),
  }

  const date = data.date
  const account = data.account

  const accountstring = account != null ? string.format("%s, ", account) : ""

  const datestring = (typeof date === "number" ? GetDateStringFromTimestamp(date) : date) ?? ""
  const timestring = string.format("%s%s, %s", accountstring, datestring, data.time ?? "")
  const versionstring = string.format(
    "%s / CMX %s / LC %s",
    data.ESOversion ?? "<= 3.2",
    ADDON_VERSION,
    tostring(LIB_COMBAT_VERSION)
  )

  datetimecontrol?.SetText(timestring)
  versioncontrol?.SetText(versionstring)

  const hideBar =
    fightData != null && (panel.GetParent()?.GetNamedChild("_FightList")?.IsHidden() ?? false)

  barcontrol?.SetHidden(hideBar)

  if (!hideBar) {
    performancecontrol?.SetHidden(true)

    const db = getDb()
    const numSaved = GetNumFights()
    const usedSpace = numSaved / db.maxSavedFights
    barcontrol?.SetValue(usedSpace)

    const barlabelcontrol = barcontrol?.GetNamedChild<LabelControl>("Label")
    barlabelcontrol?.SetText(
      string.format(
        "%s: %d / %d",
        GetString(SI_TEMPER_COMBAT_SAVED_FIGHTS),
        GetNumFights(),
        db.maxSavedFights
      )
    )
  } else {
    const calculated = fightData?.calculated
    const performance = calculated?.performance
    const count = performance?.count ?? 0

    if (count > 0 && performance != null) {
      performancecontrol?.SetHidden(false)

      const fpsString = string.format(
        "FPS: %d  |cAAAAAA(%d - %d)|r ",
        performance.avgAvg ?? 0,
        performance.minAvg ?? 0,
        performance.maxAvg ?? 0
      )
      const pingString = string.format("Ping: %d ms", performance.avgPing ?? 0)

      const delayString =
        calculated?.delayAvg != null ? string.format(" - Desync: %d ms", calculated.delayAvg) : ""

      const fullString = string.format("%s - %s%s", fpsString, pingString, delayString)

      performancecontrol?.SetText(fullString)
    }
  }
  return undefined
}

TemperCombat.SkillbarButtonMouseOver = skillbarButtonMouseOver
TemperCombat.SkillbarToggleWerewolf = skillbarToggleWerewolf
