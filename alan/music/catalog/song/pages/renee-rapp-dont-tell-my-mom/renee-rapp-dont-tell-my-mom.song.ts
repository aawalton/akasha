import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappDontTellMyMom = {
  id: "01a0caa9-0ea8-796f-8fdc-7389f7ba5006",
  type: "page-type/song",
  slug: "renee-rapp-dont-tell-my-mom",
  title: "Don't Tell My Mom",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
