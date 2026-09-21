import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineTalkOfTheTown = {
  id: "01a0676a-d72c-7001-a24e-cb2b7cf1ae86",
  type: "page-type/release",
  slug: "jenna-raine-talk-of-the-town",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2025-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "02Azszdh3FeMdvKOwWRiS9",
      externalLink: "https://open.spotify.com/album/02Azszdh3FeMdvKOwWRiS9",
    },
  ],
  title: "Talk Of The Town",
} as const satisfies Release
