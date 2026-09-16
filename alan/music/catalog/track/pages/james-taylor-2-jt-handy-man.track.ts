import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtHandyMan = {
  id: "01a0abeb-468e-7ecc-ab6b-bc23793b98ee",
  type: "page-type/track",
  slug: "james-taylor-2-jt-handy-man",
  ownLength: 3.3074166666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70aUjWZmd9F3bRSsR4DwAJ",
      externalLink: "https://open.spotify.com/track/70aUjWZmd9F3bRSsR4DwAJ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Handy Man",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "handyman|0vn7UBvSQECKJm2817Yf1P|198445",
} as const satisfies Track
