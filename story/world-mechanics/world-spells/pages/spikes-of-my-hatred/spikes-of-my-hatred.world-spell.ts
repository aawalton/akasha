import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spikesOfMyHatred = {
  id: "01a06572-95e2-7b37-862f-4f7ca00a5a7c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spikes-of-my-hatred",
  title: "Spikes of My Hatred",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
