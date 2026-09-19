import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsBirds = {
  id: "01a0b9ee-d524-7c0a-8783-edc33ba6880a",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-birds",
  ownLength: 3.818216666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3HWDWyIqWuLsTHECx9DvXF",
      externalLink: "https://open.spotify.com/track/3HWDWyIqWuLsTHECx9DvXF",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Birds",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "birds|4gzpq5DPGxSnKTe4SA8HAU|229093",
  song: "song/coldplay-birds",
} as const satisfies Track
