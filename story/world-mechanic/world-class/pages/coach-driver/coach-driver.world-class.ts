import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const coachDriver = {
  id: "01a0657e-134b-70ad-9dbd-952ccd6ca0f3",
  type: "world-class",
  slug: "coach-driver",
  title: "Coach Driver",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
