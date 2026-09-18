import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallChasingCrowns = {
  id: "01a0b4c8-2066-70e7-a548-5761647a82cd",
  type: "page-type/release",
  slug: "paul-cardall-chasing-crowns",
  ownLength: 68.94476666666667,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2026-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6kp7X91jJsh1IZyyQLmDaI",
      externalLink: "https://open.spotify.com/album/6kp7X91jJsh1IZyyQLmDaI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Chasing Crowns",
} as const satisfies Release
