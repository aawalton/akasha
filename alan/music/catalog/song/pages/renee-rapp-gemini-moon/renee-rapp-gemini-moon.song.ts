import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappGeminiMoon = {
  id: "01a0caa9-081c-7e8c-9f7c-4da749ad5153",
  type: "page-type/song",
  slug: "renee-rapp-gemini-moon",
  title: "Gemini Moon",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
