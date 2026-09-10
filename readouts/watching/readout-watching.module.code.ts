import { join } from "node:path"
import { indexNamed } from "@akasha/indexes"
import { indexValue } from "@akasha/indexes/value/page"
import {
  followFolders,
  followWithin,
} from "akasha/services/workstation-services/file-following/file-following.module.code.ts"
import { saidBy } from "../../commands/modules/fault-saying/fault-saying.module.code.ts"
import { keepReading } from "../reading/readout-reading.module.code.ts"
import {
  NO_SECRET_TO_CARRY_ON,
  RELAY_SECRET_NAME,
  readoutNamedBy,
  relayReading,
  statedIn,
} from "../relay/readout-relay.module.code.ts"

export const SETTLE_MS = 250

export type WatchLogger = (level: "INFO" | "ERROR", message: string) => undefined

export type WatchedReadout = {
  readonly page: string
  readonly folders: readonly string[]
  readonly holds: (at: string) => boolean
  readonly movesWithIndex?: boolean
  readonly to: readonly string[]
  readonly take: (now: Date) => Promise<number | null>
}

export type Kept = (root: string, page: string, value: number, at: Date) => undefined

export type Carried = (
  to: string,
  secret: string,
  page: string,
  value: number,
  at: string
) => Promise<undefined>

export type WatchSetup = {
  readonly root: string
  readonly watched: readonly WatchedReadout[]
  readonly said: WatchLogger
  readonly ended: (thrown: unknown) => undefined
  readonly secret?: string | null
  readonly kept?: Kept
  readonly carried?: Carried
  readonly settleMs?: number
}

export type Taking = {
  readonly open: () => undefined
  readonly moved: (what: readonly string[]) => undefined
  readonly indexMoved: () => undefined
  readonly settled: () => Promise<undefined>
}

export type Watching = {
  readonly stop: () => undefined
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

export function valuesFollowedIn(root: string): string {
  return join(root, indexNamed(), indexValue.name)
}

export function unfollowedSaid(at: string): string {
  return (
    `'${at}' cannot be followed, so nothing read from it is taken again until this watch ` +
    "starts over"
  )
}

export function uncarriedSaid(page: string, to: string, thrown: unknown): string {
  return `the reading of '${readoutNamedBy(page)}' was not carried to ${to}: ${saidBy(thrown)}`
}

export function takenSaid(page: string, value: number): string {
  return `${readoutNamedBy(page)}=${value}`
}

export function carryReading(
  to: string,
  secret: string,
  page: string,
  value: number,
  at: string
): Promise<undefined> {
  return relayReading(to, secret, { readout: readoutNamedBy(page), value, at })
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
        if (secret !== null) {
          for (const to of one.to) {
            try {
              await carried(to, secret, one.page, value, at)
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

  const run = (one: WatchedReadout): undefined => {
    const held: Promise<undefined> = takeOne(one)
      .catch((thrown: unknown): undefined => {
        setup.said("ERROR", saidBy(thrown))
        setup.ended(thrown)
        return undefined
      })
      .then((): undefined => {
        running.delete(held)
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
    indexMoved: (): undefined => {
      for (const one of setup.watched) if (one.movesWithIndex === true) run(one)
      return undefined
    },
    settled: async (): Promise<undefined> => {
      while (running.size > 0) await Promise.all([...running])
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
  const indexed = followFolders(
    new Set([valuesFollowedIn(setup.root)]),
    taking.indexMoved,
    settleMs
  )
  const unfollowed = [...following.unfollowed, ...indexed.unfollowed].sort()
  for (const at of unfollowed) setup.said("ERROR", unfollowedSaid(at))
  return {
    stop: (): undefined => {
      following.stop()
      indexed.stop()
      return undefined
    },
    settled: taking.settled,
    unfollowed,
  }
}
