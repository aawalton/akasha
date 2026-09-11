import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const redirectMissile = {
  id: "01a0657d-02a6-7490-98af-4ff647c9c47c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "redirect-missile",
  title: "Redirect Missile",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
