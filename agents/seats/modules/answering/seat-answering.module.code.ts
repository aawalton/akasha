import {
  HANDLER,
  identityHeardFrom,
  personPrincipals,
} from "akasha/seat-system/compose-seat-name/compose-seat-name.module.code.ts"
import { personaIsDefault } from "akasha/seat-system/seat-resolve/seat-resolve.module.code.ts"

export type Answering = {
  readonly persona: string | null
  readonly principal: string | null
}

export type Answerable = {
  readonly personIsPrincipal: (principal: string) => boolean
  readonly personaAnswersForSomebody: (persona: string) => boolean
  readonly persons: () => readonly string[]
}

export function principalIsPerson(root: string, principal: string | null): boolean {
  return principal !== null && personPrincipals(root).includes(principal)
}

export function personaIsHers(root: string, persona: string | null): boolean {
  return persona !== null && persona !== "" && !personaIsDefault(root, persona)
}

export type HandlerDerived = {
  readonly persona: string | null
  readonly principal: string | null
}

export function handlerDerives(
  root: string,
  role: string | null,
  domain: string | null
): HandlerDerived {
  if (role !== HANDLER || domain === null || !principalIsPerson(root, domain)) {
    return { persona: null, principal: null }
  }
  return { persona: identityHeardFrom(root, domain), principal: domain }
}

export function refusedAnswering(seat: Answering, among: Answerable): readonly string[] {
  const hers =
    seat.persona !== null && seat.persona !== "" && among.personaAnswersForSomebody(seat.persona)
  const person = seat.principal !== null && among.personIsPrincipal(seat.principal)
  if (hers === person) return []
  if (hers) {
    const held = seat.principal === null ? "no principal at all" : `\`${seat.principal}\``
    return [
      `\`${seat.persona}\` is a persona, and a seat answers as somebody only where the one it ` +
        `answers to is a person — this seat states ${held}. State a persona and a principal in the ` +
        `same call, one of: ${among.persons().join(", ")}. A seat working for another agent takes no ` +
        `persona: leave it at the default and the name spells its domain and role instead.`,
    ]
  }
  const standing =
    seat.persona === null ? "states no persona" : `states \`${seat.persona}\`, which is the default`
  return [
    `this seat answers to \`${seat.principal}\`, a person, and every seat of a person answers as ` +
      `somebody — it ${standing}, and a default answers for nobody. State a persona in the same ` +
      `call as the principal.`,
  ]
}

export function refuseAnswering(root: string, seat: Answering): readonly string[] {
  return refusedAnswering(seat, {
    personIsPrincipal: (principal) => principalIsPerson(root, principal),
    personaAnswersForSomebody: (persona) => personaIsHers(root, persona),
    persons: () => personPrincipals(root),
  })
}
