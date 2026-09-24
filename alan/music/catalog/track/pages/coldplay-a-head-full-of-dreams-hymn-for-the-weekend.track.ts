import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsHymnForTheWeekend = {
  id: "01a0b9ee-d54b-7d40-935b-fce2337eb206",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-hymn-for-the-weekend",
  ownLength: 4.304433333333333,
  ownProgress: 4.304433333333333,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hymn for the Weekend",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "hymnfortheweekend|4gzpq5DPGxSnKTe4SA8HAU|258266",
  song: "song/coldplay-hymn-for-the-weekend",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 3,
      externalId: "3RiPr603aXAoi4GHyXx0uy",
      externalLink: "https://open.spotify.com/track/3RiPr603aXAoi4GHyXx0uy",
    },
  ],
} as const satisfies Track
