import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaDoormanOfMyHeart = {
  id: "01a0d52b-52d8-79f4-b8fc-baccf7a6b0f6",
  type: "page-type/song",
  slug: "rockapella-doorman-of-my-heart",
  title: "Doorman of My Heart",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
