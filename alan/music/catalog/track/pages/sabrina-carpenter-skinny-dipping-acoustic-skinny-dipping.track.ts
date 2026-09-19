import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSkinnyDippingAcousticSkinnyDipping = {
  id: "01a0b111-2eff-7605-a3cf-69368e0ef9d5",
  type: "page-type/track",
  slug: "sabrina-carpenter-skinny-dipping-acoustic-skinny-dipping",
  ownLength: 2.9625,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-skinny-dipping-acoustic"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45OXcucp7vRS6QrFXq2II3",
      externalLink: "https://open.spotify.com/track/45OXcucp7vRS6QrFXq2II3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "skinny dipping",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "skinnydipping|74KM79TiuVKeVCqs8QtB0B|177750",
  song: "song/sabrina-carpenter-skinny-dipping",
} as const satisfies Track
