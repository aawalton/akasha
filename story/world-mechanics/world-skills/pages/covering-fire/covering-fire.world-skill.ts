import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const coveringFire = {
  id: "01a06575-97fe-709c-b4d9-7e6a85cdf1d6",
  type: "world-skill",
  slug: "covering-fire",
  title: "Covering Fire",
  world: "the-wandering-inn",
  aliases: ["COVERING FIRE"],
  evolvesToSlugs: ["covering-fire-piercing-arrows"],
  references: "jsonl",
} as const satisfies WorldSkill
