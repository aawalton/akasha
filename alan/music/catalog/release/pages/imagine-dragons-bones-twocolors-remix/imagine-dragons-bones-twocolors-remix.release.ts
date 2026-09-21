import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsBonesTwocolorsRemix = {
  id: "01a0676a-d719-7021-84dc-1456fd572628",
  type: "page-type/release",
  slug: "imagine-dragons-bones-twocolors-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2022-10-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6idPk4yzvCbpdkpNVJU1AE",
      externalLink: "https://open.spotify.com/album/6idPk4yzvCbpdkpNVJU1AE",
    },
  ],
  title: "Bones (twocolors Remix)",
} as const satisfies Release
