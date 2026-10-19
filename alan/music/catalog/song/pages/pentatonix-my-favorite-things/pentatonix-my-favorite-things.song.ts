import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixMyFavoriteThings = {
  id: "01a1546f-24ef-7c59-8925-dda9acdd6dc9",
  type: "page-type/song",
  slug: "pentatonix-my-favorite-things",
  title: "My Favorite Things",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
