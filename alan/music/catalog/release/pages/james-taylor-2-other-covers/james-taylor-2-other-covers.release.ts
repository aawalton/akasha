import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2OtherCovers = {
  id: "01a0676a-d726-704f-9cbe-3505bfa6e6a5",
  type: "page-type/release",
  slug: "james-taylor-2-other-covers",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "2009-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Z1fBIILqsE6xUGUNLQM2r",
      externalLink: "https://open.spotify.com/album/3Z1fBIILqsE6xUGUNLQM2r",
    },
  ],
  title: "Other Covers",
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
