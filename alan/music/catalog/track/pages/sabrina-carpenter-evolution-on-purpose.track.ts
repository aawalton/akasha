import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionOnPurpose = {
  id: "01a0b111-270f-7d43-8259-f335227cfb85",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-on-purpose",
  ownLength: 3.9688833333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Xmjr9Cft2ZdiGVZPxhqCs",
      externalLink: "https://open.spotify.com/track/1Xmjr9Cft2ZdiGVZPxhqCs",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "On Purpose",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "onpurpose|74KM79TiuVKeVCqs8QtB0B|238133",
} as const satisfies Track
