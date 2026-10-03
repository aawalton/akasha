import type { CharacterRank } from "akasha/story/world/mechanics/ranks/character-rank/character-rank.page-type.types.ts"

export const fairweatherElsieRankF = {
  id: "01a10364-ec0b-7f10-8ccf-ddb3cc5172a3",
  type: "page-type/character-rank",
  slug: "fairweather-elsie-rank-f",
  title: "F",
  world: "world/fairweather",
  place: 1,
  character: "character-player/fairweather-elsie",
  rank: "world-rank/fairweather-rank-f",
  unrevealed: false,
} as const satisfies CharacterRank
