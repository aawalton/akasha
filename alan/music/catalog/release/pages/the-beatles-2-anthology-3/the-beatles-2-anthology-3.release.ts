import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2Anthology3 = {
  id: "01a0676a-d717-7023-9e1f-14d5bd75956a",
  type: "page-type/release",
  slug: "the-beatles-2-anthology-3",
  title: "Anthology 3",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 145.631483,
  ownProgress: 145.631483,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1996-10-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0LFwMJaC6foCQJDl5bXuNQ",
      externalLink: "https://open.spotify.com/album/0LFwMJaC6foCQJDl5bXuNQ",
    },
  ],
} as const satisfies Release
