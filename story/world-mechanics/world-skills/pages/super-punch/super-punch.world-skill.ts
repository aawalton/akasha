import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const superPunch = {
  id: "01a0657d-0302-7e64-a044-f1d7ecdc7f23",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "super-punch",
  title: "Super Punch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
