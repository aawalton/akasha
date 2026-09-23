import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionGoldRush = {
  id: "01a0ce86-5ea8-722b-9bad-4679e616d57c",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-gold-rush",
  ownLength: 3.0886666666666667,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "gold rush",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "goldrush|06HL4z0CvFAxyc27GXpf02|185320",
  song: "song/taylor-swift-gold-rush",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 3,
      externalId: "5BK0uqwY9DNfZ630STAEaq",
      externalLink: "https://open.spotify.com/track/5BK0uqwY9DNfZ630STAEaq",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 3,
      externalId: "3Dby3p1m6IOZn2gIIqECgK",
      externalLink: "https://open.spotify.com/track/3Dby3p1m6IOZn2gIIqECgK",
    },
  ],
} as const satisfies Track
