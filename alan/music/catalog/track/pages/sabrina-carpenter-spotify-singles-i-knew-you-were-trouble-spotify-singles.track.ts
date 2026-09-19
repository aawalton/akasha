import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSpotifySinglesIKnewYouWereTroubleSpotifySingles = {
  id: "01a0b111-2d52-7eba-83f5-96c8ac63a02f",
  type: "page-type/track",
  slug: "sabrina-carpenter-spotify-singles-i-knew-you-were-trouble-spotify-singles",
  ownLength: 3.8936166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-spotify-singles"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30QYxvXOJZhGBF6DvpNb8w",
      externalLink: "https://open.spotify.com/track/30QYxvXOJZhGBF6DvpNb8w",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Knew You Were Trouble - Spotify Singles",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "iknewyouweretroublespotifysingles|74KM79TiuVKeVCqs8QtB0B|233617",
  song: "song/sabrina-carpenter-i-knew-you-were-trouble-spotify-singles",
} as const satisfies Track
