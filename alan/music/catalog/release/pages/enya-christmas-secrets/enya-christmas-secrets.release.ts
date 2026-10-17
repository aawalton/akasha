import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaChristmasSecrets = {
  id: "01a0676a-d71a-7040-aba7-b1a9a97f514b",
  type: "page-type/release",
  slug: "enya-christmas-secrets",
  title: "Christmas Secrets",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-12-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fsLmnHfFDrssEdhLMyaML",
      externalLink: "https://open.spotify.com/album/2fsLmnHfFDrssEdhLMyaML",
    },
  ],
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
