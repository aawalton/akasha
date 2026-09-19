import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMoreThanAFeelingLongTime = {
  id: "01a0b780-036e-7ac0-af4d-e788ed38dd30",
  type: "page-type/song",
  slug: "the-piano-guys-more-than-a-feeling-long-time",
  title: "More Than a Feeling / Long Time",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
