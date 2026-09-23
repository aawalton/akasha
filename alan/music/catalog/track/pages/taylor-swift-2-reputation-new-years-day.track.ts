import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationNewYearsDay = {
  id: "01a0ce86-74d7-777f-87ee-85595abce98e",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-new-years-day",
  ownLength: 3.9244333333333334,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "not-started",
  unit: "unit/minutes",
  title: "New Year’s Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "newyearsday|06HL4z0CvFAxyc27GXpf02|235466",
  song: "song/taylor-swift-new-year-s-day",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 15,
      externalId: "7F5oktn5YOsR9eR5YsFtqb",
      externalLink: "https://open.spotify.com/track/7F5oktn5YOsR9eR5YsFtqb",
    },
  ],
} as const satisfies Track
