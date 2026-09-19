import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGodPutASmileUponYourFaceMurder = {
  id: "01a0b9ef-00c3-7aef-8a61-17b452ca3ec4",
  type: "page-type/track",
  slug: "coldplay-god-put-a-smile-upon-your-face-murder",
  ownLength: 5.581316666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-god-put-a-smile-upon-your-face"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6FNYoIM6xtaH1mBlLwDMvM",
      externalLink: "https://open.spotify.com/track/6FNYoIM6xtaH1mBlLwDMvM",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Murder",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "murder|4gzpq5DPGxSnKTe4SA8HAU|334879",
  song: "song/coldplay-murder",
} as const satisfies Track
