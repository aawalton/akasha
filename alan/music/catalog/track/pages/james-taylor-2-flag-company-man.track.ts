import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagCompanyMan = {
  id: "01a0abeb-447c-7752-a7db-821e41647888",
  type: "page-type/track",
  slug: "james-taylor-2-flag-company-man",
  ownLength: 3.74955,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EaGgLksAtCzApLfPxJjtS",
      externalLink: "https://open.spotify.com/track/7EaGgLksAtCzApLfPxJjtS",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Company Man",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "companyman|0vn7UBvSQECKJm2817Yf1P|224973",
} as const satisfies Track
