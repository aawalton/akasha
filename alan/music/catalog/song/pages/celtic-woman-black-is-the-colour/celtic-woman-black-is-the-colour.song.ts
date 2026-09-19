import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBlackIsTheColour = {
  id: "01a0b771-60fc-7921-a65e-a5656b2644af",
  type: "page-type/song",
  slug: "celtic-woman-black-is-the-colour",
  title: "Black Is The Colour",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
