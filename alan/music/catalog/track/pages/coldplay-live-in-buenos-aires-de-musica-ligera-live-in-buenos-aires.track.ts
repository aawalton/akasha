import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresDeMusicaLigeraLiveInBuenosAires = {
  id: "01a0b9ee-d3c8-7738-85db-dff3bc9d791d",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-de-musica-ligera-live-in-buenos-aires",
  ownLength: 6.1551,
  ownProgress: 6.1551,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "De Música Ligera - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "demusicaligeraliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|369306",
  song: "song/coldplay-de-musica-ligera",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 17,
      externalId: "1aQKPnGNa5vK7aA6lTm4JS",
      externalLink: "https://open.spotify.com/track/1aQKPnGNa5vK7aA6lTm4JS",
    },
  ],
} as const satisfies Track
