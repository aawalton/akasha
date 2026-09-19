import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsHymnForTheWeekend = {
  id: "01a0b9ee-d54b-7d40-935b-fce2337eb206",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-hymn-for-the-weekend",
  ownLength: 4.304433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3RiPr603aXAoi4GHyXx0uy",
      externalLink: "https://open.spotify.com/track/3RiPr603aXAoi4GHyXx0uy",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hymn for the Weekend",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "hymnfortheweekend|4gzpq5DPGxSnKTe4SA8HAU|258266",
  song: "song/coldplay-hymn-for-the-weekend",
} as const satisfies Track
