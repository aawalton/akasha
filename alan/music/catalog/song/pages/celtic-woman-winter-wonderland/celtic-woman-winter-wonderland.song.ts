import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWinterWonderland = {
  id: "01a0b771-a68f-7ebf-ba9c-b5d38ef79e54",
  type: "page-type/song",
  slug: "celtic-woman-winter-wonderland",
  title: "Winter Wonderland",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
