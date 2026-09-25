import { domainsDrawn } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import {
  COOLING_MS,
  championing,
  deciding,
  owing,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-alerting/service-alerting.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"
import {
  brokenIn,
  type Health,
  stateFor,
  watchedIn,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-health/service-health.module.code.ts"
import { readFor } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-reading/service-reading.module.code.ts"
import {
  carrying,
  homeAt,
  ledgerRead,
  type Sent,
  sending,
  type Ticked,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-watching/service-watching.module.code.ts"
import { SERVICE_SUFFIX } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/unit-writing/unit-writing.module.code.ts"

const FALLBACK = "alan"
const SAID = "service-telling:"
const AGAIN = "and systemd had started it again by the time this read it"
const NOTHING_NAMED = "no unit is named, so nothing is told"

type Shown = (units: readonly string[]) => string

export function slugOf(named: string): string {
  return named.endsWith(SERVICE_SUFFIX) ? named.slice(0, -SERVICE_SUFFIX.length) : named
}

function unitOf(slug: string): string {
  return `${slug}${SERVICE_SUFFIX}`
}

function strangely(slug: string, why: string): Health {
  return {
    slug,
    unit: unitOf(slug),
    pagePath: "",
    broken: `${unitOf(slug)} failed, and ${why}`,
    told: true,
  }
}

export function healthAsked(given: {
  readonly root: string
  readonly slug: string
  readonly now: Date
  readonly show?: Shown
}): readonly Health[] {
  const read = readFor(given.root, given.slug)
  if ("unnamed" in read) return [strangely(given.slug, read.unnamed)]
  if ("refused" in read) return [strangely(given.slug, read.refused)]
  const one = watchedIn(given.root, read.services)[0]
  if (one === undefined) return []
  const broken = brokenIn(one, stateFor(one.unit, given.show), given.now)
  return [
    {
      slug: one.slug,
      unit: one.unit,
      pagePath: one.pagePath,
      broken: broken ?? `${one.unit} failed, ${AGAIN}`,
      told: one.told,
    },
  ]
}

export async function telling(given: {
  readonly root: string
  readonly home: string
  readonly slug: string
  readonly now: string
  readonly send?: Sent
  readonly show?: Shown
}): Promise<Ticked> {
  const ledger = ledgerRead(given.home)
  const before = ledger[given.slug]
  if (before !== undefined && !owing(before.toldAt, given.now, COOLING_MS)) {
    return { told: [], refused: [] }
  }
  const decided = deciding({
    health: healthAsked({
      root: given.root,
      slug: given.slug,
      now: new Date(given.now),
      show: given.show,
    }),
    champion: championing(domainsDrawn(given.root)),
    ledger: before === undefined ? {} : { [given.slug]: before },
    now: given.now,
    fallback: FALLBACK,
  })
  return carrying({
    tell: decided.tell,
    keeping: { ...ledger, ...decided.keeping },
    home: given.home,
    now: given.now,
    send: given.send ?? sending,
  })
}

export async function runServiceTelling(named: string | undefined): Promise<void> {
  if (named === undefined || named.trim() === "") {
    process.stderr.write(`${SAID} ${NOTHING_NAMED}\n`)
    process.exitCode = 1
    return
  }
  const ticked = await telling({
    root: checkoutAt(),
    home: homeAt(),
    slug: slugOf(named.trim()),
    now: new Date().toISOString(),
  })
  for (const one of ticked.told) process.stdout.write(`${SAID} told ${one}\n`)
  for (const one of ticked.refused) process.stderr.write(`${SAID} nothing told for ${one}\n`)
}

if (import.meta.main) {
  await runServiceTelling(process.argv[2])
}
