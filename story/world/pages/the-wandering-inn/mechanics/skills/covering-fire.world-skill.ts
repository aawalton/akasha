import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const coveringFire = {
  id: "01a06575-97fe-709c-b4d9-7e6a85cdf1d6",
  type: "page-type/world-skill",
  slug: "covering-fire",
  title: "Covering Fire",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  aliases: ["COVERING FIRE"],
  evolvesToSlugs: ["world-skill/covering-fire-piercing-arrows"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.574Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
