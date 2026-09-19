import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sirenSSong = {
  id: "01a0657d-02c5-74db-b4b2-908d771a7674",
  type: "page-type/world-skill",
  slug: "siren-s-song",
  title: "Siren’s Song",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
