import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysYoullBeInMyHeart = {
  id: "01a0b780-72c5-7c56-b585-804732f69274",
  type: "page-type/song",
  slug: "the-piano-guys-youll-be-in-my-heart",
  title: "You'll Be In My Heart",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
