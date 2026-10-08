import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2RevolverRemastered = {
  id: "01a0676a-d727-7074-8382-41ed62439475",
  type: "page-type/release",
  slug: "the-beatles-2-revolver-remastered",
  title: "Revolver (Remastered)",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 34.765933,
  ownProgress: 34.765933,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1966-08-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3PRoXYsngSwjEQWR5PsHWR",
      externalLink: "https://open.spotify.com/album/3PRoXYsngSwjEQWR5PsHWR",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-15T16:39:47.000Z",
} as const satisfies Release
