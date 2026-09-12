import {
  attributesOf,
  bareSlug,
  recordedModeOf,
} from "akasha/agents/attributes/agent-attributes.module.code.ts"
import {
  frontmatterFromHistory,
  nameFromHistory,
} from "akasha/agents/seats/modules/page-history/seat-page-history.module.code.ts"
import { pageTextOf } from "akasha/agents/seats/modules/page-values/seat-page-values.module.code.ts"
import { resolveRoots } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import {
  seatIdForName,
  seatNameForAgent,
} from "akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import {
  principalOf,
  principalSeatIdOf,
} from "akasha/seat-system/seat-principal/seat-principal.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

export interface SeatWhoami {
  readonly id: string
  readonly name: string | null
  readonly role: string | null
  readonly domain: string | null
  readonly persona: string | null
  readonly mode: string | null
  readonly principal: string | null
  readonly parentAgentId: string | null
}

function parentFromFrontmatter(frontmatter: Record<string, unknown> | null): string | null {
  const name = textAt(frontmatter, "principal-seat-name")
  return name === null ? null : seatIdForName(name)
}

function fromStanding(agentId: string, seatName: string): SeatWhoami {
  const stated = attributesOf(agentId)
  return {
    id: agentId,
    name: seatName,
    role: stated.role?.slug ?? null,
    domain: stated.domain?.slug ?? null,
    persona: stated.persona?.slug ?? null,
    mode: recordedModeOf(agentId)?.value ?? null,
    principal: principalOf(agentId)?.value ?? null,
    parentAgentId: principalSeatIdOf(agentId),
  }
}

function fromHistory(agentId: string): SeatWhoami | null {
  const roots = resolveRoots()
  const frontmatter = frontmatterFromHistory(agentId, roots)
  if (frontmatter === null) return null
  return {
    id: agentId,
    name: nameFromHistory(agentId, roots),
    role: textAt(frontmatter, "role-slug"),
    domain: bareSlug(textAt(frontmatter, "domain-slug")),
    persona: textAt(frontmatter, "persona-slug"),
    mode: textAt(frontmatter, "start-mode"),
    principal: textAt(frontmatter, "person-slug") ?? textAt(frontmatter, "principal-seat-name"),
    parentAgentId: parentFromFrontmatter(frontmatter),
  }
}

export function seatWhoami(agentId: string): SeatWhoami | null {
  const seatName = seatNameForAgent(agentId)
  if (seatName !== null) return fromStanding(agentId, seatName)
  return fromHistory(agentId)
}

export function seatTitle(agentId: string): string | null {
  const held = pageTextOf(agentId, "title")
  if (held !== null) return held
  return textAt(frontmatterFromHistory(agentId, resolveRoots()), "title")
}
