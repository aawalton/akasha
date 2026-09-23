import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyTheBlackDog = {
  id: "01a0ce86-3a69-78d8-8d13-ecc6852dcb53",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-the-black-dog",
  ownLength: 3.98095,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Black Dog",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "theblackdog|06HL4z0CvFAxyc27GXpf02|238857",
  song: "song/taylor-swift-the-black-dog",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 17,
      externalId: "62E2nR0od0M5HYxuYLaDz7",
      externalLink: "https://open.spotify.com/track/62E2nR0od0M5HYxuYLaDz7",
    },
  ],
} as const satisfies Track
