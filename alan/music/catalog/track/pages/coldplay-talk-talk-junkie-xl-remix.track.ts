import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalkTalkJunkieXlRemix = {
  id: "01a0b9ee-fdc5-7aeb-8444-d189f05c2b54",
  type: "page-type/track",
  slug: "coldplay-talk-talk-junkie-xl-remix",
  ownLength: 11.714433333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-talk"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5IBwC8rJQd8BdrQyW4KgNN",
      externalLink: "https://open.spotify.com/track/5IBwC8rJQd8BdrQyW4KgNN",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Talk - Junkie XL Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "talkjunkiexlremix|4gzpq5DPGxSnKTe4SA8HAU|702866",
} as const satisfies Track
