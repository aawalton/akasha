import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallVoxMatris = {
  id: "01a0b77d-26c5-744f-9b13-c79e4e643dd7",
  type: "page-type/song",
  slug: "paul-cardall-vox-matris",
  title: "Vox Matris",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
