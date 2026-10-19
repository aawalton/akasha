import { ADDON_NAME } from "akasha/temper/addon/pages/combat/modules/combat-constants/combat-constants.module.code.ts"
import type {
  CmxFight,
  CoreLogLine,
} from "akasha/temper/addon/pages/combat/modules/combat-core-types/combat-core-types.module.code.ts"
import {
  type FightTick,
  fightTicks,
} from "akasha/temper/addon/pages/combat/modules/combat-fight-ticks/combat-fight-ticks.module.code.ts"
import {
  LIBCOMBAT_EVENT_HEAL_SELF,
  LIBCOMBAT_EVENT_RESOURCES,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
  LIBCOMBAT_SKILLSTATUS_BEGIN_CHANNEL,
  LIBCOMBAT_SKILLSTATUS_BEGIN_DURATION,
  LIBCOMBAT_SKILLSTATUS_INSTANT,
  LIBCOMBAT_SKILLSTATUS_REGISTERED,
} from "akasha/temper/addon/pages/combat/modules/combat-lib-constants/combat-lib-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-saved-variables-declarations/combat-saved-variables-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
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
  presses: number
}

export interface LastFight {
  character: string
  capturedAt: number
  activeSeconds: number
  combatSeconds: number
  absorbed: number
  shielded: number
  magicka: LastFightResource
  stamina: LastFightResource
  ultimate: LastFightResource
  abilities: LastFightAbility[]
  ticks: FightTick[]
}

export interface LastFightResource {
  gained: number
  spent: number
}

type ShieldGrant = [timems: number, amount: number]

let shieldGrants: ShieldGrant[] = []

function grantShield(amount: number): undefined {
  if (amount > 0) shieldGrants.push([GetGameTimeMilliseconds(), amount])
  return undefined
}

function onShieldAdded(
  this: void,
  _eventCode: number,
  _unitTag: string,
  unitAttributeVisual: number,
  _statType: number,
  _attributeType: number,
  _powerType: number,
  value: number
): undefined {
  if (unitAttributeVisual !== ATTRIBUTE_VISUAL_POWER_SHIELDING) return undefined
  return grantShield(value)
}

function onShieldUpdated(
  this: void,
  _eventCode: number,
  _unitTag: string,
  unitAttributeVisual: number,
  _statType: number,
  _attributeType: number,
  _powerType: number,
  oldValue: number,
  newValue: number
): undefined {
  if (unitAttributeVisual !== ATTRIBUTE_VISUAL_POWER_SHIELDING) return undefined
  return grantShield(newValue - oldValue)
}

export function watchShields(): undefined {
  for (const [name, event, handler] of [
    [`${ADDON_NAME}LastFightShieldAdded`, EVENT_UNIT_ATTRIBUTE_VISUAL_ADDED, onShieldAdded],
    [`${ADDON_NAME}LastFightShieldUpdated`, EVENT_UNIT_ATTRIBUTE_VISUAL_UPDATED, onShieldUpdated],
  ] as const) {
    EVENT_MANAGER.RegisterForEvent(name, event, handler as (eventCode: number) => void)
    EVENT_MANAGER.AddFilterForEvent(name, event, REGISTER_FILTER_UNIT_TAG, "player")
  }
  return undefined
}

function shieldedWithin(fight: CmxFight): number {
  let shielded = 0
  for (const [timems, amount] of shieldGrants) {
    if (timems >= fight.combatstart && timems <= fight.combatend) shielded = shielded + amount
  }
  shieldGrants = []
  return shielded
}

function countResource(resource: LastFightResource | undefined, change: number): undefined {
  if (resource === undefined) return undefined
  if (change > 0) resource.gained = resource.gained + change
  else resource.spent = resource.spent - change
  return undefined
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
    presses: 0,
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
  const magicka: LastFightResource = { gained: 0, spent: 0 }
  const stamina: LastFightResource = { gained: 0, spent: 0 }
  const ultimate: LastFightResource = { gained: 0, spent: 0 }
  const resources: Record<number, LastFightResource> = {
    [COMBAT_MECHANIC_FLAGS_MAGICKA]: magicka,
    [COMBAT_MECHANIC_FLAGS_STAMINA]: stamina,
    [COMBAT_MECHANIC_FLAGS_ULTIMATE]: ultimate,
  }

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
      const ability = abilityOf(byId, abilityId)
      if (status === LIBCOMBAT_SKILLSTATUS_REGISTERED) ability.presses = ability.presses + 1
      if (isCastStart(status)) ability.casts = ability.casts + 1
    } else if (kind === LIBCOMBAT_EVENT_RESOURCES) {
      const change = line[3]
      const powerType = line[4]
      if (typeof change !== "number" || typeof powerType !== "number") continue
      countResource(resources[powerType], change)
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
    shielded: shieldedWithin(fight),
    magicka,
    stamina,
    ultimate,
    abilities,
    ticks: fightTicks(fight, log),
  }
}

let longestThisSession: LastFight | undefined

export function recordLastFight(summary: LastFight): undefined {
  if (
    longestThisSession !== undefined &&
    longestThisSession.activeSeconds >= summary.activeSeconds
  ) {
    return undefined
  }
  longestThisSession = summary
  globalThis.TemperCombat_LastFight = summary
  return undefined
}
