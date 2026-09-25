const HERE = "story/game/game-mechanic/modules/rank-ladder"

type Reading = { readonly rank: string }

type Climbed =
  | { readonly answered: { readonly rank: string; readonly topped: boolean } }
  | { readonly refused: string }

export function climbingBy(ranks: readonly string[]): (reading: Reading) => Climbed {
  return (reading) => {
    const at = ranks.indexOf(reading.rank)
    if (at === -1) return { refused: `\`${reading.rank}\` is no rank on this ladder, ${HERE}` }
    const next = ranks[at + 1]
    if (next === undefined) return { answered: { rank: reading.rank, topped: true } }
    return { answered: { rank: next, topped: false } }
  }
}
