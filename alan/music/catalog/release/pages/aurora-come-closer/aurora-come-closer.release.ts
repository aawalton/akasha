import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraComeCloser = {
  id: "01a0676a-d71b-7016-9c17-86b944e70f25",
  type: "page-type/release",
  slug: "aurora-come-closer",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5C40IE0VAEHNZJcpwUxoNY",
      externalLink: "https://open.spotify.com/album/5C40IE0VAEHNZJcpwUxoNY",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "COME CLOSER",
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
