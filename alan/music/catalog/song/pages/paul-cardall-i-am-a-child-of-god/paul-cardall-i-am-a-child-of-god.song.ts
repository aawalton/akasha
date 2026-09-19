import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallIAmAChildOfGod = {
  id: "01a0b77e-67f6-7180-a6c3-031b0f68dfdc",
  type: "page-type/song",
  slug: "paul-cardall-i-am-a-child-of-god",
  title: "I am a Child of God",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
