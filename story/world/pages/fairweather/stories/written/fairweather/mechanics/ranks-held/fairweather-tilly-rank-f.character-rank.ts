import type { CharacterRank } from "akasha/story/world/mechanics/ranks/character-rank/character-rank.page-type.types.ts"

export const fairweatherTillyRankF = {
  id: "01a10364-ec0b-794e-8d31-31d20fa35d3d",
  type: "page-type/character-rank",
  slug: "fairweather-tilly-rank-f",
  title: "F",
  world: "world/fairweather",
  place: 1,
  character: "character-other/fairweather-tilly",
  rank: "world-rank/fairweather-rank-f",
  unrevealed: false,
} as const satisfies CharacterRank
