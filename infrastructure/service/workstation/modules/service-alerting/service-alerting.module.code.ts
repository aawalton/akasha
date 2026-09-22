import type { DomainRow } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import type { Health } from "akasha/infrastructure/service/workstation/modules/service-health/service-health.module.code.ts"

const ADDRESS = "service-workstation/"
export const COOLING_MS = 24 * 60 * 60 * 1000

export type Outage = {
  readonly brokenSince: string | null
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

function bodyFor(one: Health, now: string): string {
  return [
    `\`${one.slug}\` is broken.`,
    `${one.broken ?? "Nothing said why"}.`,
    `This was seen at ${now}.`,
    `What that service is and what it runs are on its page.`,
    `Its log is \`journalctl --user -u ${one.unit}\`.`,
  ].join(" ")
}

export function passedOn(to: string, body: string, why: string): string {
  const said = why.endsWith(".") ? why : `${why}.`
  return `${body} This was meant for \`${to}\`, whom nothing could reach: ${said}`
}

export function owing(mark: string | null, now: string, coolingMs: number): boolean {
  if (mark === null) return true
  const marked = Date.parse(mark)
  if (!Number.isFinite(marked)) return true
  return Date.parse(now) - marked >= coolingMs
}

function brokenSlugs(health: readonly Health[]): ReadonlySet<string> {
  return new Set(health.filter((one) => one.broken !== null && one.told).map((one) => one.slug))
}

function hushedSlugs(health: readonly Health[]): ReadonlySet<string> {
  return new Set(health.filter((one) => !one.told).map((one) => one.slug))
}

function restingIn(given: {
  readonly ledger: Ledger
  readonly health: readonly Health[]
  readonly now: string
  readonly coolingMs: number
}): Record<string, Outage> {
  const broken = brokenSlugs(given.health)
  const hushed = hushedSlugs(given.health)
  const kept: Record<string, Outage> = {}
  for (const [slug, one] of Object.entries(given.ledger)) {
    if (broken.has(slug) || hushed.has(slug)) continue
    if (owing(one.toldAt, given.now, given.coolingMs)) continue
    kept[slug] = { brokenSince: null, toldAt: one.toldAt }
  }
  return kept
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
  const keeping = restingIn({
    ledger: given.ledger,
    health: given.health,
    now: given.now,
    coolingMs,
  })
  const tell: Telling[] = []
  for (const one of given.health) {
    if (one.broken === null || !one.told) continue
    const before = given.ledger[one.slug]
    const brokenSince = before?.brokenSince ?? given.now
    const toldAt = before?.toldAt ?? null
    keeping[one.slug] = { brokenSince, toldAt }
    if (!owing(toldAt, given.now, coolingMs)) continue
    tell.push({
      slug: one.slug,
      to: given.champion(`${ADDRESS}${one.slug}`) ?? given.fallback,
      body: bodyFor(one, given.now),
    })
  }
  return { tell, keeping }
}

export function told(ledger: Ledger, slug: string, now: string): Ledger {
  const one = ledger[slug]
  if (one === undefined) return ledger
  return { ...ledger, [slug]: { brokenSince: one.brokenSince, toldAt: now } }
}
