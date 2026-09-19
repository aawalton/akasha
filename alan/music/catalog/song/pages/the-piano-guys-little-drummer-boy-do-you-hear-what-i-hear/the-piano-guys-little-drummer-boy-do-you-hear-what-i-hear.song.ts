import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLittleDrummerBoyDoYouHearWhatIHear = {
  id: "01a0b780-2625-7f0f-b6ea-1b19036d3b48",
  type: "page-type/song",
  slug: "the-piano-guys-little-drummer-boy-do-you-hear-what-i-hear",
  title: "Little Drummer Boy / Do You Hear What I Hear",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
