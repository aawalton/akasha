import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWePrayBeOurGuest = {
  id: "01a0ba64-ed5b-7f7e-8eed-c031346192c0",
  type: "page-type/song",
  slug: "coldplay-we-pray-be-our-guest",
  title: "We Pray - Be Our Guest",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
