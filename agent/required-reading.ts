import type { AddressIndex } from "../page/address-index.ts"
import { listField } from "../page/frontmatter.ts"
import type { PageAt } from "../page/page-at.ts"
import { blockOf, stringAt } from "../page/text.ts"

const PERSONA_KEY = "persona-slug"

const DOMAIN_KEY = "domain-slug"

const ROLE_KEY = "role-slug"

const TASK_KEY = "task-slug"

const INITIATIVE_KEY = "initiative-slug"

const PERSON_KEY = "person-slug"

const MODE_KEY = "start-mode"

const ON_CALL_KEY = "on-call"

const PARENT_KEY = "domain-parent-slug"

const REQUIRED_KEY = "required-reading-slugs"

const ON_CALL_DOMAIN = "seat-assignment-on-call"

const MODE_PREFIX = "seat-mode-"

const TRUE = "true"

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

export function seatWarrantsFor(
  body: string,
  index: AddressIndex
): readonly Warranted[] {
  const { fm, why } = blockOf(body)
  if (why !== null) return []
  const found: Warranted[] = []
  const take = (claimant: string, named: string | null): PageAt | null => {
    if (named === null) return null
    const page = index.domainAt(named)
    if (page !== null) found.push({ claimant, page })
    return page
  }

  take("persona", stringAt(fm, PERSONA_KEY))
  const domain = take("domain", stringAt(fm, DOMAIN_KEY))
  if (domain !== null) {
    for (const one of above(domain, index)) found.push({ claimant: "domain", page: one })
  }
  take("role", stringAt(fm, ROLE_KEY))
  take("task", stringAt(fm, TASK_KEY))
  take("initiative", stringAt(fm, INITIATIVE_KEY))
  take("principal", stringAt(fm, PERSON_KEY))
  const mode = stringAt(fm, MODE_KEY)
  if (mode !== null) take("mode", `${MODE_PREFIX}${mode}`)
  if (stringAt(fm, ON_CALL_KEY) === TRUE) take("on-call", ON_CALL_DOMAIN)

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
