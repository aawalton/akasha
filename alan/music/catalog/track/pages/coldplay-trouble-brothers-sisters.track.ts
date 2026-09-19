import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTroubleBrothersSisters = {
  id: "01a0b9ef-0344-7741-b03b-aaabf2f79cf9",
  type: "page-type/track",
  slug: "coldplay-trouble-brothers-sisters",
  ownLength: 4.816666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-trouble"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4E1puwynQif5GJqPEXj35p",
      externalLink: "https://open.spotify.com/track/4E1puwynQif5GJqPEXj35p",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Brothers & Sisters",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "brotherssisters|4gzpq5DPGxSnKTe4SA8HAU|289000",
} as const satisfies Track
