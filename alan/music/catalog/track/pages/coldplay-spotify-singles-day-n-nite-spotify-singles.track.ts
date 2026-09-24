import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySpotifySinglesDayNNiteSpotifySingles = {
  id: "01a0b9ee-ee12-7054-9ccf-f082d28402f8",
  type: "page-type/track",
  slug: "coldplay-spotify-singles-day-n-nite-spotify-singles",
  ownLength: 4.3143666666666665,
  ownProgress: 4.3143666666666665,
  partOfCollections: ["release/coldplay-spotify-singles"],
  status: "completed",
  unit: "unit/minutes",
  title: "Day ‘n’ Nite - Spotify Singles",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "daynnitespotifysingles|4gzpq5DPGxSnKTe4SA8HAU|258862",
  song: "song/coldplay-day-n-nite-spotify-singles",
  carriedBy: [
    {
      release: "release/coldplay-spotify-singles",
      discNumber: 1,
      position: 2,
      externalId: "6M0tj2hONdMEveSWg3JdQG",
      externalLink: "https://open.spotify.com/track/6M0tj2hONdMEveSWg3JdQG",
    },
  ],
} as const satisfies Track
