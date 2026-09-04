import { seat } from "../seats/seat.page-type.ts"

export const JOINER = "-"

export const HANDLER = "handler"

export const FLEX = /^flex-(?:0|[1-9]\d*)$/

const FLEX_HELD = /(?:^|-)(flex-(?:0|[1-9]\d*))(?:-|$)/

const PERSONA_SLUG = "persona-slug"

const NAMED_BY_PERSONA: readonly string[] = ["alan"]

export type SeatAttributes = {
  readonly persona: string | null
  readonly domain: string | null
  readonly role: string | null
}

export type NameableSeat = {
  readonly attributes: SeatAttributes
  readonly flex: string | null
  readonly principal: string | null
}

export type SeatNaming = {
  readonly defaultPersona: string | null
  readonly namedByPersona: readonly string[]
}

function startingPersona(): string | null {
  for (const declared of seat.properties) {
    if (declared.pagePropertySlug !== PERSONA_SLUG) continue
    return "default" in declared ? declared.default : null
  }
  return null
}

export const SEAT_NAMING: SeatNaming = {
  defaultPersona: startingPersona(),
  namedByPersona: NAMED_BY_PERSONA,
}

function stated(value: string | null): string | null {
  return value === "" ? null : value
}

export function flexInName(name: string): string | null {
  const found = FLEX_HELD.exec(name)
  if (found === null) return null
  const held = found[1]
  return held === undefined ? null : held
}

function segments(nameable: NameableSeat, naming: SeatNaming): readonly (string | null)[] {
  const persona = stated(nameable.attributes.persona)
  const domain = stated(nameable.attributes.domain)
  const role = stated(nameable.attributes.role)
  if (role === HANDLER) return [domain]
  const { principal } = nameable
  const outright =
    principal !== null &&
    naming.namedByPersona.includes(principal) &&
    persona !== null &&
    persona !== naming.defaultPersona
  if (outright) return [persona]
  return [domain, role, stated(nameable.flex)]
}

export function composeSeatName(nameable: NameableSeat, naming: SeatNaming): string | null {
  const { flex } = nameable
  if (flex !== null && flex !== "" && !FLEX.test(flex)) return null
  const kept = segments(nameable, naming).filter((one): one is string => one !== null)
  return kept.length === 0 ? null : kept.join(JOINER)
}

export function handlerSeatName(person: string): string {
  const name = composeSeatName(
    {
      attributes: { persona: null, domain: person, role: HANDLER },
      flex: null,
      principal: null,
    },
    { defaultPersona: null, namedByPersona: [] }
  )
  if (name === null) throw new Error(`nothing spells the ${HANDLER} seat for \`${person}\``)
  return name
}
