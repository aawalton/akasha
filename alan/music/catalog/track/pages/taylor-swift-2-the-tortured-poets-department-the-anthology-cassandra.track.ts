import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyCassandra = {
  id: "01a0ce86-3bd8-7371-bf9d-7afad7ce6745",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-cassandra",
  ownLength: 4.003416666666666,
  ownProgress: 4.003416666666666,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cassandra",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "cassandra|06HL4z0CvFAxyc27GXpf02|240205",
  song: "song/taylor-swift-cassandra",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 27,
      externalId: "0g4fMVo4JjwnIpTfFfLdxS",
      externalLink: "https://open.spotify.com/track/0g4fMVo4JjwnIpTfFfLdxS",
    },
  ],
} as const satisfies Track
