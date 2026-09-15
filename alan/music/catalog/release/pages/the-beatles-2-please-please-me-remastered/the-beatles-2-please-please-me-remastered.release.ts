import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2PleasePleaseMeRemastered = {
  id: "01a0676a-d726-7083-8804-2c4e6af74e9d",
  type: "page-type/release",
  slug: "the-beatles-2-please-please-me-remastered",
  title: "Please Please Me (Remastered)",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 32.521933,
  ownProgress: 32.521933,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1963-03-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3KzAvEXcqJKBF97HrXwlgf",
      externalLink: "https://open.spotify.com/album/3KzAvEXcqJKBF97HrXwlgf",
    },
  ],
} as const satisfies Release
