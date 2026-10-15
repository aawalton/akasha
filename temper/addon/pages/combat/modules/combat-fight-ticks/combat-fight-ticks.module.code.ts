import { ADDON_NAME } from "akasha/temper/addon/pages/combat/modules/combat-constants/combat-constants.module.code.ts"
import type {
  CmxFight,
  CoreLogLine,
} from "akasha/temper/addon/pages/combat/modules/combat-core-types/combat-core-types.module.code.ts"
import { LIBCOMBAT_EVENT_HEAL_SELF } from "akasha/temper/addon/pages/combat/modules/combat-lib-constants/combat-lib-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-16/eso-enums-16.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export interface FightTick {
  healing: number
  shield: number
  healthMaximum: number
  physical: number
  spell: number
}

type Sample = [
  timems: number,
  healthMaximum: number,
  shield: number,
  physical: number,
  spell: number,
]

const SAMPLER = `${ADDON_NAME}FightTicks`

const TICK_MS = 1000

let samples: Sample[] = []

let fullShield = 0

let peakShield = 0

function shieldUp(amount: number): undefined {
  fullShield = math.max(0, amount)
  peakShield = math.max(peakShield, fullShield)
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
  return shieldUp(value)
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
  if (newValue <= oldValue) return undefined
  return shieldUp(fullShield + newValue - oldValue)
}

function onShieldRemoved(
  this: void,
  _eventCode: number,
  _unitTag: string,
  unitAttributeVisual: number
): undefined {
  if (unitAttributeVisual !== ATTRIBUTE_VISUAL_POWER_SHIELDING) return undefined
  fullShield = 0
  return undefined
}

function sample(this: void): undefined {
  const [, healthMaximum] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_HEALTH)
  samples.push([
    GetGameTimeMilliseconds(),
    healthMaximum,
    peakShield,
    GetPlayerStat(STAT_PHYSICAL_RESIST),
    GetPlayerStat(STAT_SPELL_RESIST),
  ])
  peakShield = fullShield
  return undefined
}

function onCombatState(this: void, _eventCode: number, inCombat: boolean): undefined {
  sample()
  if (inCombat) EVENT_MANAGER.RegisterForUpdate(SAMPLER, TICK_MS, sample)
  else EVENT_MANAGER.UnregisterForUpdate(SAMPLER)
  return undefined
}

export function watchFightTicks(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    SAMPLER,
    EVENT_PLAYER_COMBAT_STATE,
    onCombatState as (eventCode: number) => void
  )
  for (const [name, event, handler] of [
    [`${SAMPLER}ShieldAdded`, EVENT_UNIT_ATTRIBUTE_VISUAL_ADDED, onShieldAdded],
    [`${SAMPLER}ShieldUpdated`, EVENT_UNIT_ATTRIBUTE_VISUAL_UPDATED, onShieldUpdated],
    [`${SAMPLER}ShieldRemoved`, EVENT_UNIT_ATTRIBUTE_VISUAL_REMOVED, onShieldRemoved],
  ] as const) {
    EVENT_MANAGER.RegisterForEvent(name, event, handler as (eventCode: number) => void)
    EVENT_MANAGER.AddFilterForEvent(name, event, REGISTER_FILTER_UNIT_TAG, "player")
  }
  return undefined
}

export function fightTicks(fight: CmxFight, log: readonly CoreLogLine[]): FightTick[] {
  const count = math.max(1, math.ceil((fight.combatend - fight.combatstart) / TICK_MS))
  const tickOf = (timems: number) =>
    math.min(count, math.max(1, math.floor((timems - fight.combatstart) / TICK_MS) + 1))
  const ticks: FightTick[] = []
  for (let at = 1; at <= count; at++) {
    ticks.push({ healing: 0, shield: 0, healthMaximum: 0, physical: 0, spell: 0 })
  }
  for (const line of log) {
    if (line[0] !== LIBCOMBAT_EVENT_HEAL_SELF) continue
    const timems = line[1]
    const hitValue = line[6]
    const overflow = line[8]
    if (typeof timems !== "number" || typeof hitValue !== "number") continue
    if (line[2] === ACTION_RESULT_DAMAGE_SHIELDED) continue
    const tick = ticks[tickOf(timems) - 1]
    if (tick === undefined) continue
    tick.healing = tick.healing + hitValue + (typeof overflow === "number" ? overflow : 0)
  }
  let current: Sample | undefined
  let next = 0
  for (let at = 1; at <= count; at++) {
    const endsAt = fight.combatstart + at * TICK_MS
    let latest = samples[next]
    while (latest !== undefined && latest[0] < endsAt) {
      if (latest[0] >= fight.combatstart - TICK_MS) current = latest
      next = next + 1
      latest = samples[next]
    }
    const tick = ticks[at - 1]
    if (tick === undefined || current === undefined) continue
    tick.healthMaximum = current[1]
    tick.shield = current[2]
    tick.physical = current[3]
    tick.spell = current[4]
  }
  samples = []
  return ticks
}
