import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSantaClausIsComingToTown = {
  id: "01a0b771-a1b0-7727-b93e-3d34cdc40d14",
  type: "page-type/song",
  slug: "celtic-woman-santa-claus-is-coming-to-town",
  title: "Santa Claus Is Coming To Town",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
