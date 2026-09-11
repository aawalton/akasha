import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicSpellProficiencyNatureMagic = {
  id: "01a06575-97f4-7695-8dd9-a817203d19bb",
  type: "world-skill",
  slug: "basic-spell-proficiency-nature-magic",
  title: "Basic Spell Proficiency: Nature Magic",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
