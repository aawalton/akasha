import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysThankGodIDoBeStillMySoul = {
  id: "01a0b780-80b0-7883-9c4e-52d217875c64",
  type: "page-type/song",
  slug: "the-piano-guys-thank-god-i-do-be-still-my-soul",
  title: "Thank God I Do / Be Still My Soul",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
