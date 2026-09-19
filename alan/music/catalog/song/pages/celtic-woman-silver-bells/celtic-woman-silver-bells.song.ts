import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSilverBells = {
  id: "01a0b779-2427-762f-9473-de61b66610e1",
  type: "page-type/song",
  slug: "celtic-woman-silver-bells",
  title: "Silver Bells",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
