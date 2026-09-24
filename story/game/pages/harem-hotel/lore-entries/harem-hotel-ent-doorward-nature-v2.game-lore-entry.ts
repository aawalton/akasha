import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntDoorwardNatureV2 = {
  id: "01a0c94e-bc73-7da1-a6e3-53219f8cfbcc",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-doorward-nature-v2",
  title: "The Doorward",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "the-doorward",
  said: "The Doorward is the floor-1 challenge: a construct that stands up out of the far chamber's wall — the same dead-white plaster the whole Hotel is grown from — a heavy blank body a head taller than Alan and built wide. Unlike a passive lock it aggresses, turning on them with the slow certainty of a thing with one job and the mass to do it. It is DOOR-BOUND: it will not — cannot — leave the doorway, because guarding the door is the whole of what it is for. This makes the door itself the ground any fight with it is fought on.",
  turn: 15,
  quote: "The thing will not leave the doorway — cannot; guarding it is all it's for",
  attribute: "nature",
  supersedes: "game-lore-entry/harem-hotel-ent-doorward-nature",
} as const satisfies GameLoreEntry
