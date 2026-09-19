import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTourDeFrance = {
  id: "01a0b780-d21e-7042-a39d-a6dc557f12be",
  type: "page-type/song",
  slug: "the-piano-guys-tour-de-france",
  title: "Tour de France",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
