import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCarolOfTheBellsGodRestYeMerryGentlemen = {
  id: "01a0b780-0d05-71db-a30b-28d9fbfac927",
  type: "page-type/song",
  slug: "the-piano-guys-carol-of-the-bells-god-rest-ye-merry-gentlemen",
  title: "Carol of the Bells / God Rest Ye Merry Gentlemen",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
