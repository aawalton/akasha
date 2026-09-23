import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyTheBolter = {
  id: "01a0ce86-3c22-774f-a974-69b2e2f04a85",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-the-bolter",
  ownLength: 3.970683333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Bolter",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thebolter|06HL4z0CvFAxyc27GXpf02|238241",
  song: "song/taylor-swift-the-bolter",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 29,
      externalId: "2913xXOVAIDAqxzV2g4VcU",
      externalLink: "https://open.spotify.com/track/2913xXOVAIDAqxzV2g4VcU",
    },
  ],
} as const satisfies Track
