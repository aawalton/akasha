import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaTheFool = {
  id: "01a0aa7a-83fc-79c9-a46d-8ba339e8dbd4",
  type: "page-type/release",
  slug: "alexandria-the-fool",
  ownLength: 2.91935,
  ownProgress: 0,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2026-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0k8RXtTwCrqs9ofCFAUNQX",
      externalLink: "https://open.spotify.com/album/0k8RXtTwCrqs9ofCFAUNQX",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Fool",
} as const satisfies Release
