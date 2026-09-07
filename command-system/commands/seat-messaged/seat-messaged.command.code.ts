import { asking } from "@akasha/pages-service/asking"
import { keepLastMessagedAt, personaOr } from "@akasha/personas/persona-reading"
import type { Answer, Given } from "../../calling/calling.module.code.ts"

const SEAT = "seat"

export type Seated = {
  readonly slug: string
  readonly personaSlug: string
}

export function seatedIn(root: string): readonly Seated[] {
  const asked = asking(root, {
    pageTypeSlug: SEAT,
    keys: ["slug", "personaSlug"],
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  const held: Seated[] = []
  for (const row of asked.rows) {
    const one = row as Readonly<Record<string, unknown>>
    const slug = one["slug"]
    const persona = one["personaSlug"]
    if (typeof slug !== "string" || typeof persona !== "string") continue
    held.push({ slug, personaSlug: persona })
  }
  return held
}

// A SEAT NAMING NOBODY IS THE SAME ANSWER AS NO SEAT AT ALL. Either way there is no persona to mark,
// and a caller that had to tell the two apart would be deciding what to do with a seat rather than
// with a persona.
export function personaIn(seats: readonly Seated[], name: string): string | null {
  for (const one of seats) {
    if (one.slug === name && one.personaSlug !== "") return one.personaSlug
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
  keepLastMessagedAt(given.root, personaOr(given.root, slug), at)
  return { report: [`${slug} ${at.toISOString()}`], refusals: [], code: 0 }
}
