import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessTellMeWhy = {
  id: "01a0ce86-9027-724a-83ef-e8b3f3c2fd96",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-tell-me-why",
  ownLength: 3.342433333333333,
  ownProgress: 3.342433333333333,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tell Me Why",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "tellmewhy|06HL4z0CvFAxyc27GXpf02|200546",
  song: "song/taylor-swift-tell-me-why",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 8,
      externalId: "3rnI1UCyGJvUTVvT97VQr5",
      externalLink: "https://open.spotify.com/track/3rnI1UCyGJvUTVvT97VQr5",
    },
  ],
} as const satisfies Track
