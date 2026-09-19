import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLetSomebodyGoSpotifySingles = {
  id: "01a0ba65-5c15-7b45-a585-169b14e79e8e",
  type: "page-type/song",
  slug: "coldplay-let-somebody-go-spotify-singles",
  title: "Let Somebody Go - Spotify Singles",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
