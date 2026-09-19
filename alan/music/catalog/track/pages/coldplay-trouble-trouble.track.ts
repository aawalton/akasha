import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTroubleTrouble = {
  id: "01a0b9ef-0318-7e04-9f6c-2c18c1d438a4",
  type: "page-type/track",
  slug: "coldplay-trouble-trouble",
  ownLength: 4.5571,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-trouble"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7KCYwV1RiwbRnWN7ofzkNL",
      externalLink: "https://open.spotify.com/track/7KCYwV1RiwbRnWN7ofzkNL",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Trouble",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "trouble|4gzpq5DPGxSnKTe4SA8HAU|273426",
  song: "song/coldplay-trouble",
} as const satisfies Track
