import type { GameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.types.ts"

export const haremHotelEntAlanTalentThelink = {
  id: "01a0c94e-c034-704a-8616-ea623b9369bd",
  type: "page-type/game-lore-entry",
  slug: "harem-hotel-ent-alan-talent-thelink",
  title: "Alan",
  game: "story-game/harem-hotel",
  kind: "entity",
  subject: "alan",
  said: "THE LINK — Alan's Talent, first activated after the night with Aria: bind one of her skills or attributes and she binds one of yours; a bound trait rises as its source rises. Selection required.",
  turn: 10,
  quote:
    "Bind one of her skills or attributes. She binds one of yours. A bound trait rises as its source rises.",
  attribute: "talent",
  supersedes: "game-lore-entry/harem-hotel-ent-alan-talent",
} as const satisfies GameLoreEntry
