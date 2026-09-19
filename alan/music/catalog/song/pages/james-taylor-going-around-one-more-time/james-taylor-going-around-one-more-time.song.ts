import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGoingAroundOneMoreTime = {
  id: "01a0b779-7b7a-7905-bfb7-57088b17bf39",
  type: "page-type/song",
  slug: "james-taylor-going-around-one-more-time",
  title: "Going Around One More Time",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
