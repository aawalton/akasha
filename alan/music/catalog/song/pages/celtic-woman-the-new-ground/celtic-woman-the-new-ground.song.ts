import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheNewGround = {
  id: "01a0b771-9a73-7f4b-a125-366ee3d470a9",
  type: "page-type/song",
  slug: "celtic-woman-the-new-ground",
  title: "The New Ground",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
