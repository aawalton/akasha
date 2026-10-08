import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const openThePantriesTheWanderingInn = {
  id: "01a0657d-027c-7b49-9175-ae1ec19ef886",
  type: "page-type/world-skill",
  slug: "open-the-pantries-the-wandering-inn",
  title: "Open the Pantries (The Wandering Inn)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/instantaneous-order"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.588Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
