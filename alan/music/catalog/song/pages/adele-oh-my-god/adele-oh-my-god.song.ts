import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleOhMyGod = {
  id: "01a0d52b-c259-7439-9fae-f5159f83a68b",
  type: "page-type/song",
  slug: "adele-oh-my-god",
  title: "Oh My God",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
