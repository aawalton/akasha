import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyTheSmallestManWhoEverLived = {
  id: "01a0ce86-3e92-7251-8ccd-c2f83464afda",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-the-smallest-man-who-ever-lived",
  ownLength: 4.09235,
  ownProgress: 4.09235,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Smallest Man Who Ever Lived",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "thesmallestmanwhoeverlived|06HL4z0CvFAxyc27GXpf02|245541",
  song: "song/taylor-swift-the-smallest-man-who-ever-lived",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 14,
      externalId: "2v1ivOOsgn64g5OywuH55L",
      externalLink: "https://open.spotify.com/track/2v1ivOOsgn64g5OywuH55L",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 14,
      externalId: "1xtw1krCR6Dw2KwkXw5z63",
      externalLink: "https://open.spotify.com/track/1xtw1krCR6Dw2KwkXw5z63",
    },
  ],
} as const satisfies Track
