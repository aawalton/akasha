import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMaryDidYouKnowCorelliChristmasConcerto = {
  id: "01a0b780-275b-78b5-a8b3-9a0b06309284",
  type: "page-type/song",
  slug: "the-piano-guys-mary-did-you-know-corelli-christmas-concerto",
  title: "Mary Did You Know / Corelli Christmas Concerto",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
