import { answeredByOf, peopleStanding } from "@akasha/person-system/person-reading"
import { personaAt } from "@akasha/persona-system/persona-reading"
import { personaIsDefault } from "../seat-resolve/seat-resolve.module.code.ts"

export const JOINER = "-"

export const FLEX = /^flex-(?:0|[1-9]\d*)$/

export const HANDLER = "handler"

export interface SeatAttributes {
  readonly persona: string | null
  readonly domain: string | null
  readonly role: string | null
}

export const FLEET = "agent"

export function personPrincipals(root: string): readonly string[] {
  return peopleStanding(root).map((one) => one.slug)
}

// A name that is exactly a person's slug is that person's, not a spelling of what the seat is, so
// it stands however the attributes move. Every other name is composed from them, so it recomposes.
export function movesWithTheAttributes(name: string, root: string): boolean {
  return !personPrincipals(root).includes(name)
}

export function principalsFrom(persons: readonly string[]): readonly string[] {
  return [...persons, FLEET]
}

export function principals(root: string): readonly string[] {
  return principalsFrom(personPrincipals(root))
}

export type Principal = string

export interface NameableSeat {
  readonly attributes: SeatAttributes
  readonly flex: string | null
  readonly principal: Principal | null
}

export interface PersonaDefaults {
  readonly domain: string | null
  readonly role: string | null
}

export function personaDefaultsOf(root: string, persona: string): PersonaDefaults | null {
  const held = personaAt(root, persona)
  if (held === null) return null
  return { domain: held.championedDomainSlug, role: held.roleSlug }
}

export function identityHeardFrom(root: string, person: string): string | null {
  return answeredByOf(root, person)
}

function stated(value: string | null): string | null {
  return value === "" ? null : value
}

function spelling(seat: NameableSeat, root: string): readonly (string | null)[] {
  const persona = stated(seat.attributes.persona)
  const domain = stated(seat.attributes.domain)
  const role = stated(seat.attributes.role)
  if (role === HANDLER) {
    return [domain]
  }
  if (seat.principal === "alan" && persona !== null && !personaIsDefault(root, persona)) {
    return [persona]
  }
  return [domain, role, stated(seat.flex)]
}

export function composeSeatName(seat: NameableSeat, root: string): string | null {
  const { flex } = seat
  if (flex !== null && flex !== "" && !FLEX.test(flex)) return null
  const kept = spelling(seat, root).filter((segment): segment is string => segment !== null)
  return kept.length === 0 ? null : kept.join(JOINER)
}

export function handlerSeatName(person: string, root: string): string {
  const name = composeSeatName(
    {
      attributes: { persona: null, domain: person, role: HANDLER },
      flex: null,
      principal: null,
    },
    root
  )
  if (name === null) throw new Error(`nothing spells the ${HANDLER} seat for '${person}'`)
  return name
}
