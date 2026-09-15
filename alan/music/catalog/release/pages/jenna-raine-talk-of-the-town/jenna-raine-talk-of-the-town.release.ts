import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineTalkOfTheTown = {
  id: "01a0676a-d72c-7001-a24e-cb2b7cf1ae86",
  type: "release",
  slug: "jenna-raine-talk-of-the-town",
  title: "Talk Of The Town",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 3.0891,
  ownProgress: 3.0891,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2025-09-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "02Azszdh3FeMdvKOwWRiS9",
      externalLink: "https://open.spotify.com/album/02Azszdh3FeMdvKOwWRiS9",
    },
  ],
} as const satisfies Release
