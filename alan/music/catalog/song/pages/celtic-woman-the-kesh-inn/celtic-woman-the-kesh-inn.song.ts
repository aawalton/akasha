import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheKeshInn = {
  id: "01a0b779-156a-7cfd-b5ce-e84edd06a218",
  type: "page-type/song",
  slug: "celtic-woman-the-kesh-inn",
  title: "The Kesh Inn",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
