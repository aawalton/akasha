import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const partnersIiBonds = {
  id: "01a0de09-7e11-76cb-9801-2f56b4cf9603",
  type: "page-type/world-mechanic",
  slug: "partners-ii-bonds",
  title: "Bonds",
  description:
    "Every companion has a bond track with visible stages: Stranger, Companion, Confidant, Beloved, Linked. Bond points are earned by play, never by declaration, in five kinds: genuine attention, honesty that costs something, risk carried for the other, time freely given, and being truly seen and staying. The awards per scene and the stage thresholds are hidden. A stage crossed is told as felt, never as arithmetic. Intimacy is never automatic: Linked, the last stage, also takes an explicit mutual yes in the fiction.",
} as const satisfies WorldMechanic
