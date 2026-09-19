import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallElizasTheme = {
  id: "01a0b77d-70ee-76f7-9e96-83e20411aefd",
  type: "page-type/song",
  slug: "paul-cardall-elizas-theme",
  title: "Eliza's Theme",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
