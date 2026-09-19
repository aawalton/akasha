import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanOneWorld = {
  id: "01a0abea-78a7-740d-ac59-b056cdcb35a2",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-one-world",
  ownLength: 3.7997666666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5X6TRZfx9AE3Bd0M1FZkr8",
      externalLink: "https://open.spotify.com/track/5X6TRZfx9AE3Bd0M1FZkr8",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "One World",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "oneworld|6NWtt9pNOL2Gx7kBykdE5x|227986",
  song: "song/celtic-woman-one-world",
} as const satisfies Track
