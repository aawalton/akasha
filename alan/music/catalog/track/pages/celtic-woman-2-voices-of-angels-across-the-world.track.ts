import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2VoicesOfAngelsAcrossTheWorld = {
  id: "01a0abea-60f8-7920-bb73-8f0458863836",
  type: "page-type/track",
  slug: "celtic-woman-2-voices-of-angels-across-the-world",
  ownLength: 3.58955,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-voices-of-angels"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3MB57zlaE9q7rUvyew2Dcc",
      externalLink: "https://open.spotify.com/track/3MB57zlaE9q7rUvyew2Dcc",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Across The World",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "acrosstheworld|6NWtt9pNOL2Gx7kBykdE5x|215373",
  song: "song/celtic-woman-across-the-world",
} as const satisfies Track
