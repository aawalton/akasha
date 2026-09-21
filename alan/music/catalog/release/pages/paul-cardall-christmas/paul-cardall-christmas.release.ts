import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallChristmas = {
  id: "01a0676a-d71a-7032-b30b-2d28b1096a81",
  type: "page-type/release",
  slug: "paul-cardall-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2018-11-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4wgqzyCxFkxl6Wo1HpackI",
      externalLink: "https://open.spotify.com/album/4wgqzyCxFkxl6Wo1HpackI",
    },
  ],
  title: "Christmas",
} as const satisfies Release
