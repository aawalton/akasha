import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheFoxhunter = {
  id: "01a0b771-65db-7809-902d-24aec4c726fc",
  type: "page-type/song",
  slug: "celtic-woman-the-foxhunter",
  title: "The Foxhunter",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
