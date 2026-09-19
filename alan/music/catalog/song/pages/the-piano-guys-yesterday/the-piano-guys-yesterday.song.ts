import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysYesterday = {
  id: "01a0b783-6740-7e5a-bf0f-ebc6a51f3126",
  type: "page-type/song",
  slug: "the-piano-guys-yesterday",
  title: "Yesterday",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
