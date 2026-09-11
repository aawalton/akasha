import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const superiorParry = {
  id: "01a0657d-0302-71cc-9e71-b0d9189351fd",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "superior-parry",
  title: "Superior Parry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
