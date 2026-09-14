import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const theBeatles2NowAndThen = {
  id: "01a0676a-d726-7001-a99f-74b2b670f644",
  type: "release",
  slug: "the-beatles-2-now-and-then",
  title: "Now And Then",
  partOfCollections: ["the-beatles"],
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
} as const satisfies Release
