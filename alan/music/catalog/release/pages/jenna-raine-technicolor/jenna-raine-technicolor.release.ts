import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineTechnicolor = {
  id: "01a0676a-d72c-7007-a4ac-236cba20086e",
  type: "page-type/release",
  slug: "jenna-raine-technicolor",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2019-07-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0afazUqBgKGgbhp7hQNuAF",
      externalLink: "https://open.spotify.com/album/0afazUqBgKGgbhp7hQNuAF",
    },
  ],
  title: "Technicolor",
} as const satisfies Release
