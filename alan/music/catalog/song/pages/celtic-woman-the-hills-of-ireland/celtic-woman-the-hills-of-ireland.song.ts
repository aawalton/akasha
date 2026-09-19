import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheHillsOfIreland = {
  id: "01a0b771-93b1-7510-a388-ca2f1bfbe749",
  type: "page-type/song",
  slug: "celtic-woman-the-hills-of-ireland",
  title: "The Hills Of Ireland",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
