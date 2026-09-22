import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappSometimes = {
  id: "01a0caa8-fe13-7aad-9bb2-a7743fdb3f30",
  type: "page-type/song",
  slug: "renee-rapp-sometimes",
  title: "Sometimes",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
