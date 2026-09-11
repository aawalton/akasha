import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const onGuard = {
  id: "01a0657d-027c-7bf3-a12b-d1cfbca85dce",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "on-guard",
  title: "On Guard",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
