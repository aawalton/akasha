import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixAha = {
  id: "01a1546f-24eb-7415-9ffe-0548df38159f",
  type: "page-type/song",
  slug: "pentatonix-aha",
  title: "Aha!",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
