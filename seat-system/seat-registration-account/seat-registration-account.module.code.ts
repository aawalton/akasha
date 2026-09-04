import { pageTextOf } from "../seat-page-values/seat-page-values.module.code.ts"

const KEY = "registration-account"

const LABEL = "account"

export interface RegistrationRecord {
  readonly value: string
}

export function registrationAccountOf(agent: string): RegistrationRecord | null {
  const held = pageTextOf(agent, KEY)
  return held === null ? null : { value: held }
}

export function registrationAccountLine(record: RegistrationRecord | null): string {
  return `  ${LABEL.padEnd(8)} ${record === null ? "— none read" : record.value}`
}
