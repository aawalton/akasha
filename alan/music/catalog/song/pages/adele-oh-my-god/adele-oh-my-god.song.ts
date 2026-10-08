import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleOhMyGod = {
  id: "01a0d52b-c259-7439-9fae-f5159f83a68b",
  type: "page-type/song",
  slug: "adele-oh-my-god",
  title: "Oh My God",
  artist: "artist/adele",
  performed: true,
  createdAt: "2026-09-24T20:46:49.945Z",
  updatedAt: "2026-09-24T20:46:51.000Z",
} as const satisfies Song
