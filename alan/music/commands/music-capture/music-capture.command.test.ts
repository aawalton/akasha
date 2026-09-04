import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { rootOf } from "@akasha/command-system/rooting"
import type { Value } from "@akasha/pages-system/page-value"
import {
  appendedOnto,
  askingFor,
  capturing,
  changesFor,
  filedIn,
  heardPageIn,
  jsonOf,
  type Ledger,
  type Planned,
  type Played,
  type Plays,
  plannedOver,
  providerTrackIn,
  readPlay,
  rowsOf,
  taken,
} from "./music-capture.command.code.ts"

const ROOT = rootOf(import.meta.dir)

const DAYS = "akasha/alan/tracking/daily/eso-days/pages"

const FILED_DAY = `${DAYS}/2026-08-21/eso-day-2026-08-21.eso-day`

const NEW_DAY = `${DAYS}/2026-09-02/eso-day-2026-09-02.eso-day`

const FILED_PLAY_KEY = "4epeNxtHy14CVAP1rePJCs@2026-08-21T12:31:13.556Z"

const FILED_HEARD_ID = "4yszZzrtrgEnCiuKNeKbpY"

const NONE: Ledger = {
  playKeys: new Set(),
  heardIds: new Set(),
  heardKeys: new Set(),
  newestPlayedAt: null,
}

const LEDGER: Ledger = { ...NONE, newestPlayedAt: "2026-08-20T00:00:00.000Z" }

const GIVEN: Given = { root: ROOT, calledAs: "akasha", from: ".", writer: null, agentId: null }

function playOf(id: string, at: string, name: string, artist: string, ms = 120_000): Played {
  return { track: { id, name, duration_ms: ms, artists: [{ name: artist }] }, played_at: at }
}

function foldedInto(ledger: Ledger, planned: Planned): Ledger {
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

function refusalOf(argv: readonly string[]): string {
  const held = taken(argv)
  if (!("refused" in held)) throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  return held.refused
}

function rowsIn(planned: Planned, day: string): readonly Value[] {
  return planned.listens.get(day) ?? []
}

function ledgerPage(): string {
  const page = heardPageIn(ROOT)
  if (typeof page !== "string") throw new Error(`no one heard music page — ${page.refused}`)
  return page
}

function changesOver(at: string): readonly FileEdit[] {
  const planned = plannedOver([playOf("probe-track-nine", at, "Probe Nine", "Probe Artist Nine")], {
    ...NONE,
    newestPlayedAt: "2026-08-21T00:00:00.000Z",
  })
  const changes = changesFor(ROOT, ledgerPage(), planned)
  if ("refused" in changes) throw new Error(`the changes were refused — ${changes.refused}`)
  return changes
}

function bodyAt(changes: readonly FileEdit[], path: string): string {
  const found = changes.find((one) => one.path === path)
  if (found?.body == null) throw new Error(`no change was made for ${path}`)
  return new TextDecoder().decode(found.body)
}

test("a flag this takes nothing of is refused", () => {
  expect(refusalOf(["--limit", "5"])).toContain("`--limit` is nothing this takes")
})

test("a flag named twice is refused", () => {
  expect(refusalOf(["--json", "--json"])).toContain("named twice")
})

test("what is said is taken as it is said", () => {
  expect(taken([])).toEqual({ dryRun: false, json: false })
  expect(taken(["--dry-run", "--json"])).toEqual({ dryRun: true, json: true })
})

test("a track Spotify names no id for is read as no play", () => {
  expect(providerTrackIn({ id: null, name: "One" })).toBe(null)
  expect(providerTrackIn({ name: "One" })).toBe(null)
  expect(providerTrackIn({ id: "", name: "One" })).toBe(null)
  expect(providerTrackIn("one")).toBe(null)
})

test("a track field of the wrong sort is read as no play rather than as a default", () => {
  expect(providerTrackIn({ id: "a", name: 9 })).toBe(null)
  expect(providerTrackIn({ id: "a", duration_ms: "long" })).toBe(null)
  expect(providerTrackIn({ id: "a", artists: "nobody" })).toBe(null)
})

test("a track names its first artist, and none where Spotify names none", () => {
  const many = { id: "a", artists: [{ name: "One" }, { name: "Two" }] }
  expect(providerTrackIn(many)?.artistName).toBe("One")
  expect(providerTrackIn({ id: "a" })?.artistName).toBe("")
  expect(providerTrackIn({ id: "a", artists: [] })?.artistName).toBe("")
})

test("a play carries when it finished and how long the track runs", () => {
  expect(readPlay(playOf("a", "2026-08-21T12:00:00.000Z", "One", "Two"))).toEqual({
    trackId: "a",
    trackName: "One",
    artistName: "Two",
    playedAt: "2026-08-21T12:00:00.000Z",
    durationMs: 120_000,
  })
})

test("the window asked for opens just past the newest play filed", () => {
  const after = new Date("2026-08-20T00:00:00.000Z").getTime() + 1
  expect(askingFor(LEDGER)).toEqual({ limit: 50, after })
})

test("a run with no play filed asks for the whole window Spotify gives back", () => {
  expect(askingFor(NONE)).toEqual({ limit: 50 })
})

test("a priming run files every play and scores no first listen", () => {
  const planned = plannedOver(
    [
      playOf("t1", "2026-08-21T12:00:00.000Z", "One", "Alpha"),
      playOf("t2", "2026-08-21T12:05:00.000Z", "Two", "Beta"),
    ],
    NONE
  )
  expect(planned.primed).toBe(true)
  expect(planned.recorded).toBe(2)
  expect(planned.firstListens).toBe(0)
  expect(planned.newMusicMinutes).toBe(0)
  expect(rowsIn(planned, "2026-08-21").map((one) => one["firstListen"])).toEqual([false, false])
  expect(planned.heard[0]?.["heardSource"]).toBe("seed-prior-window")
})

test("a run that is no priming run scores a first listen for a track never heard", () => {
  const planned = plannedOver([playOf("t1", "2026-08-21T12:00:00.000Z", "One", "Alpha")], LEDGER)
  expect(planned.primed).toBe(false)
  expect(planned.firstListens).toBe(1)
  expect(planned.newMusicMinutes).toBe(2)
  expect(planned.heard[0]?.["heardSource"]).toBe("observed")
})

test("a track already heard scores no first listen and reaches the ledger no again", () => {
  const held: Ledger = { ...LEDGER, heardIds: new Set(["t1"]) }
  const planned = plannedOver([playOf("t1", "2026-08-21T12:00:00.000Z", "One", "Alpha")], held)
  expect(planned.recorded).toBe(1)
  expect(planned.firstListens).toBe(0)
  expect(planned.heard).toEqual([])
})

test("a track heard under another id is caught by its title key", () => {
  const held: Ledger = { ...LEDGER, heardKeys: new Set(["one|alpha"]) }
  const planned = plannedOver([playOf("t9", "2026-08-21T12:00:00.000Z", "One", "Alpha")], held)
  expect(planned.firstListens).toBe(0)
  expect(planned.heard).toEqual([])
})

test("two plays of one new track in a run are one heard track and one first listen", () => {
  const planned = plannedOver(
    [
      playOf("t1", "2026-08-21T12:09:00.000Z", "One", "Alpha"),
      playOf("t1", "2026-08-21T12:01:00.000Z", "One", "Alpha"),
    ],
    LEDGER
  )
  expect(planned.recorded).toBe(2)
  expect(planned.heard.length).toBe(1)
  expect(planned.firstListens).toBe(1)
  expect(planned.heard[0]?.["firstHeardAt"]).toBe("2026-08-21T12:01:00.000Z")
  expect(rowsIn(planned, "2026-08-21").map((one) => one["firstListen"])).toEqual([true, false])
})

test("a play key already filed is counted and written no second time", () => {
  const held: Ledger = {
    ...LEDGER,
    playKeys: new Set(["t1@2026-08-21T12:00:00.000Z"]),
    heardIds: new Set(["t1"]),
  }
  const planned = plannedOver([playOf("t1", "2026-08-21T12:00:00.000Z", "One", "Alpha")], held)
  expect(planned.recorded).toBe(0)
  expect(planned.alreadyRecorded).toBe(1)
  expect(planned.listens.size).toBe(0)
})

test("the same plays run a second time over what the first run filed add nothing", () => {
  const plays = [
    playOf("t1", "2026-08-21T12:00:00.000Z", "One", "Alpha"),
    playOf("t2", "2026-08-21T12:05:00.000Z", "Two", "Beta"),
    playOf("t1", "2026-08-21T12:10:00.000Z", "One", "Alpha"),
  ]
  const first = plannedOver(plays, LEDGER)
  expect(first.recorded).toBe(3)
  expect(first.heard.length).toBe(2)
  expect(first.firstListens).toBe(2)

  const second = plannedOver(plays, foldedInto(LEDGER, first))
  expect(second.recorded).toBe(0)
  expect(second.alreadyRecorded).toBe(3)
  expect(second.heard).toEqual([])
  expect(second.firstListens).toBe(0)
  expect(second.listens.size).toBe(0)
  expect(second.newMusicMinutes).toBe(0)
})

test("a priming run followed by a second run leaves the back catalogue unscored", () => {
  const plays = [playOf("t1", "2026-08-21T12:00:00.000Z", "One", "Alpha")]
  const first = plannedOver(plays, NONE)
  expect(first.firstListens).toBe(0)
  const later = plannedOver(
    [...plays, playOf("t1", "2026-08-21T13:00:00.000Z", "One", "Alpha")],
    foldedInto(NONE, first)
  )
  expect(later.primed).toBe(false)
  expect(later.recorded).toBe(1)
  expect(later.firstListens).toBe(0)
})

test("a play whose track carries no id is passed over and counted", () => {
  const items = [{ track: { name: "One" }, played_at: "2026-08-21T12:00:00.000Z" }]
  const planned = plannedOver(items, LEDGER)
  expect(planned.skippedUnidentified).toBe(1)
  expect(planned.recorded).toBe(0)
})

test("a play lands on the ESO day it finished in rather than on a field of its own", () => {
  const planned = plannedOver(
    [
      playOf("t1", "2026-08-21T09:00:00.000Z", "One", "Alpha"),
      playOf("t2", "2026-08-21T11:00:00.000Z", "Two", "Beta"),
    ],
    LEDGER
  )
  expect([...planned.listens.keys()].sort()).toEqual(["2026-08-20", "2026-08-21"])
  for (const rows of planned.listens.values()) {
    for (const one of rows) expect("date" in one).toBe(false)
  }
})

test("a listen names its keys and no persona, and a heard track names its own", () => {
  const planned = plannedOver([playOf("t1", "2026-08-21T12:00:00.000Z", "One", "Alpha")], LEDGER)
  expect(Object.keys(rowsIn(planned, "2026-08-21")[0] ?? {})).toEqual([
    "playKey",
    "spotifyTrackId",
    "playedAt",
    "trackName",
    "artistName",
    "minutes",
    "firstListen",
    "newMusicMinutes",
  ])
  expect(Object.keys(planned.heard[0] ?? {})).toEqual([
    "spotifyTrackId",
    "titleKey",
    "trackName",
    "artistName",
    "firstHeardAt",
    "heardSource",
  ])
})

test("an append keeps every byte already there and adds a line for each row", () => {
  expect(appendedOnto('{"at":1}\n', [{ at: 2 }])).toBe('{"at":1}\n{"at":2}\n')
  expect(appendedOnto(null, [{ at: 1 }])).toBe('{"at":1}\n')
  expect(appendedOnto("", [{ at: 1 }])).toBe('{"at":1}\n')
  expect(appendedOnto('{"at":1}', [{ at: 2 }])).toBe('{"at":1}\n{"at":2}\n')
})

test("what is filed is read off Alan's own listens and heard tracks", () => {
  const filed = filedIn(ROOT)
  if ("refused" in filed) throw new Error(`what is filed went unread — ${filed.refused}`)
  expect(filed.heardPage).toBe(ledgerPage())
  expect(filed.ledger.playKeys.has(FILED_PLAY_KEY)).toBe(true)
  expect(filed.ledger.heardIds.has(FILED_HEARD_ID)).toBe(true)
  expect(filed.ledger.newestPlayedAt).not.toBe(null)
})

test("a listen appended to a day already filed keeps every row and property that day held", () => {
  const changes = changesOver("2026-08-21T12:00:00.000Z")
  const was = readFileSync(join(ROOT, `${FILED_DAY}.listens.jsonl`), "utf8")
  const now = bodyAt(changes, `${FILED_DAY}.listens.jsonl`)
  expect(now.startsWith(was)).toBe(true)
  expect(now.split("\n").length).toBe(was.split("\n").length + 1)
  const page = bodyAt(changes, `${FILED_DAY}.ts`)
  expect(page).toContain('listens: "jsonl"')
  expect(page).toContain('healthSamples: "jsonl"')
})

test("a heard track appended keeps every track the ledger already named", () => {
  const beside = ledgerPage().replace(/\.ts$/, ".tracks.jsonl")
  const now = bodyAt(changesOver("2026-08-21T12:00:00.000Z"), beside)
  expect(now.startsWith(readFileSync(join(ROOT, beside), "utf8"))).toBe(true)
})

test("a day with no page of its own gets one written beside the day it names", () => {
  const paths = changesOver("2026-09-02T12:00:00.000Z").map((one) => one.path)
  expect(paths).toContain(`${NEW_DAY}.ts`)
  expect(paths).toContain(`${NEW_DAY}.listens.jsonl`)
})

test("a run that fetches nothing lands nothing and says so", async () => {
  const plays: Plays = async () => ({ items: [] })
  const said = await capturing([], GIVEN, plays)
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain("nothing was played that is not already filed")
})

test("what this does not take is refused before Spotify is asked anything", async () => {
  const plays: Plays = async () => {
    throw new Error("Spotify was asked, and this test answers nothing")
  }
  const said = await capturing(["--nope"], GIVEN, plays)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("`--nope` is nothing this takes")
})

test("what was filed is said as rows or as JSON", () => {
  const planned = plannedOver([playOf("t1", "2026-08-21T12:00:00.000Z", "One", "Alpha")], LEDGER)
  expect(rowsOf(planned).join("\n")).toContain("recorded\t1")
  expect(JSON.parse(jsonOf(planned))).toMatchObject({
    recorded: 1,
    firstListens: 1,
    esoDays: ["2026-08-21"],
    primed: false,
  })
})
