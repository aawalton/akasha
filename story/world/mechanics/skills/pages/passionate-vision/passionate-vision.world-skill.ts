import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const passionateVision = {
  id: "01a0657d-0287-7dcc-9542-fa0c32c344fa",
  type: "page-type/world-skill",
  slug: "passionate-vision",
  title: "Passionate Vision",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
