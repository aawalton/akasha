import { EXIT } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Asking as Asked } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Applied } from "akasha/commands/modules/applying/applying.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Refused } from "akasha/commands/modules/landing/landing.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  changesFor,
  heardPageIn,
  type Landing,
  type Ledger,
  type Planned,
  type Played,
  type Plays,
  plannedOver,
  WRITE,
} from "akasha/commands/pages/music/capture/music-capture.command.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const ROOT = rootOf(process.cwd())

const DAYS = "alan/track/daily/days/pages"

export const FILED_DAY = `${DAYS}/2026-08-21/day-2026-08-21.day`

export const PROBE_DAY = `${DAYS}/2026-09-02/day-2026-09-02.day`

export const FILED_PLAY_KEY = "4epeNxtHy14CVAP1rePJCs@2026-08-21T12:31:13.556Z"

export const FILED_HEARD_ID = "4yszZzrtrgEnCiuKNeKbpY"

export const NONE: Ledger = {
  playKeys: new Set(),
  heardIds: new Set(),
  heardKeys: new Set(),
  newestPlayedAt: null,
}

export const LEDGER: Ledger = { ...NONE, newestPlayedAt: "2026-08-20T00:00:00.000Z" }

export const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha",
  from: ".",
  writer: null,
  agentId: null,
}

export function playOf(id: string, at: string, name: string, artist: string, ms = 120_000): Played {
  return { track: { id, name, duration_ms: ms, artists: [{ name: artist }] }, played_at: at }
}

export const TWO_PLAYS: readonly Played[] = [
  playOf("t1", "2026-08-21T12:00:00.000Z", "One", "Alpha"),
  playOf("t2", "2026-08-21T12:05:00.000Z", "Two", "Beta"),
]

export const THREE_PLAYS: readonly Played[] = [
  ...TWO_PLAYS,
  playOf("t1", "2026-08-21T12:10:00.000Z", "One", "Alpha"),
]

export const REPEAT_PLAYS: readonly Played[] = [
  playOf("t1", "2026-08-21T12:09:00.000Z", "One", "Alpha"),
  playOf("t1", "2026-08-21T12:01:00.000Z", "One", "Alpha"),
]

export const EARLY_PLAYS: readonly Played[] = [
  playOf("t1", "2026-08-21T09:00:00.000Z", "One", "Alpha"),
  playOf("t2", "2026-08-21T11:00:00.000Z", "Two", "Beta"),
]

export const FILED_ONCE: Ledger = {
  ...LEDGER,
  playKeys: new Set(["t1@2026-08-21T12:00:00.000Z"]),
  heardIds: new Set(["t1"]),
}

export const LOCK_HELD: Refused = { refusals: ["the lock was held"], code: EXIT.OPERATIONAL }

export function rowsIn(planned: Planned, day: string): readonly Value[] {
  return planned.listens.get(day) ?? []
}

export function foldedInto(ledger: Ledger, planned: Planned): Ledger {
  const playKeys = new Set(ledger.playKeys)
  const heardIds = new Set(ledger.heardIds)
  const heardKeys = new Set(ledger.heardKeys)
  let newestPlayedAt = ledger.newestPlayedAt
  for (const rows of planned.listens.values()) {
    for (const one of rows) {
      playKeys.add(String(one["playKey"]))
      const at = String(one["playedAt"])
      if (newestPlayedAt === null || at > newestPlayedAt) newestPlayedAt = at
    }
  }
  for (const one of planned.heard) {
    heardIds.add(String(one["spotifyTrackId"]))
    heardKeys.add(String(one["titleKey"]))
  }
  return { playKeys, heardIds, heardKeys, newestPlayedAt }
}

export function ledgerPage(): string {
  const page = heardPageIn(ROOT)
  if (typeof page !== "string") throw new Error(`no one heard music page — ${page.refused}`)
  return page
}

export function changesOver(at: string): readonly Asked[] {
  const planned = plannedOver([playOf("probe-track-nine", at, "Probe Nine", "Probe Artist Nine")], {
    ...NONE,
    newestPlayedAt: "2026-08-21T00:00:00.000Z",
  })
  const changes = changesFor(ROOT, ledgerPage(), planned)
  if ("refused" in changes) throw new Error(`the changes were refused — ${changes.refused}`)
  return changes
}

export function pathsOf(changes: readonly Asked[]): readonly string[] {
  const held: string[] = []
  for (const one of changes) {
    if (one.at === WRITE) held.push(one.given.at)
  }
  return held
}

export function bodyAt(changes: readonly Asked[], path: string): string {
  for (const one of changes) {
    if (one.at !== WRITE || one.given.at !== path) continue
    return one.given.body
  }
  throw new Error(`no change was made for ${path}`)
}

export function oldAt(changes: readonly Asked[], path: string): string | undefined {
  for (const one of changes) {
    if (one.at !== WRITE || one.given.at !== path) continue
    return one.given.old
  }
  throw new Error(`no change was made for ${path}`)
}

export const LANDED: Applied = {
  base: "6666666666666666666666666666666666666666",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "7777777777777777777777777777777777777777",
}

export type Told = (changes: readonly Asked[], message: string) => undefined

export function landingTelling(told: Told, answer: Applied | Refused = LANDED): Landing {
  return (_root, changes, message) => {
    told(changes, message)
    return Promise.resolve(answer)
  }
}

export const PROBE_PLAYS: Plays = async () => ({
  items: [
    playOf("probe-track-nine", "2026-09-02T12:00:00.000Z", "Probe Nine", "Probe Artist Nine"),
  ],
})

export const TOLD_NOTHING: Told = () => undefined
