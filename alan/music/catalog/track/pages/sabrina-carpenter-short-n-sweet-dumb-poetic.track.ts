import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDumbPoetic = {
  id: "01a0b111-206b-74d8-8c2e-afe5e1ed4580",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-dumb-poetic",
  ownLength: 2.2246333333333332,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5VhvD0AKRprEaFtPNKGBQR",
      externalLink: "https://open.spotify.com/track/5VhvD0AKRprEaFtPNKGBQR",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Dumb & Poetic",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "dumbpoetic|74KM79TiuVKeVCqs8QtB0B|133478",
  song: "song/sabrina-carpenter-dumb-poetic",
} as const satisfies Track
