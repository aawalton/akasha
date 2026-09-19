import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayIAmAMountain = {
  id: "01a0ba64-e484-741d-9de0-d4acf50eaeb5",
  type: "page-type/song",
  slug: "coldplay-i-am-a-mountain",
  title: "i Am A Mountain",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
