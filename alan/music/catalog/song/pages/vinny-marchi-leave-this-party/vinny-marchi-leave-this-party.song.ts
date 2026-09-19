import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiLeaveThisParty = {
  id: "01a0b783-b206-79c6-a49f-99492bb95e59",
  type: "page-type/song",
  slug: "vinny-marchi-leave-this-party",
  title: "Leave This Party",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
