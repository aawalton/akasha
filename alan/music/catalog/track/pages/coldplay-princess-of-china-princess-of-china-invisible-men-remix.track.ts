import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayPrincessOfChinaPrincessOfChinaInvisibleMenRemix = {
  id: "01a0b9ee-f840-7e71-9d1b-dfd94fbe3e28",
  type: "page-type/track",
  slug: "coldplay-princess-of-china-princess-of-china-invisible-men-remix",
  ownLength: 3.7771,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-princess-of-china"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2f3XEVeU7g6vZgK2BmyIg8",
      externalLink: "https://open.spotify.com/track/2f3XEVeU7g6vZgK2BmyIg8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Princess of China - Invisible Men Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "5pKCCKE2ajJHZ9KAiaK11H", artistName: "Rihanna" },
  ],
  trackKey: "princessofchinainvisiblemenremix|4gzpq5DPGxSnKTe4SA8HAU,5pKCCKE2ajJHZ9KAiaK11H|226626",
  song: "song/coldplay-princess-of-china",
} as const satisfies Track
