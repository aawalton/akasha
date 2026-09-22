import type { GameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntHotelProvisioning = {
  id: "01a0c94e-be05-79b6-918d-4be5afc6a4d3",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-hotel-provisioning",
  title: "Harem Hotel",
  game: "game/harem-hotel",
  kind: "entity",
  subject: "harem-hotel",
  said: "The Hotel's economy of gear, as Alan is starting to see it: the floor keeps its useful things behind its challenges and pays them out only to those who get through. Borne out so far — floor 1 yielded the keystone knife only at the Doorward clear, while the residential (lived-in) end of a floor holds only the ordinary furniture of rest (bed, basin, lamp, linens) — nothing with an edge, nothing that answers to weapon or key. Loot is earned past a challenge, not found at rest.",
  turn: 19,
  quote:
    "The floor keeps its useful things behind its doors, you are starting to see, and pays them out only to those who get through",
  attribute: "provisioning",
} as const satisfies GameLoreEntry
