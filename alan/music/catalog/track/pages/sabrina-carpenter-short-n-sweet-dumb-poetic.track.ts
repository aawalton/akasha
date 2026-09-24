import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDumbPoetic = {
  id: "01a0b111-206b-74d8-8c2e-afe5e1ed4580",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-dumb-poetic",
  ownLength: 2.2246333333333332,
  ownProgress: 2.2246333333333332,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dumb & Poetic",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "dumbpoetic|74KM79TiuVKeVCqs8QtB0B|133478",
  song: "song/sabrina-carpenter-dumb-poetic",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet",
      discNumber: 1,
      position: 8,
      externalId: "5VhvD0AKRprEaFtPNKGBQR",
      externalLink: "https://open.spotify.com/track/5VhvD0AKRprEaFtPNKGBQR",
    },
  ],
} as const satisfies Track
