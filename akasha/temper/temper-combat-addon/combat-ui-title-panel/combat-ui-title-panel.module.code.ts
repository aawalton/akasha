import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import { GetNumFights, getFights } from "@akasha/temper-combat-addon/combat-saved-fights"
import { LAST_FIGHTS } from "@akasha/temper-combat-addon/combat-selection"
import { searchtable, type TooltipCarrier } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { getCurrentFight, getFightData } from "@akasha/temper-combat-addon/combat-ui-state"

interface TitleCharData {
  name?: string
  raceId?: number
  gender?: number
  classId?: number
  level?: number
  CPtotal?: number
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

  const classIcon = charInfo.GetNamedChild<TextureControl & TooltipCarrier>("ClassIcon")
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

  const charName = charInfo.GetNamedChild<LabelControl>("Charname")
  charName?.SetText(charData.name ?? "")

  const cpIcon = charInfo.GetNamedChild("CPIcon")
  const cpValue = charInfo.GetNamedChild<LabelControl>("CPValue")

  const level = charData.level
  const cp = charData.CPtotal

  if (level == null || level === 0) {
    cpIcon?.SetHidden(true)
    cpValue?.SetHidden(true)
  } else if (level < 50) {
    cpIcon?.SetHidden(true)
    cpValue?.SetHidden(false)
    cpValue?.SetText(tostring(level))
  } else {
    cpIcon?.SetHidden(false)
    cpValue?.SetHidden(false)
    cpValue?.SetText(tostring(cp ?? 0))
  }

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
