import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioCatalystSomeday = {
  id: "01a0c622-22c7-74f1-8c28-81a65bfe1f80",
  type: "page-type/track",
  slug: "jessica-baio-catalyst-someday",
  ownLength: 2.762766666666667,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-catalyst", "release/jessica-baio-someday"],
  status: "not-started",
  unit: "unit/minutes",
  title: "someday",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "someday|0VMFTqmv0hYlWruyBERT95|165766",
  song: "song/jessica-baio-someday",
  carriedBy: [
    {
      release: "release/jessica-baio-catalyst",
      discNumber: 1,
      position: 7,
      externalId: "5XdT3irI7pkdvm1GEqNZqW",
      externalLink: "https://open.spotify.com/track/5XdT3irI7pkdvm1GEqNZqW",
    },
    {
      release: "release/jessica-baio-someday",
      discNumber: 1,
      position: 1,
      externalId: "62yLoxWqdIY1a8XbFzqVPq",
      externalLink: "https://open.spotify.com/track/62yLoxWqdIY1a8XbFzqVPq",
    },
  ],
} as const satisfies Track
