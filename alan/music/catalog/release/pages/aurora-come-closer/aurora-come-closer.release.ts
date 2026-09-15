import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraComeCloser = {
  id: "01a0676a-d71b-7016-9c17-86b944e70f25",
  type: "release",
  slug: "aurora-come-closer",
  title: "COME CLOSER",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 4.474217,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2026-02-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64FOGaSyhQfEBe8qJa8uBe",
      externalLink: "https://open.spotify.com/album/64FOGaSyhQfEBe8qJa8uBe",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Release
