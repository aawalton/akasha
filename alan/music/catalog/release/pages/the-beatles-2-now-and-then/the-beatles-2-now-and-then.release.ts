import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2NowAndThen = {
  id: "01a0676a-d726-7001-a99f-74b2b670f644",
  type: "page-type/release",
  slug: "the-beatles-2-now-and-then",
  title: "Now And Then",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 6.52665,
  ownProgress: 6.52665,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-11-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2qQP2NgOoH6HqknnbpJmIk",
      externalLink: "https://open.spotify.com/album/2qQP2NgOoH6HqknnbpJmIk",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-15T16:39:47.000Z",
} as const satisfies Release
