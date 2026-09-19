import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tauntTheFoe = {
  id: "01a0657d-0310-761f-b978-83fdf78e86d9",
  type: "page-type/world-skill",
  slug: "taunt-the-foe",
  title: "Taunt the Foe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
