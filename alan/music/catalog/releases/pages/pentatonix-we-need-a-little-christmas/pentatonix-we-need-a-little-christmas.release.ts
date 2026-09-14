import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const pentatonixWeNeedALittleChristmas = {
  id: "01a0676a-d730-7034-99d5-d25c81319d87",
  type: "release",
  slug: "pentatonix-we-need-a-little-christmas",
  title: "We Need A Little Christmas",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 38.564817,
  ownProgress: 38.564817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-11-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "090o9kMZEhvkB5Vw211meV",
      externalLink: "https://open.spotify.com/album/090o9kMZEhvkB5Vw211meV",
    },
  ],
} as const satisfies Release
