import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtTerraNova = {
  id: "01a0abeb-46e1-79a6-a9cf-0803ee93ff35",
  type: "page-type/track",
  slug: "james-taylor-2-jt-terra-nova",
  ownLength: 4.540016666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6vZBA5RNdiNWC92Zuo59y9",
      externalLink: "https://open.spotify.com/track/6vZBA5RNdiNWC92Zuo59y9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Terra Nova",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "terranova|0vn7UBvSQECKJm2817Yf1P|272401",
} as const satisfies Track
