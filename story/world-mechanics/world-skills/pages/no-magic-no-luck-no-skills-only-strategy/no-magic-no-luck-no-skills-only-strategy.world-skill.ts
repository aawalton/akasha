import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const noMagicNoLuckNoSkillsOnlyStrategy = {
  id: "01a0657d-027b-7979-a152-5630d35ff217",
  type: "world-skill",
  slug: "no-magic-no-luck-no-skills-only-strategy",
  title: "No Magic, No Luck, No Skills, Only Strategy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
