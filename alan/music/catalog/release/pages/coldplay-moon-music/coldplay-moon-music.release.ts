import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMoonMusic = {
  id: "01a0676a-d724-7083-9182-7c7488cf7bbf",
  type: "page-type/release",
  slug: "coldplay-moon-music",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2024-10-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5SGtrmYbIo0Dsg4kJ4qjM6",
      externalLink: "https://open.spotify.com/album/5SGtrmYbIo0Dsg4kJ4qjM6",
    },
  ],
  title: "Moon Music",
} as const satisfies Release
