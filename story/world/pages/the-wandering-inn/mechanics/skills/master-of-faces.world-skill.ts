import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const masterOfFaces = {
  id: "01a0657d-024b-72ee-b3a8-d1ab64e146ff",
  type: "page-type/world-skill",
  slug: "master-of-faces",
  title: "Master of Faces",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
