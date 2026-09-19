import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiSoldierPoetKing = {
  id: "01a0b783-c374-77ef-99a2-318e84338919",
  type: "page-type/song",
  slug: "vinny-marchi-soldier-poet-king",
  title: "Soldier, Poet, King",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
