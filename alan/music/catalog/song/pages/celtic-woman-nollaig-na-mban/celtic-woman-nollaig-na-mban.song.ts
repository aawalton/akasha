import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanNollaigNaMban = {
  id: "01a0b779-21c3-7adc-8184-b7aee73f6ab7",
  type: "page-type/song",
  slug: "celtic-woman-nollaig-na-mban",
  title: "Nollaig na mBan",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
