const HERE = "story/game/game-mechanic/pages/closeness-scoring"

const SKILLS = ["validation", "acknowledgment", "reassurance", "emotionalIntimacy"] as const

const MOST = 3

const MISSED_BID = 2

type Skill = (typeof SKILLS)[number]

type Reading = Readonly<Record<Skill, number>> & { readonly turnedAway: number }

export type Scored = {
  readonly earned: number
  readonly lost: number
  readonly change: number
}

export type Ran = { readonly answered: Scored } | { readonly refused: string }

const wholeFrom = (value: unknown, least: number, most: number): boolean =>
  typeof value === "number" && Number.isInteger(value) && value >= least && value <= most

export function runMechanic(reading: Reading): Ran {
  for (const skill of SKILLS) {
    if (!wholeFrom(reading[skill], 0, MOST)) {
      return { refused: `\`${skill}\` is a whole number from 0 to ${MOST}, ${HERE}` }
    }
  }
  if (!wholeFrom(reading.turnedAway, 0, Number.MAX_SAFE_INTEGER)) {
    return { refused: `\`turnedAway\` is a whole number from 0 up, ${HERE}` }
  }
  const earned = SKILLS.reduce((sum, skill) => sum + reading[skill], 0)
  const lost = reading.turnedAway * MISSED_BID
  return { answered: { earned, lost, change: earned - lost } }
}
