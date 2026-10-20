import type { ReadingLine } from "akasha/command/pages/temper/modules/stat-reading-lines/stat-reading-lines.module.code.ts"

const UNSTEADY_WHILE_BLOCKING_OR_MOVING = new Set(["stamina-recovery"])

const ELDER_DRAGON = "elder-dragon-29460"

export function unsteadyOf(
  reading: ReadingLine["reading"],
  named: string,
  passives: readonly string[] = []
): string | null {
  const healthMoved = reading.healthBefore !== reading.health
  if (named === "health-recovery" && passives.includes(ELDER_DRAGON) && healthMoved) {
    return "Health moved under Elder Dragon"
  }
  if (!UNSTEADY_WHILE_BLOCKING_OR_MOVING.has(named)) return null
  if (reading.blocking === true) return "blocking"
  if (reading.moving === true) return "moving"
  const unsaid = reading.blocking === undefined && reading.moving === undefined
  if (unsaid && reading.stats[named] === 0) return "0 with no blocking or moving kept"
  return null
}
