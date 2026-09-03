import { FLEET, type Principal } from "../compose-seat-name/compose-seat-name.module.code.ts"
import { pageTextOf } from "../seat-page-values/seat-page-values.module.code.ts"
import { seatIdForName } from "../seat-presence-read/seat-presence-read.module.code.ts"

const PERSON_KEY = "person-slug"

const PRINCIPAL_KEY = "principal-seat-name"

export interface PrincipalRecord {
  readonly value: Principal
}

export function principalOf(agent: string): PrincipalRecord | null {
  const person = pageTextOf(agent, PERSON_KEY)
  if (person !== null) return { value: person }
  return pageTextOf(agent, PRINCIPAL_KEY) === null ? null : { value: FLEET }
}

export function principalSeatNameOf(agent: string): string | null {
  return pageTextOf(agent, PRINCIPAL_KEY)
}

export function principalSeatIdOf(agent: string): string | null {
  const name = principalSeatNameOf(agent)
  return name === null ? null : seatIdForName(name)
}

export function principalLine(recorded: PrincipalRecord | null): string {
  return `  ${"principal".padEnd(8)} ${recorded === null ? "— not recorded" : recorded.value}`
}
