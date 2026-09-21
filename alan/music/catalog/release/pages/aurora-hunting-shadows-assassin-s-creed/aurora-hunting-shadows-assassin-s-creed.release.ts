import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraHuntingShadowsAssassinSCreed = {
  id: "01a0676a-d720-7074-a8f7-ffd8995facac",
  type: "page-type/release",
  slug: "aurora-hunting-shadows-assassin-s-creed",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2022-09-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6HzGOjwwke7sTbZrSf4Et9",
      externalLink: "https://open.spotify.com/album/6HzGOjwwke7sTbZrSf4Et9",
    },
  ],
  title: "Hunting Shadows (Assassin's Creed)",
} as const satisfies Release
