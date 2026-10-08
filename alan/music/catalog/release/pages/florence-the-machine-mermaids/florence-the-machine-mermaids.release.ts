import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineMermaids = {
  id: "01a0676a-d724-704e-8f7f-3d6db873455d",
  type: "page-type/release",
  slug: "florence-the-machine-mermaids",
  title: "Mermaids",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 4.58865,
  ownProgress: 4.58865,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-04-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28DpATUm863aldgGwPIkQt",
      externalLink: "https://open.spotify.com/album/28DpATUm863aldgGwPIkQt",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-15T16:35:36.000Z",
} as const satisfies Release
