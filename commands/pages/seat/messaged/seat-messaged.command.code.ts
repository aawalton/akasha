import {
  raiseMessages,
  sentIn,
} from "akasha/alan/track/daily/day-messages/day-messages.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { seat } from "akasha/commands/arguments/pages/seat.argument.ts"
import { answering, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { seatMessaged as page } from "akasha/commands/pages/seat/messaged/seat-messaged.command.ts"
import { asking } from "akasha/pages/service/page-asking/page-asking.module.code.ts"
import {
  keepPointsToday,
  pointsIn,
} from "akasha/personas/points/keeping/persona-points-keeping.module.code.ts"
import {
  keepLastMessagedAt,
  type Persona,
  personaOr,
} from "akasha/personas/reading/persona-reading.module.code.ts"

const SEAT = "seat"

export type Seated = {
  readonly slug: string
  readonly persona: string
}

export function seatedIn(root: string): readonly Seated[] {
  const asked = asking(root, {
    pageTypeSlug: SEAT,
    keys: ["slug", "persona"],
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  const held: Seated[] = []
  for (const row of asked.rows) {
    const one = row as Readonly<Record<string, unknown>>
    const slug = one["slug"]
    const persona = one["persona"]
    if (typeof slug !== "string" || typeof persona !== "string") continue
    held.push({ slug, persona })
  }
  return held
}

export function personaIn(seats: readonly Seated[], name: string): string | null {
  for (const one of seats) {
    if (one.slug === name && one.persona !== "") return one.persona
  }
  return null
}

export function noSeat(name: string): string {
  return (
    `\`${name}\` names no seat holding a persona, so there is nobody to mark as written to. ` +
    "Marking the wrong persona would move a wallpaper and a readout onto her."
  )
}

const NO_DAY =
  "no day page is filed for today, so this message earned nobody a point. The mark is kept all " +
  "the same, and the count starts once the day is there."

export type Keeping = {
  readonly mark: typeof keepLastMessagedAt
  readonly raise: typeof raiseMessages
  readonly points: typeof keepPointsToday
}

export const KEEPING: Keeping = {
  mark: keepLastMessagedAt,
  raise: raiseMessages,
  points: keepPointsToday,
}

export function marking(
  root: string,
  slug: string,
  persona: Persona,
  at: Date,
  done: string[],
  keeping: Keeping = KEEPING
): Answer {
  keeping.mark(root, persona, at)
  done.push(`marked ${slug} as written to at ${at.toISOString()}`)
  const counted = keeping.raise(root, slug, at)
  if (counted !== null) done.push(`raised ${slug}'s count on today's day`)
  const sent = counted === null ? null : sentIn(counted, slug)
  if (sent === null) {
    return told([`${slug} ${at.toISOString()}`, NO_DAY])
  }
  keeping.points(root, persona, pointsIn(sent))
  done.push(`kept ${slug}'s points for today`)
  return told([`${slug} ${at.toISOString()} ${String(sent)}`])
}

export async function seatMessaged(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [seat])
  if ("refused" in read) return mistaking(read.refused)
  const name = read.taken.seat
  return await answering((done) => {
    const slug = personaIn(seatedIn(given.root), name)
    if (slug === null) return mistaking([noSeat(name)])
    const persona = personaOr(given.root, slug)
    return marking(given.root, slug, persona, new Date(), done)
  })
}
