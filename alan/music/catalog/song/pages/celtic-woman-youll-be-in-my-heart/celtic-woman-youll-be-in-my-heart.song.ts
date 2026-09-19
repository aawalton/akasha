import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanYoullBeInMyHeart = {
  id: "01a0b771-879a-7a42-a256-888082f330ac",
  type: "page-type/song",
  slug: "celtic-woman-youll-be-in-my-heart",
  title: "You'll Be in My Heart",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
