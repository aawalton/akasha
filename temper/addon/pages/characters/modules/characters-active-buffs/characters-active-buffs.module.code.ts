import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

export type PowerAtOnset = {
  weapon: number
  spell: number
}

export type ActiveBuff = {
  abilityId: number
  name: string
  description: string
  effect: string
  stacks: number
  powerAtOnset?: PowerAtOnset
}

const onsets = new Map<number, PowerAtOnset>()

export function noteBuffOnset(changeType: number, abilityId: number): undefined {
  if (changeType === EFFECT_RESULT_FADED) {
    onsets.delete(abilityId)
    return
  }
  if (changeType !== EFFECT_RESULT_GAINED && changeType !== EFFECT_RESULT_UPDATED) return
  if (changeType === EFFECT_RESULT_UPDATED && onsets.has(abilityId)) return
  onsets.set(abilityId, {
    weapon: GetPlayerStat(STAT_POWER, STAT_BONUS_OPTION_APPLY_BONUS),
    spell: GetPlayerStat(STAT_SPELL_POWER, STAT_BONUS_OPTION_APPLY_BONUS),
  })
}

export function activeBuffs(): ActiveBuff[] {
  const buffs: ActiveBuff[] = []
  const count = GetNumBuffs("player")
  for (let index = 1; index <= count; index++) {
    const [name, , , buffSlot, stacks, , , , , , abilityId] = GetUnitBuffInfo("player", index)
    buffs.push({
      abilityId,
      name: zo_strformat("<<1>>", name),
      description: GetAbilityDescription(abilityId, undefined, "player"),
      effect: GetAbilityEffectDescription(buffSlot),
      stacks,
      powerAtOnset: onsets.get(abilityId),
    })
  }
  return buffs
}
