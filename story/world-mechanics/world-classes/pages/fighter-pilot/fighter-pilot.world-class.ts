import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const fighterPilot = {
  id: "01a0657e-1364-7717-938b-22f695b96895",
  type: "world-class",
  slug: "fighter-pilot",
  title: "Fighter Pilot",
  world: "the-wandering-inn",
  aliases: ["FIGHTER PILOT"],
  evolvesToSlugs: ["wartouched-fighter-pilot"],
  references: "jsonl",
} as const satisfies WorldClass
