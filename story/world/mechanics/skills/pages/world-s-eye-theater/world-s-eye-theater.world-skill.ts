import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const worldSEyeTheater = {
  id: "01a0657d-0337-722c-b498-bd8abf1b97ec",
  type: "page-type/world-skill",
  slug: "world-s-eye-theater",
  title: "World’s Eye Theater",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
