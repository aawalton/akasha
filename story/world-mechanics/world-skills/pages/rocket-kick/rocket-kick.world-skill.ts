import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const rocketKick = {
  id: "01a0657d-02b6-7765-9d1f-18b506eb0b34",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "rocket-kick",
  title: "Rocket Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
