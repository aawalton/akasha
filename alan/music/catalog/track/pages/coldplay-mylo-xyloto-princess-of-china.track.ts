import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoPrincessOfChina = {
  id: "01a0b9ee-dd7b-73a0-ac5e-cd497376fd44",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-princess-of-china",
  ownLength: 3.9869166666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4HXOBjwv2RnLpGG4xWOO6N",
      externalLink: "https://open.spotify.com/track/4HXOBjwv2RnLpGG4xWOO6N",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Princess of China",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "5pKCCKE2ajJHZ9KAiaK11H", artistName: "Rihanna" },
  ],
  trackKey: "princessofchina|4gzpq5DPGxSnKTe4SA8HAU,5pKCCKE2ajJHZ9KAiaK11H|239215",
  song: "song/coldplay-princess-of-china",
} as const satisfies Track
