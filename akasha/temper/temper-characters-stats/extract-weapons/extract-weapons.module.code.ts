import { createWeaponSource } from "@akasha/temper-characters-equipment/weapon-source"
import type { PipelineStage } from "../pipeline-types/pipeline-types.module.code.ts"

export const extractWeapons: PipelineStage = (build, context) => {
  if (context.bar === "primary-weapon-bar") {
    const main = build.equipment["primary-weapon-bar"]["main-hand"]
    const off = build.equipment["primary-weapon-bar"]["off-hand"]

    return [
      ...(main.itemType === "weapon" ? [createWeaponSource(main.data)] : []),
      ...(off.itemType === "weapon" ? [createWeaponSource(off.data)] : []),
    ]
  }
  if (context.bar === "backup-weapon-bar") {
    const main = build.equipment["backup-weapon-bar"]["main-hand"]
    const off = build.equipment["backup-weapon-bar"]["off-hand"]

    return [
      ...(main.itemType === "weapon" ? [createWeaponSource(main.data)] : []),
      ...(off.itemType === "weapon" ? [createWeaponSource(off.data)] : []),
    ]
  }
  return []
}
