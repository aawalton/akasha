import { getEsoDayStr } from "@akasha/day/eso-day"
import {
  newestOfKind,
  writeNotification,
} from "../../notification-feeds/notification-feed-rows/notification-feed-rows.module.code.ts"
import { ALAN_PERSON } from "../../notification-feeds/notifying/notifying.module.code.ts"
import {
  type Readout,
  readReading,
  readSleepHours,
  resolveOneReadout,
} from "../surplus-fall-readout/surplus-fall-readout.module.code.ts"
import {
  decideFall,
  isTierColor,
  TIER_ORDER,
  type TierColor,
  tierAt,
} from "../surplus-fall-tier/surplus-fall-tier.module.code.ts"

export const WORKER_NAME = "surplus-fall-notifier"

export const LOG = `${WORKER_NAME}:`

export const GROUP_SLUG = "surplus"

export const KIND = "surplus-fall"

export const SOURCE_PREFIX = "surplus-fall/"

export const SAID_AT_ONCE = 50

export const TICK_MS = 300_000

export const TICK_CEILING_MS = 60_000

export function fallBody(label: string, tier: TierColor): string {
  return `${label} has fallen to ${tier}.`
}

export function isWorse(tier: TierColor, than: TierColor): boolean {
  return TIER_ORDER.indexOf(tier) < TIER_ORDER.indexOf(than)
}

export function sourceFor(tier: TierColor): string {
  return `${SOURCE_PREFIX}${tier}`
}

export function tierInSource(said: unknown): TierColor | null {
  if (typeof said !== "string" || !said.startsWith(SOURCE_PREFIX)) return null
  const held = said.slice(SOURCE_PREFIX.length)
  return isTierColor(held) ? held : null
}

export async function tierSaidOn(day: string): Promise<TierColor | null> {
  const said = await newestOfKind(KIND, SAID_AT_ONCE)
  let worst: TierColor | null = null
  for (const one of said) {
    const at = new Date(one.sentAt)
    if (Number.isNaN(at.getTime()) || getEsoDayStr(at) !== day) continue
    const tier = tierInSource(one.source)
    if (tier === null) continue
    if (worst === null || isWorse(tier, worst)) worst = tier
  }
  return worst
}

async function tierOrNull(
  readout: Readout,
  reading: Promise<number | null>
): Promise<TierColor | null> {
  const held = await reading
  return held === null ? null : tierAt(held, readout.rungs)
}

export async function runSurplusFallTick(
  day: string,
  writer: string,
  signal: AbortSignal
): Promise<void> {
  const readout = await resolveOneReadout(GROUP_SLUG)
  const [current, opening] = await Promise.all([
    tierOrNull(readout, readReading(day)),
    tierOrNull(readout, readSleepHours(day)),
  ])

  const decision = decideFall(opening, current)
  if (!decision.fell) {
    console.log(`${LOG} ${day}: nothing to say — ${decision.why}`)
    return
  }

  signal.throwIfAborted()
  const said = await tierSaidOn(day)
  if (said !== null && !isWorse(decision.tier, said)) {
    console.log(
      `${LOG} ${day}: ${decision.tier} is no worse than the ${said} already said today; nothing written`
    )
    return
  }

  const written = await writeNotification(
    ALAN_PERSON,
    {
      title: readout.label,
      body: fallBody(readout.label, decision.tier),
      kind: KIND,
      source: sourceFor(decision.tier),
    },
    writer
  )
  if (!written.ok) throw new Error(`${LOG} ${day}: ${written.why}`)

  console.log(`${LOG} ${day}: wrote a fall to ${decision.tier}`)
}

export async function runBoundedSurplusFallTick(
  writer: string,
  signal: AbortSignal
): Promise<void> {
  const day = getEsoDayStr(new Date())
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            `${LOG} a tick has not answered inside ${TICK_CEILING_MS}ms while reading the surplus; ` +
              "ending rather than starting a second tick beside it"
          )
        ),
      TICK_CEILING_MS
    )
  })
  try {
    await Promise.race([runSurplusFallTick(day, writer, signal), ceiling])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}
