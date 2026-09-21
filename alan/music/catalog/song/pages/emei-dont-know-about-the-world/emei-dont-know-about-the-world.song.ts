import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiDontKnowAboutTheWorld = {
  id: "01a0c43e-7417-7666-a93e-fc79dfb43399",
  type: "page-type/song",
  slug: "emei-dont-know-about-the-world",
  title: "Don't Know About The World",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
