import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyIHateItHere = {
  id: "01a0ce86-3b42-7e55-8a08-64a334270a5c",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-i-hate-it-here",
  ownLength: 4.064583333333333,
  ownProgress: 4.064583333333333,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Hate It Here",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "ihateithere|06HL4z0CvFAxyc27GXpf02|243875",
  song: "song/taylor-swift-i-hate-it-here",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 23,
      externalId: "3hlGuz3loYoLfI3bpwieWq",
      externalLink: "https://open.spotify.com/track/3hlGuz3loYoLfI3bpwieWq",
    },
  ],
} as const satisfies Track
