import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallReturnHomeSoloPianoVersion = {
  id: "01a0676a-d727-7072-964a-52fc862427b4",
  type: "page-type/release",
  slug: "paul-cardall-return-home-solo-piano-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2024-09-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6YXk3jMGG67SnaUA2tvX2C",
      externalLink: "https://open.spotify.com/album/6YXk3jMGG67SnaUA2tvX2C",
    },
  ],
  title: "Return Home (Solo Piano Version)",
} as const satisfies Release
