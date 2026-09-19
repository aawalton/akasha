import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMidasTouch = {
  id: "01a0b770-bf98-7071-af26-7005ee711a53",
  type: "page-type/song",
  slug: "aurora-midas-touch",
  title: "Midas Touch",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
