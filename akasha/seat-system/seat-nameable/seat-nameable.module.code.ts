import type { NameableSeat, Principal } from "../compose-seat-name/compose-seat-name.module.code.ts"
import {
  ATTRIBUTES,
  type Attributes,
  type Declaration,
} from "../seat-attributes/seat-attributes.module.code.ts"
import { flexOf } from "../seat-flex/seat-flex.module.code.ts"
import { principalOf } from "../seat-principal/seat-principal.module.code.ts"

export function nameableStated(
  set: Partial<Record<Declaration, string>>,
  flex: string | null,
  principal: Principal | null
): NameableSeat {
  return {
    attributes: {
      persona: set.persona ?? null,
      domain: set.domain ?? null,
      role: set.role ?? null,
    },
    flex,
    principal,
  }
}

export function nameableFrom(
  agent: string,
  standing: Attributes,
  statedFlex: string | null,
  statedPrincipal: Principal | null,
  cleared: readonly Declaration[]
): NameableSeat {
  const stated: Partial<Record<Declaration, string>> = {}
  for (const key of ATTRIBUTES) {
    const held = standing[key]
    if (held !== undefined) stated[key] = held.slug
  }
  return nameableStated(
    stated,
    cleared.includes("flex") ? null : (statedFlex ?? flexOf(agent)?.value ?? null),
    statedPrincipal ?? principalOf(agent)?.value ?? null
  )
}
