import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const reneeRappTattoos = {
  id: "01a0676a-d72c-7003-ad48-45abbb8f4dc1",
  type: "page-type/release",
  slug: "renee-rapp-tattoos",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/renee-rapp"],
  position: 0,
  publishedAt: "2022-06-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1KFTkdRgqz47SR6F9B1UwJ",
      externalLink: "https://open.spotify.com/album/1KFTkdRgqz47SR6F9B1UwJ",
    },
  ],
  title: "Tattoos",
} as const satisfies Release
