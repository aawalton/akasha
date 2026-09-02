import type { MountTrainingProgress } from "@akasha/temper-completion/completion-progress"

export function isMountTrainingPathComplete(
  mt: MountTrainingProgress | undefined,
  itemPath?: readonly (string | number)[] | null
): boolean {
  if (mt === undefined) return false
  if (itemPath !== undefined && itemPath !== null && itemPath.length > 0) {
    const stat = String(itemPath[0])
    if (stat === "speed") return mt.speed >= mt.maxSpeed
    if (stat === "stamina") return mt.stamina >= mt.maxStamina
    if (stat === "carryCapacity") return mt.carryCapacity >= mt.maxCarryCapacity
    return false
  }
  return (
    mt.speed >= mt.maxSpeed &&
    mt.stamina >= mt.maxStamina &&
    mt.carryCapacity >= mt.maxCarryCapacity
  )
}
