import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysDoYouHearWhatIHear = {
  id: "01a0b780-36a1-7190-b91a-82b08a949ca1",
  type: "page-type/song",
  slug: "the-piano-guys-do-you-hear-what-i-hear",
  title: "Do You Hear What I Hear?",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
