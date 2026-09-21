import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishThereforeIAm = {
  id: "01a0676a-d72e-7024-b4cc-342650686d7a",
  type: "page-type/release",
  slug: "billie-eilish-therefore-i-am",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2020-11-12",
  grade: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5G58VVE9ub1KE01Mvbd8XM",
      externalLink: "https://open.spotify.com/album/5G58VVE9ub1KE01Mvbd8XM",
    },
  ],
  title: "Therefore I Am",
} as const satisfies Release
