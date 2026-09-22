import type { TowerPresence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-presence/tower-presence.page-type.types.ts"

export const theTowerCompanionAura = {
  id: "01a0ca29-9b5a-77f3-a402-1e05247ebe32",
  type: "page-type/tower-presence",
  slug: "the-tower-companion-aura",
  character: "character-other/the-tower-companion-aura",
  value: 16,
} as const satisfies TowerPresence
