import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sterileEquipment = {
  id: "01a0657d-02fa-7c85-b357-6ea31848bfc6",
  type: "page-type/world-skill",
  slug: "sterile-equipment",
  title: "Sterile Equipment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
