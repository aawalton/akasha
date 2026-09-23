import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionTisTheDamnSeason = {
  id: "01a0ce86-5ed1-7e92-aaf3-d265385d0906",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-tis-the-damn-season",
  ownLength: 3.8306666666666667,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "‘tis the damn season",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "tisthedamnseason|06HL4z0CvFAxyc27GXpf02|229840",
  song: "song/taylor-swift-tis-the-damn-season",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 4,
      externalId: "7dW84mWkdWE5a6lFWxJCBG",
      externalLink: "https://open.spotify.com/track/7dW84mWkdWE5a6lFWxJCBG",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 4,
      externalId: "6sQckd3Z8NPxVVKUnavY1F",
      externalLink: "https://open.spotify.com/track/6sQckd3Z8NPxVVKUnavY1F",
    },
  ],
} as const satisfies Track
