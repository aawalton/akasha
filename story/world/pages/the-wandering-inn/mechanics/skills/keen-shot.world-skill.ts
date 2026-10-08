import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const keenShot = {
  id: "01a06575-9821-77bb-9c01-a28c06201358",
  type: "page-type/world-skill",
  slug: "keen-shot",
  title: "Keen Shot",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-skill/silverstake-spreadshot"],
  createdAt: "2026-09-03T04:10:00.609Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
