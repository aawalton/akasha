import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const troopsCommonerSOffensive = {
  id: "01a0657d-0317-7a80-9590-91aa9bd730fd",
  type: "page-type/world-skill",
  slug: "troops-commoner-s-offensive",
  title: "Troops: Commoner’s Offensive",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
