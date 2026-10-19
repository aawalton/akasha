import { getReadingForCharacter } from "akasha/temper/addon/pages/characters/modules/characters-config/characters-config.module.code.ts"
import "akasha/temper/eso/type/eso-addon-list/eso-addon-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-fonts/eso-fonts.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const GAME_DIVIDER_TYPE = 2

const GAME_HEADER_TYPE = 3

const READING_TYPE = 101

const ENTRY_TEMPLATE = "ZO_AdvancedStatsEntry"

const ENTRY_HEIGHT = 24

const HEADER = "Per Second"

interface ReadingRow {
  readonly displayName: string
  readonly description: string
  readonly value: number
}

interface ReadingEntryControl extends Control {
  nameLabel: LabelControl
  valueLabel: LabelControl
  iconTexture: Control
  statData?: ReadingRow
}

type SectionData = ReadingRow | { readonly name: string } | Record<string, never>

const TOUGHNESS =
  "The hit that would kill you, the mean over each second of a 60 second fight: Max Health, shields up and healing landing, over the share of damage that lands."

const DAMAGE =
  "Damage dealt to one enemy each second over a 60 second fight: your skills, weapon enchant, and light and heavy attacks, with critical strikes averaged in."

const HEALING = "Healing landed and damage shields given each second over a 60 second fight."

let typed = false

let installed = false

const GROUP = 1000

function grouped(value: number): string {
  const whole = Math.round(value)
  if (whole < GROUP) return `${whole}`
  const rest = whole % GROUP
  return `${grouped(Math.floor(whole / GROUP))},${`${rest}`.padStart(3, "0")}`
}

function setupReading(this: void, control: ReadingEntryControl, data: ReadingRow): undefined {
  control.nameLabel.SetText(data.displayName)
  control.valueLabel.SetText(grouped(data.value))
  control.iconTexture.SetHidden(true)
  control.statData = data
}

function sectionRows(): readonly ZoScrollListDataEntry<SectionData>[] | undefined {
  const reading = getReadingForCharacter(GetCurrentCharacterId())
  if (reading === undefined) return undefined
  const rows: ReadingRow[] = [
    { displayName: "Toughness", description: TOUGHNESS, value: reading.toughness },
    { displayName: "Damage", description: DAMAGE, value: reading.damage },
    { displayName: "Healing", description: HEALING, value: reading.healing },
  ]
  return [
    ZO_ScrollList_CreateDataEntry<SectionData>(GAME_HEADER_TYPE, { name: HEADER }),
    ...rows.map((row) => ZO_ScrollList_CreateDataEntry<SectionData>(READING_TYPE, row)),
    ZO_ScrollList_CreateDataEntry<SectionData>(GAME_DIVIDER_TYPE, {}),
  ]
}

function placeSection(this: void): undefined {
  const stats = ZO_ADVANCED_STATS_WINDOW
  if (stats === undefined) return
  if (!typed) {
    ZO_ScrollList_AddDataType<ReadingRow, ReadingEntryControl>(
      stats.list,
      READING_TYPE,
      ENTRY_TEMPLATE,
      ENTRY_HEIGHT,
      setupReading
    )
    typed = true
  }
  const rows = sectionRows()
  const list = ZO_ScrollList_GetDataList<SectionData>(stats.list)
  if (rows === undefined || list === undefined) return
  list.splice(0, 0, ...rows)
  ZO_ScrollList_Commit(stats.list)
}

function install(this: void): undefined {
  const stats = ZO_ADVANCED_STATS_WINDOW
  if (installed || stats === undefined) return
  installed = true
  placeSection()
  SecurePostHook(stats, "SetupAdvancedStats", placeSection)
}

export function installAdvancedStatsReadings(): undefined {
  install()
  STATS_SCENE.RegisterCallback("StateChange", (_oldState, newState) => {
    if (newState === SCENE_SHOWING) install()
  })
}
