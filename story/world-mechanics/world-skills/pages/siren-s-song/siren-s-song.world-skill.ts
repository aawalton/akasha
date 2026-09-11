import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const sirenSSong = {
  id: "01a0657d-02c5-74db-b4b2-908d771a7674",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "siren-s-song",
  title: "Siren’s Song",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
