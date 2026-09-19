import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorRockNRollIsMusicNow = {
  id: "01a0b779-820a-7a04-af2b-232b06f7ab9b",
  type: "page-type/song",
  slug: "james-taylor-rock-n-roll-is-music-now",
  title: "Rock 'n' Roll Is Music Now",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
