import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixChristmasIsHere = {
  id: "01a0676a-d71a-703b-b3c9-80b24bba18e2",
  type: "page-type/release",
  slug: "pentatonix-christmas-is-here",
  title: "Christmas Is Here!",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 32.616566666666664,
  ownProgress: 32.616617,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-10-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6thZNGX8hUVSjUrqJgPB9b",
      externalLink: "https://open.spotify.com/album/6thZNGX8hUVSjUrqJgPB9b",
    },
  ],
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Release
