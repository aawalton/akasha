import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYTilKingdomCome = {
  id: "01a0b9ee-e5a5-7a16-84d8-c1cf09212943",
  type: "page-type/track",
  slug: "coldplay-x-y-til-kingdom-come",
  ownLength: 4.1778,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1wQXj5bgxyZQ2XmE2X9s6n",
      externalLink: "https://open.spotify.com/track/1wQXj5bgxyZQ2XmE2X9s6n",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Til Kingdom Come",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "tilkingdomcome|4gzpq5DPGxSnKTe4SA8HAU|250668",
  song: "song/coldplay-til-kingdom-come",
} as const satisfies Track
