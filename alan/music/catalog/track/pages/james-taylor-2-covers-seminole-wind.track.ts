import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversSeminoleWind = {
  id: "01a0abeb-344b-7dc6-8395-94807fe9427a",
  type: "page-type/track",
  slug: "james-taylor-2-covers-seminole-wind",
  ownLength: 4.834433333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0uI444jTIkIFECHgc5LAEY",
      externalLink: "https://open.spotify.com/track/0uI444jTIkIFECHgc5LAEY",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Seminole Wind",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "seminolewind|0vn7UBvSQECKJm2817Yf1P|290066",
} as const satisfies Track
