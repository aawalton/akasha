import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyFloridaFeatFlorenceTheMachine = {
  id: "01a0ce86-3daf-7ef0-9e65-5175bf734e12",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-florida-feat-florence-the-machine",
  ownLength: 3.59105,
  ownProgress: 3.59105,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Florida!!! (feat. Florence + The Machine)",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }, { artist: "artist/florence-the-machine" }],
  trackKey: "floridafeatflorencethemachine|06HL4z0CvFAxyc27GXpf02,1moxjboGR7GNWYIMWsRjgG|215463",
  song: "song/taylor-swift-florida",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 8,
      externalId: "3ZVFcD8Wlw9T9klGqmJf9F",
      externalLink: "https://open.spotify.com/track/3ZVFcD8Wlw9T9klGqmJf9F",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 8,
      externalId: "5ExOm0dh4NyRyAdSAO9hyM",
      externalLink: "https://open.spotify.com/track/5ExOm0dh4NyRyAdSAO9hyM",
    },
  ],
} as const satisfies Track
