import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayPrincessOfChinaPrincessOfChinaRadioEdit = {
  id: "01a0b9ee-f81b-7f83-bfae-da4dfd92c987",
  type: "page-type/track",
  slug: "coldplay-princess-of-china-princess-of-china-radio-edit",
  ownLength: 3.62625,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-princess-of-china"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6XJ2PVp2Vs9G2j5B2Cbbnb",
      externalLink: "https://open.spotify.com/track/6XJ2PVp2Vs9G2j5B2Cbbnb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Princess of China - Radio Edit",
  trackType: "version",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "5pKCCKE2ajJHZ9KAiaK11H", artistName: "Rihanna" },
  ],
  trackKey: "princessofchinaradioedit|4gzpq5DPGxSnKTe4SA8HAU,5pKCCKE2ajJHZ9KAiaK11H|217575",
  song: "song/coldplay-princess-of-china",
} as const satisfies Track
