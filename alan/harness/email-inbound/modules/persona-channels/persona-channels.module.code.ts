import { personasStanding } from "akasha/personas/modules/reading/persona-reading.module.code.ts"

export function channelsOf(root: string): ReadonlyMap<string, string> {
  const channels = new Map<string, string>()
  for (const persona of personasStanding(root)) {
    if (persona.email !== null) channels.set(persona.email.toLowerCase(), persona.slug)
  }
  return channels
}
