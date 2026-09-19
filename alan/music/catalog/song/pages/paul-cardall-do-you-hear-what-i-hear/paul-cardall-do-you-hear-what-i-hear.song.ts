import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDoYouHearWhatIHear = {
  id: "01a0b77a-08cc-7e29-955e-c83d713d9ac8",
  type: "page-type/song",
  slug: "paul-cardall-do-you-hear-what-i-hear",
  title: "Do You Hear What I Hear?",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
