import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationDulaman = {
  id: "01a0abea-5561-7f0c-8cb2-cc514a1428f9",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-dulaman",
  ownLength: 3.1251,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "25OHOO9KhiBkz5OIKSousc",
      externalLink: "https://open.spotify.com/track/25OHOO9KhiBkz5OIKSousc",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Dúlaman",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "dulaman|6NWtt9pNOL2Gx7kBykdE5x|187506",
  song: "song/celtic-woman-dulaman",
} as const satisfies Track
