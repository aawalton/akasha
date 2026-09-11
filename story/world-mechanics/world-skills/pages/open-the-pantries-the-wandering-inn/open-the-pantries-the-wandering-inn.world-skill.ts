import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const openThePantriesTheWanderingInn = {
  id: "01a0657d-027c-7b49-9175-ae1ec19ef886",
  type: "world-skill",
  slug: "open-the-pantries-the-wandering-inn",
  title: "Open the Pantries (The Wandering Inn)",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["instantaneous-order"],
  references: "jsonl",
} as const satisfies WorldSkill
