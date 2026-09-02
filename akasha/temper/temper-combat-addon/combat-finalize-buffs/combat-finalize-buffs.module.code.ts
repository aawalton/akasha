import type {
  CmxFight,
  EffectInstance,
  EffectStackData,
} from "@akasha/temper-combat-addon/combat-core-types"
import { getCalculated } from "@akasha/temper-combat-addon/combat-fight-model"
import {
  getFoodDrinkItemLinkFromAbilityId,
  MUNDUS_STONES,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { countSlots } from "@akasha/temper-combat-addon/combat-unit-stats"

const inf = math.huge

function getStackData(instance: EffectInstance | undefined, stacks: number): EffectStackData {
  const stackData = instance !== undefined ? instance[stacks] : undefined
  if (stackData === undefined) {
    error("effect stack data missing during finalization")
  }
  return stackData
}

export function finalizeUnitBuffs(fight: CmxFight): undefined {
  const calc = getCalculated(fight)
  for (const [unitId, unitData] of pairs(fight.units)) {
    const unitCalc = calc.units[unitId]

    if (unitData.name === "Offline") {
      delete calc.units[unitId]
    } else if (unitCalc !== undefined) {
      const endtime = zo_min(unitCalc.endtime ?? fight.endtime, fight.endtime)

      for (const [, effectdata] of pairs(unitCalc.buffs)) {
        const instances = effectdata.instances
        const slots = effectdata.slots ?? {}
        const [slotcount, groupSlotCount] = countSlots(slots)

        if (groupSlotCount > 0 && fight.starttime !== 0) {
          for (const [, slotdata] of pairs(slots)) {
            const abilityId = slotdata.abilityId
            const isPlayerSource = slotdata.isPlayerSource
            const instance = abilityId !== undefined ? instances[abilityId] : undefined

            delete slotdata.abilityId
            delete slotdata.isPlayerSource

            for (const [stacks, starttime] of pairs(slotdata)) {
              if (typeof stacks !== "number" || typeof starttime !== "number") {
                continue
              }
              const stackData = getStackData(instance, stacks)
              const duration = endtime - starttime

              if (isPlayerSource === true) {
                stackData.uptime = stackData.uptime + duration
                stackData.count = stackData.count + 1
              }

              stackData.groupUptime = stackData.groupUptime + duration
              stackData.groupCount = stackData.groupCount + 1
            }
          }

          if (slotcount > 0) {
            const duration = endtime - (effectdata.firstStartTime ?? endtime)
            effectdata.uptime = effectdata.uptime + duration
            effectdata.count = effectdata.count + slotcount
          }

          const groupDuration = endtime - (effectdata.firstGroupStartTime ?? endtime)
          effectdata.groupUptime = effectdata.groupUptime + groupDuration
          effectdata.groupCount = effectdata.groupCount + groupSlotCount
        }

        effectdata.slots = undefined

        let maxDuration = 0

        for (const [abilityId, instance] of pairs(instances)) {
          let count = 0
          let groupCount = 0
          let sumStackUptime = 0
          let sumStackGroupUptime = 0

          let maxStacks = 1
          let minStacks = inf
          let minStackDuration: number | undefined
          let minStackDurationGroup: number | undefined

          for (const [stacks, stackData] of pairs(instance)) {
            if (typeof stacks !== "number" || typeof stackData === "number") {
              continue
            }
            if (stacks < minStacks) {
              minStacks = stacks
              minStackDuration = stackData.uptime
              minStackDurationGroup = stackData.groupUptime
            }

            sumStackUptime = sumStackUptime + stackData.uptime
            sumStackGroupUptime = sumStackGroupUptime + stackData.groupUptime

            maxStacks = zo_max(maxStacks, stacks)
            count = zo_max(stackData.count, count)
            groupCount = zo_max(stackData.groupCount, groupCount)
          }

          const uptime =
            (sumStackUptime + (minStackDuration != null ? (minStacks - 1) * minStackDuration : 0)) /
            maxStacks
          const groupUptime =
            (sumStackGroupUptime +
              (minStackDurationGroup != null ? (minStacks - 1) * minStackDurationGroup : 0)) /
            maxStacks

          instance.uptime = uptime
          instance.groupUptime = groupUptime
          instance.count = count
          instance.groupCount = groupCount

          if (uptime > maxDuration || groupUptime > maxDuration) {
            maxDuration = zo_max(maxDuration, uptime)
            effectdata.iconId = abilityId
          }

          if (unitId === fight.playerid) {
            if (getFoodDrinkItemLinkFromAbilityId(abilityId) != null) {
              calc.buildInfo.drinkFood[abilityId] = uptime
            }
            if (MUNDUS_STONES[abilityId] === true) {
              calc.buildInfo.mundus[abilityId] = uptime
            }
          }
        }

        effectdata.firstStartTime = undefined
        effectdata.firstGroupStartTime = undefined
      }
    }
  }
  return undefined
}
