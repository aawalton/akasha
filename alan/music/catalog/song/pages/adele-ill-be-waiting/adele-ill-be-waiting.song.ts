import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleIllBeWaiting = {
  id: "01a0d52b-c259-7997-9328-522506047e2d",
  type: "page-type/song",
  slug: "adele-ill-be-waiting",
  title: "I'll Be Waiting",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
