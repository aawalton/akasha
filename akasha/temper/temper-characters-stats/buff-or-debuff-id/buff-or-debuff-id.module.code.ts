import type { BuffOrDebuffEffect } from "@akasha/temper-formula-framework/effect"

export function getBuffOrDebuffId(effect: BuffOrDebuffEffect): string {
  return "buffId" in effect ? effect.buffId : effect.debuffId
}
