import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynAlreadyHadIt = {
  id: "01a0676a-d716-7034-96ae-ed83d4959d81",
  type: "page-type/release",
  slug: "chaislyn-already-had-it",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2022-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "270DEDp8yhMJI4lI1heuQg",
      externalLink: "https://open.spotify.com/album/270DEDp8yhMJI4lI1heuQg",
    },
  ],
  title: "Already Had It",
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
