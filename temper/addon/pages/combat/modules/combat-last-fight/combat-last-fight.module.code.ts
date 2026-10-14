import type {
  CmxFight,
  CoreLogLine,
} from "akasha/temper/addon/pages/combat/modules/combat-core-types/combat-core-types.module.code.ts"
import {
  LIBCOMBAT_EVENT_HEAL_SELF,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
  LIBCOMBAT_SKILLSTATUS_BEGIN_CHANNEL,
  LIBCOMBAT_SKILLSTATUS_BEGIN_DURATION,
  LIBCOMBAT_SKILLSTATUS_INSTANT,
} from "akasha/temper/addon/pages/combat/modules/combat-lib-constants/combat-lib-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-saved-variables-declarations/combat-saved-variables-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-16/eso-enums-16.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

export interface LastFightAbility {
  abilityId: number
  name: string
  healing: number
  overheal: number
  hits: number
  casts: number
}

export interface LastFight {
  character: string
  capturedAt: number
  activeSeconds: number
  combatSeconds: number
  absorbed: number
  abilities: LastFightAbility[]
}

function abilityOf(byId: Record<number, LastFightAbility>, abilityId: number): LastFightAbility {
  const held = byId[abilityId]
  if (held !== undefined) return held
  const made: LastFightAbility = {
    abilityId,
    name: GetAbilityName(abilityId),
    healing: 0,
    overheal: 0,
    hits: 0,
    casts: 0,
  }
  byId[abilityId] = made
  return made
}

function isCastStart(status: number): boolean {
  return (
    status === LIBCOMBAT_SKILLSTATUS_INSTANT ||
    status === LIBCOMBAT_SKILLSTATUS_BEGIN_DURATION ||
    status === LIBCOMBAT_SKILLSTATUS_BEGIN_CHANNEL
  )
}

export function summarizeLastFight(fight: CmxFight, log: readonly CoreLogLine[]): LastFight {
  const byId: Record<number, LastFightAbility> = {}
  let absorbed = 0

  for (const line of log) {
    const kind = line[0]
    if (kind === LIBCOMBAT_EVENT_HEAL_SELF) {
      const result = line[2]
      const abilityId = line[5]
      const hitValue = line[6]
      const overflow = line[8]
      if (typeof abilityId !== "number" || typeof hitValue !== "number") continue
      if (result === ACTION_RESULT_DAMAGE_SHIELDED) {
        absorbed = absorbed + hitValue
        continue
      }
      const ability = abilityOf(byId, abilityId)
      ability.healing = ability.healing + hitValue
      ability.overheal = ability.overheal + (typeof overflow === "number" ? overflow : 0)
      ability.hits = ability.hits + 1
    } else if (kind === LIBCOMBAT_EVENT_SKILL_TIMINGS) {
      const abilityId = line[3]
      const status = line[4]
      if (typeof abilityId !== "number" || typeof status !== "number") continue
      if (!isCastStart(status)) continue
      const ability = abilityOf(byId, abilityId)
      ability.casts = ability.casts + 1
    }
  }

  const abilities: LastFightAbility[] = []
  for (const [, ability] of pairs(byId)) {
    abilities.push(ability)
  }

  return {
    character: fight.char,
    capturedAt: GetTimeStamp(),
    activeSeconds: fight.activetime ?? 0,
    combatSeconds: fight.combattime,
    absorbed,
    abilities,
  }
}

export function recordLastFight(fight: CmxFight): undefined {
  globalThis.TemperCombat_LastFight = summarizeLastFight(fight, fight.log)
  return undefined
}
