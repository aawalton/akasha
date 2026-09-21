import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2NewMoonShine = {
  id: "01a0676a-d725-7053-9897-265304e78727",
  type: "page-type/release",
  slug: "james-taylor-2-new-moon-shine",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1991-08-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "36DBvvp7XO5oSulZANyCIM",
      externalLink: "https://open.spotify.com/album/36DBvvp7XO5oSulZANyCIM",
    },
  ],
  title: "New Moon Shine",
} as const satisfies Release
