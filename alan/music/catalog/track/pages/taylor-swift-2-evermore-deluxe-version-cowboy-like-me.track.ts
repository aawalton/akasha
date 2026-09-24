import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionCowboyLikeMe = {
  id: "01a0ce86-5ff5-7498-a6c1-bb83456a3fc7",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-cowboy-like-me",
  ownLength: 4.584,
  ownProgress: 4.584,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "cowboy like me",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "cowboylikeme|06HL4z0CvFAxyc27GXpf02|275040",
  song: "song/taylor-swift-cowboy-like-me",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 11,
      externalId: "1XjHRolIXL2M1EEOUsGGR4",
      externalLink: "https://open.spotify.com/track/1XjHRolIXL2M1EEOUsGGR4",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 11,
      externalId: "52OkpDsU6MmPx1AwGOb6Ap",
      externalLink: "https://open.spotify.com/track/52OkpDsU6MmPx1AwGOb6Ap",
    },
  ],
} as const satisfies Track
