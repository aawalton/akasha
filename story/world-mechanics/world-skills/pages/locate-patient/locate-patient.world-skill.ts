import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const locatePatient = {
  id: "01a0657d-0240-70ff-812c-168b62b64b81",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "locate-patient",
  title: "Locate Patient",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
