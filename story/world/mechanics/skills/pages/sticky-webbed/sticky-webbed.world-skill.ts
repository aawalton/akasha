import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stickyWebbed = {
  id: "01a0657d-02fa-7b2e-9367-c6ab8868d9cd",
  type: "page-type/world-skill",
  slug: "sticky-webbed",
  title: "Sticky Webbed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
