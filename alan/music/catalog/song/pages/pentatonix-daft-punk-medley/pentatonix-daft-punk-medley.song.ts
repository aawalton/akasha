import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixDaftPunkMedley = {
  id: "01a1546f-24ec-7c02-9d10-76c204a45172",
  type: "page-type/song",
  slug: "pentatonix-daft-punk-medley",
  title: "Daft Punk Medley",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
