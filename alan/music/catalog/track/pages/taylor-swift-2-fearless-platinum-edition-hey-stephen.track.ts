import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionHeyStephen = {
  id: "01a0ce86-9288-708c-90cf-37bf0ee28b7b",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-hey-stephen",
  ownLength: 4.238666666666667,
  ownProgress: 4.238666666666667,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hey Stephen",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "heystephen|06HL4z0CvFAxyc27GXpf02|254320",
  song: "song/taylor-swift-hey-stephen",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 10,
      externalId: "6wcFdMmiDscAhZJrcVFumx",
      externalLink: "https://open.spotify.com/track/6wcFdMmiDscAhZJrcVFumx",
    },
  ],
} as const satisfies Track
