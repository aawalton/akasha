import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixBlindingLights = {
  id: "01a1546f-24eb-7169-b65c-1f61405b15db",
  type: "page-type/song",
  slug: "pentatonix-blinding-lights",
  title: "Blinding Lights",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
