import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraComeCloser = {
  id: "01a0676a-d71b-7016-9c17-86b944e70f25",
  type: "page-type/release",
  slug: "aurora-come-closer",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64FOGaSyhQfEBe8qJa8uBe",
      externalLink: "https://open.spotify.com/album/64FOGaSyhQfEBe8qJa8uBe",
      lastSyncedAt: "2026-10-23",
    },
  ],
  title: "COME CLOSER",
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-23T14:00:50.423Z",
} as const satisfies Release
