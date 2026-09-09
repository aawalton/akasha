import { asking } from "@akasha/pages-service/asking"
import {
  keepPointsToday,
  pointsIn,
} from "akasha/personas/points/keeping/persona-points-keeping.module.code.ts"
import {
  keepLastMessagedAt,
  personaOr,
} from "akasha/personas/reading/persona-reading.module.code.ts"
import {
  raiseMessages,
  sentIn,
} from "../../../../alan/track/daily/day-messages/day-messages.module.code.ts"
import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"

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

const NO_NAME = "no seat is named, and a run naming none would mark whichever persona came first"

const NO_DAY =
  "no day page is filed for today, so this message earned nobody a point. The mark is kept all " +
  "the same, and the count starts once the day is there."

export async function seatMessaged(argv: readonly string[], given: Given): Promise<Answer> {
  const name = argv[0]
  if (name === undefined || name === "") {
    return { report: [], refusals: [NO_NAME], code: 2 }
  }
  const slug = personaIn(seatedIn(given.root), name)
  if (slug === null) {
    return { report: [], refusals: [noSeat(name)], code: 2 }
  }
  const at = new Date()
  const persona = personaOr(given.root, slug)
  keepLastMessagedAt(given.root, persona, at)
  const counted = raiseMessages(given.root, slug, at)
  const sent = counted === null ? null : sentIn(counted, slug)
  if (sent === null) {
    return { report: [`${slug} ${at.toISOString()}`, NO_DAY], refusals: [], code: 0 }
  }
  keepPointsToday(given.root, persona, pointsIn(sent))
  return { report: [`${slug} ${at.toISOString()} ${String(sent)}`], refusals: [], code: 0 }
}
