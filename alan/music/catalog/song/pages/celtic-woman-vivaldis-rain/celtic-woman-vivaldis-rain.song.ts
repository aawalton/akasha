import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanVivaldisRain = {
  id: "01a0b771-47a6-7a7f-ac8f-aadb4a17302d",
  type: "page-type/song",
  slug: "celtic-woman-vivaldis-rain",
  title: "Vivaldi's Rain",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
