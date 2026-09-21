import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalkTalkJunkieXlRemix = {
  id: "01a0b9ee-fdc5-7aeb-8444-d189f05c2b54",
  type: "page-type/track",
  slug: "coldplay-talk-talk-junkie-xl-remix",
  ownLength: 11.714433333333334,
  ownProgress: 11.714433333333334,
  partOfCollections: ["release/coldplay-talk"],
  status: "completed",
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
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "talkjunkiexlremix|4gzpq5DPGxSnKTe4SA8HAU|702866",
  song: "song/coldplay-talk",
  carriedBy: [
    {
      release: "release/coldplay-talk",
      discNumber: 1,
      position: 1,
      externalId: "5IBwC8rJQd8BdrQyW4KgNN",
      externalLink: "https://open.spotify.com/track/5IBwC8rJQd8BdrQyW4KgNN",
    },
  ],
} as const satisfies Track
