import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaJusticeJustice = {
  id: "01a0aa7a-83d3-7c47-8150-188e6c4d87fc",
  type: "page-type/track",
  slug: "alexandria-justice-justice",
  ownLength: 3.2228833333333333,
  ownProgress: 3.2228833333333333,
  partOfCollections: ["release/alexandria-justice"],
  status: "completed",
  unit: "unit/minutes",
  title: "Justice",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alexandria" }],
  trackKey: "justice|0SQG4wPVUlfbmbGQfqB47y|193373",
  song: "song/alexandria-justice",
  carriedBy: [
    {
      release: "release/alexandria-justice",
      discNumber: 1,
      position: 1,
      externalId: "0isMBNGbFrpvGhStVQLWJK",
      externalLink: "https://open.spotify.com/track/0isMBNGbFrpvGhStVQLWJK",
    },
  ],
} as const satisfies Track
