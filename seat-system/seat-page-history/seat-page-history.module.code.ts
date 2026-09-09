import { AKASHA, rootFor } from "@akasha/pages/checkout-roots"
import type { Roots } from "@akasha/pages/markdown-page-at"
import { FLEET } from "../compose-seat-name/compose-seat-name.module.code.ts"
import {
  akashaSeatInHistory,
  akashaSeatNamedInHistory,
} from "../seat-akasha-history/seat-akasha-history.module.code.ts"
import { DECLARATIONS, type Declaration } from "../seat-attributes/seat-attributes.module.code.ts"
import { initiativeStemOf } from "../seat-initiative/seat-initiative.module.code.ts"

const IN_ITS_OWN_FIELD: readonly Declaration[] = ["initiative", "on-call"]

export interface StatedFromHistory {
  readonly commit: string
  readonly set: Partial<Record<Declaration, string>>
  readonly assignment: string | null
  readonly principal: string | null
  readonly onCall: boolean
  readonly initiative: string | null
  readonly mode: string | null
  readonly account: string | null
}

function textField(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  if (typeof held === "string" && held !== "") return held
  if (typeof held === "number") return String(held)
  return null
}

function bareSlug(said: string | null): string | null {
  return said === null ? null : said.slice(said.lastIndexOf("/") + 1)
}

export interface PageInHistory {
  readonly commit: string
  readonly frontmatter: Record<string, unknown>
}

export function pageFromHistory(seatName: string, roots: Roots): PageInHistory | null {
  const inAkasha = akashaSeatNamedInHistory(seatName, rootFor(roots, AKASHA))
  if (inAkasha !== null) return { commit: inAkasha.commit, frontmatter: inAkasha.values }
  return null
}

export function statedFromHistory(seatName: string, roots: Roots): StatedFromHistory | null {
  const held = pageFromHistory(seatName, roots)
  if (held === null) return null
  const { commit, frontmatter } = held
  const set: Partial<Record<Declaration, string>> = {}
  for (const key of DECLARATIONS) {
    if (IN_ITS_OWN_FIELD.includes(key)) continue
    const slug = bareSlug(textField(frontmatter, `${key}-slug`))
    if (slug !== null) set[key] = slug
  }
  const bare = textField(frontmatter, "initiative-slug")
  return {
    commit,
    set,
    assignment: textField(frontmatter, "domain-slug"),
    principal:
      textField(frontmatter, "person-slug") ?? textField(frontmatter, "principal-seat-name"),
    onCall: frontmatter["on-call"] === true,
    initiative: bare === null ? null : (initiativeStemOf(bare, rootFor(roots, AKASHA)) ?? bare),
    mode: textField(frontmatter, START_MODE_KEY),
    account: textField(frontmatter, REGISTRATION_KEY),
  }
}

const PRINCIPAL_KEY = "principal-seat-name"

export function nameFromHistory(agentId: string, roots: Roots): string | null {
  const inAkasha = akashaSeatInHistory(agentId, rootFor(roots, AKASHA))
  const said = inAkasha === null ? null : inAkasha.values["slug"]
  if (typeof said === "string" && said !== "") return said
  return null
}

export function frontmatterFromHistory(
  agentId: string,
  roots: Roots
): Record<string, unknown> | null {
  const inAkasha = akashaSeatInHistory(agentId, rootFor(roots, AKASHA))
  if (inAkasha !== null) return inAkasha.values
  return null
}

export function fieldFromHistory(agentId: string, roots: Roots, key: string): string | null {
  const inAkasha = akashaSeatInHistory(agentId, rootFor(roots, AKASHA))
  if (inAkasha !== null) {
    const said = textField(inAkasha.values, key)
    if (said !== null) return said
  }
  return null
}

export function parentFromHistory(agentId: string, roots: Roots): string | null {
  return fieldFromHistory(agentId, roots, PRINCIPAL_KEY)
}

const ID_KEY = "id"

const PERSON_KEY = "person-slug"

const START_MODE_KEY = "start-mode"

const REGISTRATION_KEY = "registration-account"

export interface SeatFromHistory {
  readonly commit: string
  readonly seatName: string
  readonly set: Partial<Record<Declaration, string>>
  readonly principal: string | null
  readonly parentName: string | null
  readonly onCall: boolean
  readonly initiative: string | null
  readonly account: string | null
  readonly mode: string | null
}

export function seatFromHistory(agentId: string, roots: Roots): SeatFromHistory | null {
  const seatName = nameFromHistory(agentId, roots)
  if (seatName === null) return null
  const frontmatter = frontmatterFromHistory(agentId, roots)
  if (frontmatter === null || textField(frontmatter, ID_KEY) !== agentId) return null
  const stated = statedFromHistory(seatName, roots)
  if (stated === null) return null
  const above = textField(frontmatter, PRINCIPAL_KEY)
  return {
    commit: stated.commit,
    seatName,
    set: stated.set,
    principal: textField(frontmatter, PERSON_KEY) ?? (above === null ? null : FLEET),
    parentName: above,
    onCall: stated.onCall,
    initiative: stated.initiative,
    account: textField(frontmatter, REGISTRATION_KEY),
    mode: textField(frontmatter, START_MODE_KEY),
  }
}
