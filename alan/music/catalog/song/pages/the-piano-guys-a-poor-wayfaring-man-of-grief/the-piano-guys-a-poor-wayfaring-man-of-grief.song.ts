import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAPoorWayfaringManOfGrief = {
  id: "01a0b783-79ff-7bc7-bfdf-db7ea6ad4c1f",
  type: "page-type/song",
  slug: "the-piano-guys-a-poor-wayfaring-man-of-grief",
  title: "A Poor Wayfaring Man Of Grief",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
