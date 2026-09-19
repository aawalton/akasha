import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysYouSay = {
  id: "01a0b780-0bcc-7b73-a621-38dea3063dd3",
  type: "page-type/song",
  slug: "the-piano-guys-you-say",
  title: "You Say",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
