import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fighterPilot = {
  id: "01a0657e-1364-7717-938b-22f695b96895",
  type: "page-type/world-class",
  slug: "fighter-pilot",
  title: "Fighter Pilot",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  aliases: ["FIGHTER PILOT"],
  evolvesToSlugs: ["world-class/wartouched-fighter-pilot"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.452Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
