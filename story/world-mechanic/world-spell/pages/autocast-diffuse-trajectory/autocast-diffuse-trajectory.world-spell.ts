import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const autocastDiffuseTrajectory = {
  id: "01a06572-95b5-7070-999d-25bbcfb81671",
  type: "world-spell",
  slug: "autocast-diffuse-trajectory",
  title: "Autocast: Diffuse Trajectory",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
