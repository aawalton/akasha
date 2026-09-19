import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysRowRowRowYourBoat = {
  id: "01a0b780-70e7-77a7-853d-87bd35e9bae7",
  type: "page-type/song",
  slug: "the-piano-guys-row-row-row-your-boat",
  title: "Row Row Row Your Boat",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
