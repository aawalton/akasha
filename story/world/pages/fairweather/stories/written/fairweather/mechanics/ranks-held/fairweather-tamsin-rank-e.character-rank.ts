import type { CharacterRank } from "akasha/story/world/mechanics/ranks/character-rank/character-rank.page-type.types.ts"

export const fairweatherTamsinRankE = {
  id: "01a10364-ec0b-7a0b-a04e-2b199a76cf58",
  type: "page-type/character-rank",
  slug: "fairweather-tamsin-rank-e",
  title: "E",
  world: "world/fairweather",
  place: 2,
  character: "character-other/fairweather-tamsin",
  rank: "world-rank/fairweather-rank-e",
  unrevealed: false,
} as const satisfies CharacterRank
