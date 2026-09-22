import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const chaislynMandelaEffect = {
  id: "01a0ba64-abfc-755a-981b-ef673d20b024",
  type: "page-type/song",
  slug: "chaislyn-mandela-effect",
  title: "Mandela Effect",
  artist: "artist/chaislyn",
  performed: true,
} as const satisfies Song
