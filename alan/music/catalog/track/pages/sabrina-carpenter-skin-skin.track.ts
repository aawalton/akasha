import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSkinSkin = {
  id: "01a0b111-2f57-78ef-96fa-19cc5d046357",
  type: "page-type/track",
  slug: "sabrina-carpenter-skin-skin",
  ownLength: 2.9583333333333335,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-skin"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "03B2SfXuvDh1m9F4tqrX07",
      externalLink: "https://open.spotify.com/track/03B2SfXuvDh1m9F4tqrX07",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Skin",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "skin|74KM79TiuVKeVCqs8QtB0B|177500",
  song: "song/sabrina-carpenter-skin",
} as const satisfies Track
