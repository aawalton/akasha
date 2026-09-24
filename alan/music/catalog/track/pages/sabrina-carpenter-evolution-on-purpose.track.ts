import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionOnPurpose = {
  id: "01a0b111-270f-7d43-8259-f335227cfb85",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-on-purpose",
  ownLength: 3.9688833333333333,
  ownProgress: 3.9688833333333333,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  status: "completed",
  unit: "unit/minutes",
  title: "On Purpose",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "onpurpose|74KM79TiuVKeVCqs8QtB0B|238133",
  song: "song/sabrina-carpenter-on-purpose",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-evolution",
      discNumber: 1,
      position: 1,
      externalId: "1Xmjr9Cft2ZdiGVZPxhqCs",
      externalLink: "https://open.spotify.com/track/1Xmjr9Cft2ZdiGVZPxhqCs",
    },
  ],
} as const satisfies Track
