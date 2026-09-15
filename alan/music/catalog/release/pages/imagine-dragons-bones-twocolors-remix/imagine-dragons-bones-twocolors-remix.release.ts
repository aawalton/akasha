import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsBonesTwocolorsRemix = {
  id: "01a0676a-d719-7021-84dc-1456fd572628",
  type: "page-type/release",
  slug: "imagine-dragons-bones-twocolors-remix",
  title: "Bones (twocolors Remix)",
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  ownLength: 4.2682,
  ownProgress: 4.2682,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-10-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6idPk4yzvCbpdkpNVJU1AE",
      externalLink: "https://open.spotify.com/album/6idPk4yzvCbpdkpNVJU1AE",
    },
  ],
} as const satisfies Release
