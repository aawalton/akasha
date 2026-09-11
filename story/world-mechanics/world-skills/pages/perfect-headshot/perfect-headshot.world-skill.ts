import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const perfectHeadshot = {
  id: "01a0657d-028f-723f-ad56-6129185ef3fc",
  type: "world-skill",
  slug: "perfect-headshot",
  title: "Perfect Headshot",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
