import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import {
  carrying,
  ledgerAt,
  ledgerIn,
  ledgerRead,
  ledgerWrite,
  ticking,
} from "akasha/infrastructure/services/workstations/service-watching/service-watching.module.code.ts"

const HOME = mkdtempSync("/var/tmp/service-watching-")

afterAll(() => rmSync(HOME, { recursive: true, force: true }))

const ROOT = process.cwd()

const OWN_SLUG = "service-watching"

const SERVICE_ENDING = ".service-workstation.ts"

test("a ledger that is not there is read as holding nothing", () => {
  expect(ledgerRead(HOME)).toEqual({})
})

test("a ledger written is read back as it was written", () => {
  const held = { "a-service": { brokenSince: "2026-09-08T00:00:00.000Z", toldAt: null } }
  ledgerWrite(HOME, held)
  expect(ledgerRead(HOME)).toEqual(held)
})

test("a ledger that will not parse is read as holding nothing rather than throwing", () => {
  const at = ledgerAt(HOME)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, "{ not json")
  expect(ledgerRead(HOME)).toEqual({})
})

test("an entry stating no day it broke is dropped rather than carried", () => {
  expect(ledgerIn('{"a":{"toldAt":"x"}}')).toEqual({})
  expect(ledgerIn('{"a":{"brokenSince":"x"}}')).toEqual({ a: { brokenSince: "x", toldAt: null } })
  expect(ledgerIn("[]")).toEqual({})
})

const BROKE = "2026-09-08T00:00:00.000Z"

const NOW = "2026-09-09T00:00:00.000Z"

const TELL = [
  { slug: "a-service", to: "ember", body: "`a-service` is broken." },
  { slug: "b-service", to: "aine", body: "`b-service` is broken." },
]

const KEEPING = {
  "a-service": { brokenSince: BROKE, toldAt: null },
  "b-service": { brokenSince: BROKE, toldAt: null },
}

test("what is told is written down only once the telling lands", async () => {
  const carried = await carrying({
    tell: TELL,
    keeping: KEEPING,
    home: HOME,
    now: NOW,
    send: async () => "nothing is waiting there",
  })
  expect(carried.told).toEqual([])
  expect(carried.refused.length).toBe(2)
  for (const one of Object.values(ledgerRead(HOME))) expect(one.toldAt).toBe(null)
})

test("a telling nobody takes is carried to the one stated instead", async () => {
  const asked: string[] = []
  const bodies: string[] = []
  const carried = await carrying({
    tell: [TELL[0] as (typeof TELL)[number]],
    keeping: KEEPING,
    home: HOME,
    now: NOW,
    send: async (to, body) => {
      asked.push(to)
      bodies.push(body)
      return to === "alan" ? null : "no seat is held"
    },
  })
  expect(asked).toEqual(["ember", "alan"])
  expect(bodies[1]).toContain("meant for `ember`")
  expect(carried.told).toEqual(["a-service to `alan`"])
  expect(ledgerRead(HOME)["a-service"]?.toldAt).toBe(NOW)
})

test("the tellings after a telling that lands nowhere still go out", async () => {
  const carried = await carrying({
    tell: TELL,
    keeping: KEEPING,
    home: HOME,
    now: NOW,
    send: async (to) => (to === "aine" ? null : "no seat is held"),
  })
  expect(carried.told).toEqual(["b-service to `aine`"])
  expect(carried.refused).toEqual(["a-service for `ember`: no seat is held"])
})

const LIVE_HOME = mkdtempSync("/var/tmp/service-watching-live-")

afterAll(() => rmSync(LIVE_HOME, { recursive: true, force: true }))

const LIVE_NOW = new Date().toISOString()

const SEEN: string[] = []

const NAMED: string[] = []

const LIVE = await ticking({
  root: ROOT,
  home: LIVE_HOME,
  now: LIVE_NOW,
  send: async () => null,
  keep: (root, health, at, slug) => {
    NAMED.push(`${root} ${at} ${slug}`)
    for (const one of health) SEEN.push(one.pagePath)
    return []
  },
})

test("a tick over the services there today writes a ledger and refuses nothing", () => {
  expect(LIVE.refused).toEqual([])
  expect(existsSync(ledgerAt(LIVE_HOME))).toBe(true)
})

test("this run hands the keeper every service, its moment and its own slug", () => {
  expect(NAMED).toEqual([`${ROOT} ${LIVE_NOW} ${OWN_SLUG}`])
  expect(SEEN.length).toBeGreaterThan(0)
  expect(SEEN.every((one) => one.endsWith(SERVICE_ENDING))).toBe(true)
  expect(SEEN.filter((one) => one.endsWith(`${OWN_SLUG}${SERVICE_ENDING}`)).length).toBe(1)
})
