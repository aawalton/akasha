import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"

const HERE =
  "story/world/pages/personas/stories/played/the-dating-game/mechanics/checks/the-dating-game-closeness-scoring"

const SKILLS = ["validation", "acknowledgment", "reassurance", "emotionalIntimacy"] as const

const MOST = 2

const MISSED_BID = 2

const CHARACTER = "character"

const QUOTES = "quotes"

const TURNED_AWAY = "turnedAway"

type Scored = {
  readonly earned: number
  readonly lost: number
  readonly change: number
}

type Settled = { readonly answered: Scored } | { readonly refused: string }

const wholeFrom = (value: unknown, least: number, most: number): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= least && value <= most

const said = (value: unknown): boolean => typeof value === "string" && value.trim() !== ""

const quoted = (value: unknown): boolean =>
  said(value) || (Array.isArray(value) && value.length > 0 && value.every(said))

const unquoted = (name: string): Settled => ({
  refused: `\`${name}\` above nought quotes in \`${QUOTES}\` the words it rests on, ${HERE}`,
})

export function settled(reading: unknown): Settled {
  if (!isRecord(reading)) return { refused: `a reading is keyed by name, ${HERE}` }
  if (!said(reading[CHARACTER])) {
    return { refused: `\`${CHARACTER}\` names the character whose points are scored, ${HERE}` }
  }
  const quotes = reading[QUOTES]
  if (!isRecord(quotes)) return { refused: `\`${QUOTES}\` is keyed by name, ${HERE}` }
  let earned = 0
  for (const skill of SKILLS) {
    const score = reading[skill]
    if (!wholeFrom(score, 0, MOST)) {
      return { refused: `\`${skill}\` is a whole number from 0 to ${MOST}, ${HERE}` }
    }
    if (score > 0 && !quoted(quotes[skill])) return unquoted(skill)
    earned += score
  }
  const turnedAway = reading[TURNED_AWAY]
  if (!wholeFrom(turnedAway, 0, Number.MAX_SAFE_INTEGER)) {
    return { refused: `\`${TURNED_AWAY}\` is a whole number from 0 up, ${HERE}` }
  }
  if (turnedAway > 0 && !quoted(quotes[TURNED_AWAY])) return unquoted(TURNED_AWAY)
  const lost = turnedAway * MISSED_BID
  return { answered: { earned, lost, change: earned - lost } }
}

const RELATIONSHIP = "world-relationship"

const POINTS = "relationshipPoints"

const CHANGE = "change"

export function added(reading: unknown, answered: unknown): readonly Added[] {
  if (!isRecord(reading) || !isRecord(answered)) return []
  const character = reading[CHARACTER]
  const by = answered[CHANGE]
  if (typeof character !== "string" || typeof by !== "number") return []
  const slug = character.slice(character.lastIndexOf("/") + 1)
  return [{ page: `${RELATIONSHIP}/${slug}`, key: POINTS, by }]
}
