import { pageTextOf } from "akasha/agent/seat/modules/page-values/seat-page-values.module.code.ts"
import {
  FLEET,
  type Principal,
} from "akasha/agent/seat/name/modules/compose-seat-name/compose-seat-name.module.code.ts"
import { seatIdForName } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PERSON_KEY = "person-slug"

const PRINCIPAL_KEY = "principal-seat-name"

export interface PrincipalRecord {
  readonly value: Principal
}

export function principalOf(agent: string): PrincipalRecord | null {
  const person = pageTextOf(agent, PERSON_KEY)
  if (person !== null) return { value: slugOf(person) }
  return pageTextOf(agent, PRINCIPAL_KEY) === null ? null : { value: FLEET }
}

export function principalSeatNameOf(agent: string): string | null {
  const named = pageTextOf(agent, PRINCIPAL_KEY)
  return named === null ? null : slugOf(named)
}

export function principalSeatIdOf(agent: string): string | null {
  const name = principalSeatNameOf(agent)
  return name === null ? null : seatIdForName(name)
}
