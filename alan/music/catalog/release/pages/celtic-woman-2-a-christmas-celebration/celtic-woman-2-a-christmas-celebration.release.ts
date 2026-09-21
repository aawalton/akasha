import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2AChristmasCelebration = {
  id: "01a0676a-d715-701d-9169-fc690969b1d6",
  type: "page-type/release",
  slug: "celtic-woman-2-a-christmas-celebration",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2006-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1vlF1wVnfDOQ2T12U6WOwv",
      externalLink: "https://open.spotify.com/album/1vlF1wVnfDOQ2T12U6WOwv",
    },
  ],
  title: "A Christmas Celebration",
} as const satisfies Release
