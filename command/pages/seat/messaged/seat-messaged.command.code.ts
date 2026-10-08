import {
  PERSONAS,
  seatSectionOf,
} from "akasha/agent/seat/fleet/modules/seat-section/seat-section.computed-property-module.code.ts"
import {
  raiseMessages,
  sentIn,
} from "akasha/alan/track/daily/modules/day-messages/day-messages.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { seat } from "akasha/command/argument/pages/seat.argument.ts"
import { answering, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { seatMessaged as page } from "akasha/command/pages/seat/messaged/seat-messaged.command.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  keepLastMessagedAt,
  type Persona,
  personaOr,
} from "akasha/persona/modules/reading/persona-reading.module.code.ts"
import {
  keepPointsToday,
  pointsIn,
} from "akasha/persona/point/modules/persona-points-keeping/persona-points-keeping.module.code.ts"

const SEAT = "seat"

const ROLE = "role"

const ASSIGNMENT = "assignmentSlug"

export type Seated = {
  readonly slug: string
  readonly persona: string
  readonly role: string | null
  readonly assignment: string | null
}

function seatedIn(root: string): readonly Seated[] {
  const asked = asking(root, {
    pageTypeSlug: SEAT,
    keys: ["slug", "persona", ROLE, ASSIGNMENT],
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  const held: Seated[] = []
  for (const row of asked.rows) {
    const one = row as Readonly<Record<string, unknown>>
    const slug = one["slug"]
    const persona = one["persona"]
    if (typeof slug !== "string" || typeof persona !== "string") continue
    held.push({
      slug,
      persona: persona === "" ? persona : slugOf(persona),
      role: textIn(one[ROLE]),
      assignment: textIn(one[ASSIGNMENT]),
    })
  }
  return held
}

export function seatIn(seats: readonly Seated[], name: string): Seated | null {
  for (const one of seats) {
    if (one.slug === name && one.persona !== "") return one
  }
  return null
}

export function countsForWallpaper(seated: Seated): boolean {
  return seatSectionOf(seated.role, seated.assignment) === PERSONAS
}

export function notCounted(seated: Seated): string {
  const section = seatSectionOf(seated.role, seated.assignment)
  return (
    `\`${seated.slug}\` is drawn under ${section} rather than ${PERSONAS} in the Agents panel, so ` +
    `${seated.persona}'s last-messaged mark is left as it was and the wallpaper does not follow this message.`
  )
}

export function noSeat(name: string): string {
  return (
    `\`${name}\` names no seat holding a persona, so there is nobody to mark as written to. ` +
    "Marking the wrong persona would move a wallpaper and a readout onto her."
  )
}

const NO_DAY =
  "no day page is filed for today, so this message earned nobody a point, and the count starts " +
  "once the day is there."

export type Keeping = {
  readonly mark: typeof keepLastMessagedAt
  readonly raise: typeof raiseMessages
  readonly points: typeof keepPointsToday
}

const KEEPING: Keeping = {
  mark: keepLastMessagedAt,
  raise: raiseMessages,
  points: keepPointsToday,
}

export function marking(
  root: string,
  slug: string,
  persona: Persona,
  at: Date,
  unmarked: string | null,
  done: string[],
  keeping: Keeping = KEEPING
): Answer {
  if (unmarked === null) {
    keeping.mark(root, persona, at)
    done.push(`marked ${slug} as written to at ${at.toISOString()}`)
  }
  const unmarking = unmarked === null ? [] : [unmarked]
  const counted = keeping.raise(root, slug, at)
  if (counted !== null) done.push(`raised ${slug}'s count on today's day`)
  const sent = counted === null ? null : sentIn(counted, slug)
  if (sent === null) {
    return told([`${slug} ${at.toISOString()}`, NO_DAY, ...unmarking])
  }
  keeping.points(root, persona, pointsIn(sent))
  done.push(`kept ${slug}'s points for today`)
  return told([`${slug} ${at.toISOString()} ${String(sent)}`, ...unmarking])
}

export async function seatMessaged(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [seat])
  if ("refused" in read) return mistaking(read.refused)
  const name = read.taken.seat
  return await answering((done) => {
    const seated = seatIn(seatedIn(given.root), name)
    if (seated === null) return mistaking([noSeat(name)])
    const persona = personaOr(given.root, seated.persona)
    const unmarked = countsForWallpaper(seated) ? null : notCounted(seated)
    return marking(given.root, seated.persona, persona, new Date(), unmarked, done)
  })
}
