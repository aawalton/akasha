import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spikesOfMyHatred = {
  id: "01a06572-95e2-7b37-862f-4f7ca00a5a7c",
  type: "page-type/world-spell",
  slug: "spikes-of-my-hatred",
  title: "Spikes of My Hatred",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
