import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyButDaddyILoveHim = {
  id: "01a0ce86-3d57-7bf1-8059-12817ca24adf",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-but-daddy-i-love-him",
  ownLength: 5.6738,
  ownProgress: 5.6738,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "But Daddy I Love Him",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "butdaddyilovehim|06HL4z0CvFAxyc27GXpf02|340428",
  song: "song/taylor-swift-but-daddy-i-love-him",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 6,
      externalId: "5og4Qzt92jJzVDkOtSEilb",
      externalLink: "https://open.spotify.com/track/5og4Qzt92jJzVDkOtSEilb",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 6,
      externalId: "4QMgEffJQuKtjCNvqfRZ0m",
      externalLink: "https://open.spotify.com/track/4QMgEffJQuKtjCNvqfRZ0m",
    },
  ],
} as const satisfies Track
