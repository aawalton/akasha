import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const proofOfCrime = {
  id: "01a0657d-0297-7bbc-9c4d-d52b58b3516d",
  type: "page-type/world-skill",
  slug: "proof-of-crime",
  title: "Proof of Crime",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
