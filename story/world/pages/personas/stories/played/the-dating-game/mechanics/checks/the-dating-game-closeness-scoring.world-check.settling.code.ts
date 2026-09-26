import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"

const HERE =
  "story/world/pages/personas/stories/played/the-dating-game/mechanics/checks/the-dating-game-closeness-scoring"

const SKILLS = ["validation", "acknowledgment", "reassurance", "emotionalIntimacy"] as const

const MOST = 3

const MISSED_BID = 2

export type Scored = {
  readonly earned: number
  readonly lost: number
  readonly change: number
}

export type Settled = { readonly answered: Scored } | { readonly refused: string }

const wholeFrom = (value: unknown, least: number, most: number): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= least && value <= most

export function settled(reading: unknown): Settled {
  if (!isRecord(reading)) return { refused: `a reading is keyed by name, ${HERE}` }
  let earned = 0
  for (const skill of SKILLS) {
    const score = reading[skill]
    if (!wholeFrom(score, 0, MOST)) {
      return { refused: `\`${skill}\` is a whole number from 0 to ${MOST}, ${HERE}` }
    }
    earned += score
  }
  const turnedAway = reading["turnedAway"]
  if (!wholeFrom(turnedAway, 0, Number.MAX_SAFE_INTEGER)) {
    return { refused: `\`turnedAway\` is a whole number from 0 up, ${HERE}` }
  }
  const lost = turnedAway * MISSED_BID
  return { answered: { earned, lost, change: earned - lost } }
}
