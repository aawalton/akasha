import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekDespiteTheWeather = {
  id: "01a0caa8-a941-77b2-b0ec-68de8af191fa",
  type: "page-type/song",
  slug: "nickel-creek-despite-the-weather",
  title: "…Despite the Weather",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
