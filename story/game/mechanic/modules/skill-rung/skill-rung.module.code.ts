export type Rung = {
  readonly rank: string
  readonly width: number | null
  readonly line: string
}

export const SKILL_RUNGS: readonly Rung[] = [
  {
    rank: "novice",
    width: 5,
    line: "located, and not yet entered",
  },
  {
    rank: "apprentice",
    width: 10,
    line: "the counterfeit band, recognising when it would help but unable to produce it under pressure",
  },
  {
    rank: "journeyman",
    width: 25,
    line: "cued, doing it reliably when they set themselves to it, the move coming from the plan",
  },
  {
    rank: "expert",
    width: 50,
    line: "unprompted, reading an opening they spotted and answering it with a move that is theirs",
  },
  {
    rank: "master",
    width: 100,
    line: "the principles found, able to teach it and knowing exactly where it stops working",
  },
  {
    rank: "grandmaster",
    width: 250,
    line: "adding to the art with an original technique no master taught",
  },
  {
    rank: "sage",
    width: null,
    line: "reframing what the skill is, turning a trick into a discipline of its own",
  },
]

export const SKILL_RANKS: readonly string[] = SKILL_RUNGS.map((one) => one.rank)

export type Placed = {
  readonly at: number
  readonly rung: Rung
}

export function placedAt(rank: string): Placed | undefined {
  const at = SKILL_RUNGS.findIndex((one) => one.rank === rank)
  const rung = SKILL_RUNGS[at]
  return rung === undefined ? undefined : { at, rung }
}
