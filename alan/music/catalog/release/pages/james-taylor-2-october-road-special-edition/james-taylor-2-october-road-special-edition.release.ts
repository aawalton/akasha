import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEdition = {
  id: "01a0676a-d726-7017-ba5b-a1740eadec17",
  type: "page-type/release",
  slug: "james-taylor-2-october-road-special-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "2000-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3RHJNmuwD0fnwccBv2HTif",
      externalLink: "https://open.spotify.com/album/3RHJNmuwD0fnwccBv2HTif",
    },
  ],
  title: "October Road (Special Edition)",
} as const satisfies Release
