import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterFeatherSpotifySingles = {
  id: "01a0b77e-e4aa-77b6-b556-388e41420772",
  type: "page-type/song",
  slug: "sabrina-carpenter-feather-spotify-singles",
  title: "Feather - Spotify Singles",
  artist: "artist/sabrina-carpenter",
  performed: true,
} as const satisfies Song
