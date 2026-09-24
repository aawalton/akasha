import {
  keepReading,
  NOT_FALLING,
  readingKept,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import {
  NO_SECRET_TO_CARRY_ON,
  RELAY_SECRET_NAME,
  readoutNamedBy,
  relayReading,
  statedIn,
} from "akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { followWithin } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/file-following/file-following.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

export const SETTLE_MS = 250

const ENDING_GRACE_MS = 10_000

export type WatchLogger = (level: "INFO" | "ERROR", message: string) => undefined

export type WatchedReadout = {
  readonly page: string
  readonly folders: readonly string[]
  readonly holds: (at: string) => boolean
  readonly to: readonly string[]
  readonly take: (now: Date) => Promise<number | null>
}

export type Kept = (root: string, page: string, value: number, at: Date) => undefined

export type Carried = (
  to: string,
  secret: string,
  page: string,
  value: number,
  at: string,
  fallsPerHour: number
) => Promise<undefined>

export type Beat = (at: Date) => undefined

export type WatchSetup = {
  readonly root: string
  readonly watched: readonly WatchedReadout[]
  readonly said: WatchLogger
  readonly ended: (thrown: unknown) => undefined
  readonly secret?: string | null
  readonly kept?: Kept
  readonly carried?: Carried
  readonly settleMs?: number
  readonly beat?: Beat
  readonly endingGraceMs?: number
}

export type Taking = {
  readonly open: () => undefined
  readonly moved: (what: readonly string[]) => undefined
  readonly settled: () => Promise<undefined>
  readonly stop: () => undefined
}

export type Watching = {
  readonly stop: () => undefined
  readonly retake: () => undefined
  readonly settled: () => Promise<undefined>
  readonly unfollowed: readonly string[]
}

export function foldersOf(watched: readonly WatchedReadout[]): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of watched) for (const at of one.folders) held.add(at)
  return held
}

export function holdsAny(watched: readonly WatchedReadout[]): (at: string) => boolean {
  return (at) => watched.some((one) => one.holds(at))
}

function unfollowedSaid(at: string): string {
  return (
    `'${at}' cannot be followed, so nothing read from it is taken again until this watch ` +
    "starts over"
  )
}

function uncarriedSaid(page: string, to: string, thrown: unknown): string {
  return `the reading of '${readoutNamedBy(page)}' was not carried to ${to}: ${saidBy(thrown)}`
}

function takenSaid(page: string, value: number): string {
  return `${readoutNamedBy(page)}=${value}`
}

function unbeatenSaid(thrown: unknown): string {
  return `the round of takes landed and saying so did not: ${saidBy(thrown)}`
}

function carryReading(
  to: string,
  secret: string,
  page: string,
  value: number,
  at: string,
  fallsPerHour: number
): Promise<undefined> {
  return relayReading(to, secret, { readout: readoutNamedBy(page), value, at, fallsPerHour })
}

function fallsPerHourKept(root: string, page: string): number {
  return readingKept(root, page)?.fallsPerHour ?? NOT_FALLING
}

export function takingOf(setup: WatchSetup): Taking {
  const kept = setup.kept ?? keepReading
  const carried = setup.carried ?? carryReading
  const secret =
    setup.secret === undefined ? statedIn(process.env, RELAY_SECRET_NAME) : setup.secret
  if (secret === null) setup.said("ERROR", NO_SECRET_TO_CARRY_ON)
  const before = new Map<string, number | null>()
  const taking = new Set<string>()
  const owed = new Set<string>()
  const running = new Set<Promise<undefined>>()
  let faulted: { readonly what: unknown } | null = null
  let ending: ReturnType<typeof setTimeout> | null = null

  const takeOne = async (one: WatchedReadout): Promise<undefined> => {
    if (taking.has(one.page)) {
      owed.add(one.page)
      return undefined
    }
    taking.add(one.page)
    try {
      do {
        owed.delete(one.page)
        const now = new Date()
        const value = await one.take(now)
        if (before.has(one.page) && before.get(one.page) === value) continue
        before.set(one.page, value)
        if (value === null) continue
        kept(setup.root, one.page, value, now)
        const at = now.toISOString()
        const falls = fallsPerHourKept(setup.root, one.page)
        if (secret !== null) {
          for (const to of one.to) {
            try {
              await carried(to, secret, one.page, value, at, falls)
            } catch (thrown) {
              setup.said("ERROR", uncarriedSaid(one.page, to, thrown))
            }
          }
        }
        setup.said("INFO", takenSaid(one.page, value))
      } while (owed.has(one.page))
    } finally {
      taking.delete(one.page)
    }
    return undefined
  }

  const beat = (): undefined => {
    const say = setup.beat
    if (say === undefined) return undefined
    try {
      say(new Date())
    } catch (what) {
      setup.said("ERROR", unbeatenSaid(what))
    }
    return undefined
  }

  const end = (): undefined => {
    const held = faulted
    if (held === null) return undefined
    faulted = null
    if (ending !== null) {
      clearTimeout(ending)
      ending = null
    }
    setup.ended(held.what)
    return undefined
  }

  const drained = (): undefined => {
    if (running.size > 0) return undefined
    if (faulted !== null) return end()
    return beat()
  }

  const run = (one: WatchedReadout): undefined => {
    const held: Promise<undefined> = takeOne(one)
      .catch((what: unknown): undefined => {
        setup.said("ERROR", saidBy(what))
        if (faulted === null) {
          faulted = { what }
          ending = setTimeout(end, setup.endingGraceMs ?? ENDING_GRACE_MS)
        }
        return undefined
      })
      .then((): undefined => {
        running.delete(held)
        drained()
        return undefined
      })
    running.add(held)
    return undefined
  }

  return {
    open: (): undefined => {
      for (const one of setup.watched) run(one)
      return undefined
    },
    moved: (what: readonly string[]): undefined => {
      for (const one of setup.watched) if (what.some(one.holds)) run(one)
      return undefined
    },
    settled: async (): Promise<undefined> => {
      while (running.size > 0) await Promise.all([...running])
      return undefined
    },
    stop: (): undefined => {
      if (ending !== null) {
        clearTimeout(ending)
        ending = null
      }
      return undefined
    },
  }
}

export function watchReadings(setup: WatchSetup): Watching {
  const taking = takingOf(setup)
  taking.open()
  const settleMs = setup.settleMs ?? SETTLE_MS
  const following = followWithin(
    foldersOf(setup.watched),
    holdsAny(setup.watched),
    taking.moved,
    settleMs
  )
  const unfollowed = [...following.unfollowed].sort()
  for (const at of unfollowed) setup.said("ERROR", unfollowedSaid(at))
  return {
    stop: (): undefined => {
      following.stop()
      taking.stop()
      return undefined
    },
    retake: taking.open,
    settled: taking.settled,
    unfollowed,
  }
}
