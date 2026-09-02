import { resolveAlchemyMasterWrit } from "../inventory-writ-crafting-alchemy/inventory-writ-crafting-alchemy.module.code.ts"
import { resolveEnchantingMasterWrit } from "../inventory-writ-crafting-enchanting/inventory-writ-crafting-enchanting.module.code.ts"
import {
  decodeMasterWrit,
  type MasterWritSpec,
} from "../inventory-writ-crafting-master-decode/inventory-writ-crafting-master-decode.module.code.ts"
import { findBestSpecMatch } from "../inventory-writ-crafting-master-match/inventory-writ-crafting-master-match.module.code.ts"
import { planMasterWritSteps } from "../inventory-writ-crafting-master-plan/inventory-writ-crafting-master-plan.module.code.ts"
import {
  buildMasterSmithingStep,
  findMasterSmithingMatch,
} from "../inventory-writ-crafting-master-smithing/inventory-writ-crafting-master-smithing.module.code.ts"
import { resolveProvisioningMasterWrit } from "../inventory-writ-crafting-provisioning/inventory-writ-crafting-provisioning.module.code.ts"
import {
  enqueueWritCraft,
  type WritCraftRequest,
} from "../inventory-writ-crafting-queue/inventory-writ-crafting-queue.module.code.ts"

const MASTER_SMITHING_CRAFT_TYPES = new LuaSet<number>()
MASTER_SMITHING_CRAFT_TYPES.add(CRAFTING_TYPE_BLACKSMITHING)
MASTER_SMITHING_CRAFT_TYPES.add(CRAFTING_TYPE_CLOTHIER)
MASTER_SMITHING_CRAFT_TYPES.add(CRAFTING_TYPE_WOODWORKING)
MASTER_SMITHING_CRAFT_TYPES.add(CRAFTING_TYPE_JEWELRYCRAFTING)

function resolveConsumableMasterWrit(
  this: void,
  spec: MasterWritSpec,
  questIndex: number,
  conditionIndex: number
): WritCraftRequest | undefined {
  if (spec.craftType === CRAFTING_TYPE_ENCHANTING) {
    return resolveEnchantingMasterWrit(spec, questIndex, conditionIndex)
  }
  if (spec.craftType === CRAFTING_TYPE_ALCHEMY) {
    return resolveAlchemyMasterWrit(spec, questIndex, conditionIndex)
  }
  if (spec.craftType === CRAFTING_TYPE_PROVISIONING) {
    return resolveProvisioningMasterWrit(spec, questIndex, conditionIndex)
  }
  return undefined
}

function enqueueEquipmentSequence(
  this: void,
  spec: MasterWritSpec,
  questIndex: number,
  conditionIndex: number
): number {
  const match = findMasterSmithingMatch(spec)
  if (match === undefined) return 0

  const best = findBestSpecMatch(spec)
  const steps = planMasterWritSteps(best?.quality, spec.targetQuality)

  let enqueued = 0
  for (const step of steps) {
    enqueueWritCraft(buildMasterSmithingStep(step, spec, questIndex, conditionIndex, match))
    enqueued++
  }
  return enqueued
}

export function dispatchMasterWrit(this: void, questIndex: number): number {
  const numConditions = GetJournalQuestNumConditions(questIndex, 1)

  let enqueued = 0
  for (let c = 1; c <= numConditions; c++) {
    const spec = decodeMasterWrit(questIndex, c)
    if (spec === undefined) continue

    if (MASTER_SMITHING_CRAFT_TYPES.has(spec.craftType)) {
      enqueued += enqueueEquipmentSequence(spec, questIndex, c)
    } else {
      const request = resolveConsumableMasterWrit(spec, questIndex, c)
      if (request !== undefined) {
        enqueueWritCraft(request)
        enqueued++
      }
    }
  }
  return enqueued
}
