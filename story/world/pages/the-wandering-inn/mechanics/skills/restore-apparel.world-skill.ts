import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const restoreApparel = {
  id: "01a0657d-02b1-76bc-9f68-6d37425b6abc",
  type: "page-type/world-skill",
  slug: "restore-apparel",
  title: "Restore Apparel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
