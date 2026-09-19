import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTitaniumPavane = {
  id: "01a0b780-0a94-7f57-99f8-b04715924d8f",
  type: "page-type/song",
  slug: "the-piano-guys-titanium-pavane",
  title: "Titanium / Pavane",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
