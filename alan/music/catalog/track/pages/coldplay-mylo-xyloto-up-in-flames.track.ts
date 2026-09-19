import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoUpInFlames = {
  id: "01a0b9ee-dda8-7674-b5a1-bfcf90be0a05",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-up-in-flames",
  ownLength: 3.220666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06t6JWrU05BxaKPtct2P2n",
      externalLink: "https://open.spotify.com/track/06t6JWrU05BxaKPtct2P2n",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up in Flames",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "upinflames|4gzpq5DPGxSnKTe4SA8HAU|193240",
  song: "song/coldplay-up-in-flames",
} as const satisfies Track
