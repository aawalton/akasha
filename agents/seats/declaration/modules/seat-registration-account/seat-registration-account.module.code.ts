import { pageTextOf } from "akasha/agents/seats/page/modules/values/seat-page-values.module.code.ts"

const KEY = "registration-account"

export interface RegistrationRecord {
  readonly value: string
}

export function registrationAccountOf(agent: string): RegistrationRecord | null {
  const held = pageTextOf(agent, KEY)
  return held === null ? null : { value: held }
}
