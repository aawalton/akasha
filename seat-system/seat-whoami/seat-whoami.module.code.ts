import { slugNamed } from "@akasha/markdown-pages/page-address"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { attributesOf, recordedModeOf } from "../seat-attributes/seat-attributes.module.code.ts"
import {
  frontmatterFromHistory,
  nameFromHistory,
} from "../seat-page-history/seat-page-history.module.code.ts"
import { pageTextOf } from "../seat-page-values/seat-page-values.module.code.ts"
import {
  seatIdForName,
  seatNameForAgent,
} from "../seat-presence-read/seat-presence-read.module.code.ts"
import { principalOf, principalSeatIdOf } from "../seat-principal/seat-principal.module.code.ts"

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

function bareSlug(value: string | null): string | null {
  return value === null ? null : slugNamed(value)
}

function slugAt(frontmatter: Record<string, unknown> | null, key: string): string | null {
  const held = frontmatter?.[key]
  return typeof held === "string" && held !== "" ? held : null
}

function parentFromFrontmatter(frontmatter: Record<string, unknown> | null): string | null {
  const name = slugAt(frontmatter, "principal-seat-name")
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
    role: slugAt(frontmatter, "role-slug"),
    domain: bareSlug(slugAt(frontmatter, "domain-slug")),
    persona: slugAt(frontmatter, "persona-slug"),
    mode: slugAt(frontmatter, "start-mode"),
    principal: slugAt(frontmatter, "person-slug") ?? slugAt(frontmatter, "principal-seat-name"),
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
  return slugAt(frontmatterFromHistory(agentId, resolveRoots()), "title")
}
