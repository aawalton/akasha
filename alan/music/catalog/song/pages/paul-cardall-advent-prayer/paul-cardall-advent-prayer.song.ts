import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAdventPrayer = {
  id: "01a0b77d-56a7-7775-8cbd-89fb51bd2ed8",
  type: "page-type/song",
  slug: "paul-cardall-advent-prayer",
  title: "Advent Prayer",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
