import type {
  CmxFight,
  CoreLogLine,
} from "akasha/temper/addon/pages/combat/modules/combat-core-types/combat-core-types.module.code.ts"
import type { LastFight } from "akasha/temper/addon/pages/combat/modules/combat-last-fight/combat-last-fight.module.code.ts"
import { LIBCOMBAT_EVENT_PERFORMANCE } from "akasha/temper/addon/pages/combat/modules/combat-lib-constants/combat-lib-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-saved-variables-declarations/combat-saved-variables-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"

export interface FightCaptureUnit {
  unitId: number
  name: string
  unitType: number
  isFriendly: boolean
  bossId: number | undefined
}

export interface FightCapture extends LastFight {
  zone: string
  subzone: string
  stage: number | undefined
  cycle: number | undefined
  arc: number | undefined
  damageIn: number
  damageInShielded: number
  damageOut: number
  healingIn: number
  healingOut: number
  units: FightCaptureUnit[]
  logCharacters: number
  log: string[]
}

const LOG_STRING_CEILING = 1900

const LOG_CHARACTER_CEILING = 4000000

const FIGHT_CEILING = 400

const LINE_FIELD_CEILING = 12

function fieldText(value: number | string | undefined): string {
  if (value === undefined) return ""
  if (typeof value !== "string") return tostring(value)
  let [text] = string.gsub(value, "%%", "%%25")
  ;[text] = string.gsub(text, ":", "%%3A")
  ;[text] = string.gsub(text, ";", "%%3B")
  return text
}

function lineText(line: CoreLogLine, combatstart: number): string {
  const fields: string[] = []
  let kept = 0
  for (let at = 0; at < LINE_FIELD_CEILING; at++) {
    const value = line[at]
    const text = fieldText(at === 1 && typeof value === "number" ? value - combatstart : value)
    fields.push(text)
    if (text !== "") kept = at + 1
  }
  return fields.slice(0, kept).join(":")
}

function logStrings(fight: CmxFight): string[] {
  const strings: string[] = []
  let held: string[] = []
  let heldLength = 0
  for (const line of fight.log) {
    if (line[0] === LIBCOMBAT_EVENT_PERFORMANCE) continue
    const text = lineText(line, fight.combatstart)
    if (heldLength > 0 && heldLength + 1 + text.length > LOG_STRING_CEILING) {
      strings.push(held.join(";"))
      held = []
      heldLength = 0
    }
    heldLength = heldLength === 0 ? text.length : heldLength + 1 + text.length
    held.push(text)
  }
  if (held.length > 0) strings.push(held.join(";"))
  return strings
}

function unitsOf(fight: CmxFight): FightCaptureUnit[] {
  const units: FightCaptureUnit[] = []
  for (const [unitId, unit] of pairs(fight.units)) {
    units.push({
      unitId,
      name: unit.name,
      unitType: unit.unitType,
      isFriendly: unit.isFriendly,
      bossId: unit.bossId,
    })
  }
  return units
}

function archiveCounter(counterType: number): number | undefined {
  if (!IsInstanceEndlessDungeon()) return undefined
  return GetEndlessDungeonCounterValue(counterType)
}

function fightCaptures(): FightCapture[] {
  const held = globalThis.TemperCombat_FightCaptures
  if (held !== undefined) return held
  const made: FightCapture[] = []
  globalThis.TemperCombat_FightCaptures = made
  return made
}

function keepUnderCeilings(captures: FightCapture[]): undefined {
  let total = 0
  for (const capture of captures) total = total + capture.logCharacters
  while (
    captures.length > 1 &&
    (total > LOG_CHARACTER_CEILING || captures.length > FIGHT_CEILING)
  ) {
    const oldest = captures.shift()
    if (oldest === undefined) return undefined
    total = total - oldest.logCharacters
  }
  return undefined
}

export function captureFight(fight: CmxFight, summary: LastFight): undefined {
  const log = logStrings(fight)
  let logCharacters = 0
  for (const one of log) logCharacters = logCharacters + one.length
  const captures = fightCaptures()
  captures.push({
    ...summary,
    zone: fight.zone ?? "",
    subzone: fight.subzone ?? "",
    stage: archiveCounter(ENDLESS_DUNGEON_COUNTER_TYPE_STAGE),
    cycle: archiveCounter(ENDLESS_DUNGEON_COUNTER_TYPE_CYCLE),
    arc: archiveCounter(ENDLESS_DUNGEON_COUNTER_TYPE_ARC),
    damageIn: fight.damageInTotal,
    damageInShielded: fight.damageInShielded,
    damageOut: fight.damageOutTotal,
    healingIn: fight.healingInTotal,
    healingOut: fight.healingOutTotal,
    units: unitsOf(fight),
    logCharacters,
    log,
  })
  return keepUnderCeilings(captures)
}
