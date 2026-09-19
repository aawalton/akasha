import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeJasonsSongGaveItAway = {
  id: "01a0b76f-dc27-79f6-9917-7e5166bdc259",
  type: "page-type/song",
  slug: "ariana-grande-jasons-song-gave-it-away",
  title: "Jason's Song (Gave It Away)",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
