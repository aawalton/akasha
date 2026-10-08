import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoPrettyGirl = {
  id: "01a0676a-d727-7019-adca-1ed5962f0ead",
  type: "page-type/release",
  slug: "clairo-pretty-girl",
  title: "Pretty Girl",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 2.972533,
  ownProgress: 2.972533,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2017-08-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1c3h074NQBbcLPGNsXwO08",
      externalLink: "https://open.spotify.com/album/1c3h074NQBbcLPGNsXwO08",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
