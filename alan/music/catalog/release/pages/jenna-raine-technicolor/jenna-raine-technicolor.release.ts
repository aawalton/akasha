import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineTechnicolor = {
  id: "01a0676a-d72c-7007-a4ac-236cba20086e",
  type: "page-type/release",
  slug: "jenna-raine-technicolor",
  title: "Technicolor",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 2.908317,
  ownProgress: 2.908317,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2019-07-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0afazUqBgKGgbhp7hQNuAF",
      externalLink: "https://open.spotify.com/album/0afazUqBgKGgbhp7hQNuAF",
    },
  ],
} as const satisfies Release
