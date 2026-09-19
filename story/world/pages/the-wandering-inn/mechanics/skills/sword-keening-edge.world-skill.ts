import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swordKeeningEdge = {
  id: "01a0657d-0307-7146-ab97-d8459bf6e968",
  type: "page-type/world-skill",
  slug: "sword-keening-edge",
  title: "Sword: Keening Edge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
