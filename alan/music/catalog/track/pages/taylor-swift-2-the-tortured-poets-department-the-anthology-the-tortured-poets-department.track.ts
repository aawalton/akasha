import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyTheTorturedPoetsDepartment = {
  id: "01a0ce86-3cb8-7ef2-86de-cf399a289833",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-the-tortured-poets-department",
  ownLength: 4.884133333333334,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Tortured Poets Department",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thetorturedpoetsdepartment|06HL4z0CvFAxyc27GXpf02|293048",
  song: "song/taylor-swift-the-tortured-poets-department",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 2,
      externalId: "3NMrVbIVWT3fPXBj0rNDKG",
      externalLink: "https://open.spotify.com/track/3NMrVbIVWT3fPXBj0rNDKG",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 2,
      externalId: "4PdLaGZubp4lghChqp8erB",
      externalLink: "https://open.spotify.com/track/4PdLaGZubp4lghChqp8erB",
    },
  ],
} as const satisfies Track
