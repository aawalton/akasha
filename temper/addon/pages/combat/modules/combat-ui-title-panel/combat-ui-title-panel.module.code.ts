import {
  LOG_LEVEL_DEBUG,
  log,
} from "akasha/temper/addon/pages/combat/modules/combat-core-log/combat-core-log.module.code.ts"
import {
  GetNumFights,
  getFights,
} from "akasha/temper/addon/pages/combat/modules/combat-saved-fights/combat-saved-fights.module.code.ts"
import { LAST_FIGHTS } from "akasha/temper/addon/pages/combat/modules/combat-selection/combat-selection.module.code.ts"
import {
  searchtable,
  type TooltipCarrier,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-helpers/combat-ui-helpers.module.code.ts"
import {
  getCurrentFight,
  getFightData,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-state/combat-ui-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface TitleCharData {
  name?: string
  raceId?: number
  gender?: number
  classId?: number
  level?: number
  CPtotal?: number
  SkillLines?: Record<number, number>
  passiveSkills?: number[]
}

type TitleIconControl = TextureControl & TooltipCarrier

const LAST_CLASS_MASTERY_ICON = 3

function iconAt(this: void, classIconBar: Control, index: number): TitleIconControl | undefined {
  return classIconBar.GetNamedChild<TitleIconControl>(`ClassIcon${index}`)
}

function showIcon(
  this: void,
  iconControl: TitleIconControl | undefined,
  texture: string,
  tooltip: string
): undefined {
  if (iconControl == null) {
    return undefined
  }
  iconControl.SetTexture(texture)
  iconControl.tooltip = tooltip
  iconControl.SetHidden(false)
  return undefined
}

function updateSkillLineIcons(
  this: void,
  classIconBar: Control,
  charData: TitleCharData
): undefined {
  const classIcon4 = iconAt(classIconBar, 4)
  let isSubClassing = false

  for (let i = 2; i <= 4; i++) {
    const iconControl = iconAt(classIconBar, i)
    iconControl?.SetHidden(true)
    if (iconControl != null) {
      iconControl.tooltip = undefined
    }
  }

  const skillLines = charData.SkillLines
  if (skillLines == null) {
    return undefined
  }

  for (let i = 1; ; i++) {
    const skillLineId = skillLines[i]
    if (skillLineId == null) {
      break
    }
    const lineData = SKILLS_DATA_MANAGER.GetSkillLineDataById(skillLineId)
    if (lineData != null) {
      const texture = lineData.GetSkillDataByIndex(3).GetProgressionData(0).icon
      showIcon(iconAt(classIconBar, i + 1), texture, lineData.GetFormattedName())

      if (lineData.classId !== charData.classId) {
        isSubClassing = true
      }
    }
  }

  let nextIcon = 2
  const progressionMap = SKILLS_DATA_MANAGER.abilityIdToProgressionDataMap

  if (isSubClassing && progressionMap != null) {
    classIcon4?.SetHidden(false)
    return undefined
  }

  classIcon4?.SetHidden(true)
  iconAt(classIconBar, 2)?.SetHidden(true)
  iconAt(classIconBar, 3)?.SetHidden(true)
  for (const [, abilityId] of ipairs(charData.passiveSkills ?? [])) {
    const progressionData = progressionMap?.[abilityId]
    const lineId = progressionData?.skillData?.skillLineData?.id
    const lineData = lineId != null ? SKILLS_DATA_MANAGER.GetSkillLineDataById(lineId) : undefined
    if (progressionData != null && lineData?.isClassMastery === true) {
      showIcon(
        iconAt(classIconBar, nextIcon),
        progressionData.icon,
        progressionData.GetDetailedName()
      )
      if (nextIcon === LAST_CLASS_MASTERY_ICON) {
        break
      }
      nextIcon = nextIcon + 1
    }
  }
  return undefined
}

interface NavButtonControl extends ButtonControl {
  func?: string
}

const RACE_TEXTURES: string[] = [
  "esoui/art/icons/heraldrycrests_race_breton_01.dds",
  "esoui/art/icons/heraldrycrests_race_redguard_01.dds",
  "esoui/art/icons/heraldrycrests_race_orc_01.dds",
  "esoui/art/icons/heraldrycrests_race_dunmer_01.dds",
  "esoui/art/icons/heraldrycrests_race_nord_01.dds",
  "esoui/art/icons/heraldrycrests_race_argonian_01.dds",
  "esoui/art/icons/heraldrycrests_race_altmer_01.dds",
  "esoui/art/icons/heraldrycrests_race_bosmer_01.dds",
  "esoui/art/icons/heraldrycrests_race_khajiit_01.dds",
  "esoui/art/icons/heraldrycrests_race_imperial_01.dds",
]

function stripFightLabel(this: void, fightlabel: string | undefined): string {
  return zo_strgsub(fightlabel ?? "", ".+%:%d%d %- ([A-Z])", "%1")
}

export function updateTitlePanel(this: void, panel: Control): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating TitlePanel")

  const charInfo = panel.GetNamedChild("CharacterInfo")
  if (charInfo == null) {
    return undefined
  }

  const fightData = getFightData()
  let charData: TitleCharData
  let fightlabel: string

  if (fightData == null) {
    charData = {
      name: GetUnitName("player"),
      raceId: GetUnitRaceId("player"),
      gender: GetUnitGender("player"),
      classId: GetUnitClassId("player"),
      level: GetUnitLevel("player"),
      CPtotal: GetUnitChampionPoints("player"),
    }

    fightlabel = "Combat Metrics"
  } else if (
    (fightData.charData == null || fightData.charData.classId == null) &&
    fightData.char === GetUnitName("player")
  ) {
    charData = {
      name: fightData.char,
      raceId: GetUnitRaceId("player"),
      gender: GetUnitGender("player"),
      classId: GetUnitClassId("player"),
      level: 0,
      CPtotal: 0,
    }

    const legacyBackfill: { charData?: TitleCharData } = fightData
    legacyBackfill.charData = charData
    fightlabel = stripFightLabel(fightData.fightlabel)
  } else {
    charData = fightData.charData ?? {}
    charData.name = charData.name ?? fightData.char
    fightlabel = stripFightLabel(fightData.fightlabel)
  }

  const raceIcon = charInfo.GetNamedChild<TextureControl & TooltipCarrier>("RaceIcon")
  const raceId = charData.raceId
  const gender = charData.gender

  if (raceIcon != null) {
    raceIcon.SetHidden(raceId == null)
    raceIcon.SetTexture(raceId != null ? (RACE_TEXTURES[raceId - 1] ?? "") : "")

    raceIcon.tooltip = raceId != null && gender != null ? GetRaceName(gender, raceId) : ""
  }

  const classIconBar = charInfo.GetNamedChild("ClassIcons")
  const classIcon = classIconBar?.GetNamedChild<TitleIconControl>("ClassIcon")
  const classId = charData.classId

  if (classIcon != null) {
    for (let i = 1; i <= GetNumClasses(); i++) {
      const [id, , , , , , texture] = GetClassInfo(i)

      if (id === classId && gender != null) {
        const className = GetClassName(gender, id)

        classIcon.SetTexture(texture)
        classIcon.tooltip = [className]
        classIcon.SetHidden(false)

        break
      }

      classIcon.SetHidden(true)
    }
  }

  if (classIconBar != null) {
    updateSkillLineIcons(classIconBar, charData)
  }

  const charName = charInfo.GetNamedChild<LabelControl>("Charname")
  charName?.SetText(charData.name ?? "")

  const fightTitle = panel.GetNamedChild("FightTitle")?.GetNamedChild<LabelControl>("Name")
  fightTitle?.SetText(fightlabel)

  const navButtons = panel.GetNamedChild("NavigationRow")
  if (navButtons == null) {
    return undefined
  }

  const fightId = getCurrentFight() ?? 0
  const currentFightExists = LAST_FIGHTS[fightId - 1] != null

  let saveState = false
  if (currentFightExists && fightData != null) {
    const [alreadySaved] = searchtable(getFights() ?? {}, "date", fightData.date)
    saveState = !alreadySaved
  }

  const buttonStates: Record<string, boolean> = {
    previous: LAST_FIGHTS[fightId - 2] != null,
    next: LAST_FIGHTS[fightId] != null,
    last: LAST_FIGHTS[fightId] != null,
    load: GetNumFights() > 0,
    save: saveState,
    delete: currentFightExists,
  }

  for (let i = 1; i <= navButtons.GetNumChildren(); i++) {
    const child = navButtons.GetChild<NavButtonControl>(i)
    if (child == null) {
      continue
    }

    const state = child.func != null ? (buttonStates[child.func] ?? false) : false

    child.SetState(state ? BSTATE_NORMAL : BSTATE_DISABLED, !state)
  }
  return undefined
}
