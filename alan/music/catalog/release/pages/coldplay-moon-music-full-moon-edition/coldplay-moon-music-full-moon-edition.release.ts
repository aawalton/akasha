import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMoonMusicFullMoonEdition = {
  id: "01a0676a-d724-7084-a614-141103c61ffb",
  type: "page-type/release",
  slug: "coldplay-moon-music-full-moon-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2024-10-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1PdMoahMiMnqWfzWZs3xSI",
      externalLink: "https://open.spotify.com/album/1PdMoahMiMnqWfzWZs3xSI",
    },
  ],
  title: "Moon Music (Full Moon Edition)",
} as const satisfies Release
