import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSpotifySinglesFeatherSpotifySingles = {
  id: "01a0b111-2d6f-759a-8f19-90c3a108f5a3",
  type: "page-type/track",
  slug: "sabrina-carpenter-spotify-singles-feather-spotify-singles",
  ownLength: 3.090866666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-spotify-singles"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2l6lCBL8egSBfL4ih4KtKk",
      externalLink: "https://open.spotify.com/track/2l6lCBL8egSBfL4ih4KtKk",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Feather - Spotify Singles",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "featherspotifysingles|74KM79TiuVKeVCqs8QtB0B|185452",
} as const satisfies Track
