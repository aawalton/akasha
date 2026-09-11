import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const teleportShot = {
  id: "01a0657d-0311-7d5e-96aa-143409a25482",
  type: "world-skill",
  slug: "teleport-shot",
  title: "Teleport Shot",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
