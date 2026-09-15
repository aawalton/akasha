import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerShermanOaks = {
  id: "01a0676a-d728-7073-aebf-1e272f52073f",
  type: "page-type/release",
  slug: "jada-facer-sherman-oaks",
  title: "Sherman Oaks",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.733333,
  ownProgress: 2.733333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-09-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7M4er7wAPCT4cUAqNVVdTm",
      externalLink: "https://open.spotify.com/album/7M4er7wAPCT4cUAqNVVdTm",
    },
  ],
} as const satisfies Release
