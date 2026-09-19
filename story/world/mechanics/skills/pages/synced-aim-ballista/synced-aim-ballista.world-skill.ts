import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const syncedAimBallista = {
  id: "01a0657d-0307-7966-a50f-5f7e902e97d2",
  type: "page-type/world-skill",
  slug: "synced-aim-ballista",
  title: "Synced Aim: Ballista",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
