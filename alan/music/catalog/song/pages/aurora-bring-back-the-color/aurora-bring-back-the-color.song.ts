import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraBringBackTheColor = {
  id: "01a0b770-b972-7edc-82cf-d5d5b1659d1e",
  type: "page-type/song",
  slug: "aurora-bring-back-the-color",
  title: "BRING BACK THE COLOR",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
