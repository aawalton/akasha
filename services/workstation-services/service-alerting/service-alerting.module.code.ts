import type { DomainRow } from "akasha/domains/modules/rows/domain-rows.module.code.ts"
import type { Health } from "../service-health/service-health.module.code.ts"

const ADDRESS = "workstation-service/"
export const COOLING_MS = 24 * 60 * 60 * 1000

export type Outage = {
  readonly brokenSince: string
  readonly toldAt: string | null
}

export type Ledger = Readonly<Record<string, Outage>>

export type Telling = {
  readonly slug: string
  readonly to: string
  readonly body: string
}

export type Decided = {
  readonly tell: readonly Telling[]
  readonly keeping: Ledger
}

export function championing(rows: readonly DomainRow[]): (address: string) => string | null {
  const by = new Map(rows.map((one) => [one.slug, one]))
  return (address) => {
    const seen = new Set<string>()
    let at: string | null = address
    while (at !== null && !seen.has(at)) {
      seen.add(at)
      const row = by.get(at)
      if (row === undefined) return null
      if (row.persona !== null) return row.persona
      at = row.parent
    }
    return null
  }
}

export function bodyFor(one: Health, since: string, now: string): string {
  const same = since === now
  const held = same ? "It broke just now." : `It has been broken since ${since}.`
  return [
    `\`${one.slug}\` is broken.`,
    `${one.broken ?? "Nothing said why"}.`,
    held,
    `What that service is and what it runs are on its page.`,
    `Its log is \`journalctl --user -u ${one.unit}\`.`,
  ].join(" ")
}

export function owing(mark: string | null, now: string, coolingMs: number): boolean {
  if (mark === null) return true
  const marked = Date.parse(mark)
  if (!Number.isFinite(marked)) return true
  return Date.parse(now) - marked >= coolingMs
}

export function deciding(given: {
  readonly health: readonly Health[]
  readonly champion: (address: string) => string | null
  readonly ledger: Ledger
  readonly now: string
  readonly fallback: string
  readonly coolingMs?: number
}): Decided {
  const coolingMs = given.coolingMs ?? COOLING_MS
  const keeping: Record<string, Outage> = {}
  const tell: Telling[] = []
  for (const one of given.health) {
    if (one.broken === null) continue
    const before = given.ledger[one.slug]
    const brokenSince = before?.brokenSince ?? given.now
    const toldAt = before?.toldAt ?? null
    keeping[one.slug] = { brokenSince, toldAt }
    if (!owing(toldAt, given.now, coolingMs)) continue
    tell.push({
      slug: one.slug,
      to: given.champion(`${ADDRESS}${one.slug}`) ?? given.fallback,
      body: bodyFor(one, brokenSince, given.now),
    })
  }
  return { tell, keeping }
}

export function told(ledger: Ledger, slug: string, now: string): Ledger {
  const one = ledger[slug]
  if (one === undefined) return ledger
  return { ...ledger, [slug]: { brokenSince: one.brokenSince, toldAt: now } }
}
