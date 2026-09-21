import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const mitskiLush = {
  id: "01a0676a-d724-701a-b3a0-fdeead56bcc0",
  type: "page-type/release",
  slug: "mitski-lush",
  title: "Lush",
  partOfCollections: ["artist/mitski"],
  position: 0,
  ownLength: 26.024167,
  ownProgress: 26.024167,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2012-01-31",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "22MICAVuz34zzqm4Se5Lga",
      externalLink: "https://open.spotify.com/album/22MICAVuz34zzqm4Se5Lga",
    },
  ],
} as const satisfies Release
