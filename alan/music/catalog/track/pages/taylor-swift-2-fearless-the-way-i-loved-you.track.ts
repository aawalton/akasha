import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessTheWayILovedYou = {
  id: "01a0ce86-9076-77ac-9a04-5c5b0773b97f",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-the-way-i-loved-you",
  ownLength: 4.070433333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Way I Loved You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thewayilovedyou|06HL4z0CvFAxyc27GXpf02|244226",
  song: "song/taylor-swift-the-way-i-loved-you",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 10,
      externalId: "5P4wWhUYWM0IaVYLuZxdar",
      externalLink: "https://open.spotify.com/track/5P4wWhUYWM0IaVYLuZxdar",
    },
  ],
} as const satisfies Track
