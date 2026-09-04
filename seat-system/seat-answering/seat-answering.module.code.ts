import {
  HANDLER,
  identityHeardFrom,
  personPrincipals,
} from "../compose-seat-name/compose-seat-name.module.code.ts"
import { personaIsDefault } from "../seat-resolve/seat-resolve.module.code.ts"

export type Answering = {
  readonly persona: string | null
  readonly principal: string | null
}

// WHO A SEAT ANSWERS AS AND WHO IT ANSWERS TO ARE ONE RULE. Both halves are read from the tree, so
// they are handed in rather than reached: what is worth testing here is the rule, and the rule is
// the only part that does not need a checkout to exercise.
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

// A HANDLER TAKES BOTH HALVES FROM THE PERSON IT SERVES, so it never has to state them and never
// states them inconsistently. Anything that is not a handler of a person derives nothing.
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

// THE TWO HALVES AGREE OR THE SEAT IS REFUSED. Answering as somebody and answering to a person are
// the same fact said twice, so a seat holding one without the other says something about itself
// that nothing else in the fleet will read the same way. Holding neither is allowed: that is every
// seat working for the fleet rather than for a person.
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
