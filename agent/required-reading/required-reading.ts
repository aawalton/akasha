import type { AddressIndex } from "../../page/required-reading/address-index/address-index.ts"
import { listField } from "../../page/frontmatter.ts"
import type { PageAt } from "../../page/page.ts"
import { blockOf, stringAt } from "../../page/text/text.ts"
import { seatDefaults } from "./seat-defaults.ts"

const PERSONA_KEY = "persona-slug"

const DOMAIN_KEY = "domain-slug"

const INITIATIVE_KEY = "initiative-slug"

const PERSON_KEY = "person-slug"

const MODE_KEY = "start-mode"

const ON_CALL_KEY = "on-call"

const PARENT_KEY = "domain-parent-slug"

const REQUIRED_KEY = "required-reading-slugs"

const ON_CALL_DOMAIN = "seat-assignment-on-call"

const MODE_PREFIX = "seat-mode-"

const TRUE = "true"

const PERSONA_TYPE = "persona"

const INITIATIVE_TYPE = "initiative"

const PERSON_TYPE = "person"

const DOMAIN_TYPE = "domain"

export interface Warranted {
  readonly claimant: string
  readonly page: PageAt
}

function said(at: PageAt): string {
  return `${at.repo}:${at.key}`
}

function above(at: PageAt, index: AddressIndex): readonly PageAt[] {
  const found: PageAt[] = []
  const walked = new Set<string>([said(at)])
  let here = at
  for (;;) {
    const fm = index.frontmatterOf(here)
    if (fm === null) return found
    const named = stringAt(fm, PARENT_KEY)
    if (named === null) return found
    const next = index.domainAt(named)
    if (next === null || walked.has(said(next))) return found
    walked.add(said(next))
    found.push(next)
    here = next
  }
}

export type Stated = (key: string) => string | null

function statedIn(body: string, defaults: ReadonlyMap<string, string>): Stated | null {
  const { fm, why } = blockOf(body)
  if (why !== null) return null
  return (key) => stringAt(fm, key) ?? defaults.get(key) ?? null
}

export function seatWarrantsWithDefaults(
  body: string,
  index: AddressIndex,
  defaults: ReadonlyMap<string, string> = seatDefaults()
): readonly Warranted[] {
  const stated = statedIn(body, defaults)
  return stated === null ? [] : warrantsFrom(stated, index)
}

export function subagentWarrantsFor(
  seatBody: string,
  index: AddressIndex,
  defaults: ReadonlyMap<string, string> = seatDefaults()
): readonly Warranted[] {
  const stated = statedIn(seatBody, defaults)
  if (stated === null) return []
  const domain = stated(DOMAIN_KEY)
  return warrantsFrom((key) => (key === DOMAIN_KEY ? domain : (defaults.get(key) ?? null)), index)
}

function warrantsFrom(stated: Stated, index: AddressIndex): readonly Warranted[] {
  const found: Warranted[] = []
  const take = (claimant: string, type: string, named: string | null): PageAt | null => {
    if (named === null) return null
    const page = index.domainAt(named.includes("/") ? named : `${type}/${named}`)
    if (page !== null) found.push({ claimant, page })
    return page
  }

  take("persona", PERSONA_TYPE, stated(PERSONA_KEY))
  const domain = take("domain", DOMAIN_TYPE, stated(DOMAIN_KEY))
  if (domain !== null) {
    for (const one of above(domain, index)) found.push({ claimant: "domain", page: one })
  }
  take("initiative", INITIATIVE_TYPE, stated(INITIATIVE_KEY))
  take("principal", PERSON_TYPE, stated(PERSON_KEY))
  const mode = stated(MODE_KEY)
  if (mode !== null) take("mode", DOMAIN_TYPE, `${MODE_PREFIX}${mode}`)
  if (stated(ON_CALL_KEY) === TRUE) take("on-call", DOMAIN_TYPE, ON_CALL_DOMAIN)

  const reached = new Map<string, Warranted>()
  const queue = [...found]
  while (queue.length > 0) {
    const one = queue.shift()
    if (one === undefined) continue
    if (reached.has(said(one.page))) continue
    reached.set(said(one.page), one)
    const held = index.frontmatterOf(one.page)
    if (held === null) continue
    for (const address of listField(held, REQUIRED_KEY)) {
      const next = index.domainAt(address)
      if (next !== null) queue.push({ claimant: one.claimant, page: next })
    }
  }
  return [...reached.values()]
}
