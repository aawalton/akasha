import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const locatePatient = {
  id: "01a0657d-0240-70ff-812c-168b62b64b81",
  type: "page-type/world-skill",
  slug: "locate-patient",
  title: "Locate Patient",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.528Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
