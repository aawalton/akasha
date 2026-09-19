import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAThousandYearsIntroduction = {
  id: "01a0b780-5638-7277-a349-0b1441b8b00b",
  type: "page-type/song",
  slug: "the-piano-guys-a-thousand-years-introduction",
  title: "A Thousand Years (Introduction)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
