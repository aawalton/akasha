import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  healthAsked,
  slugOf,
  telling,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-telling/service-telling.module.code.ts"
import {
  ledgerRead,
  ledgerWrite,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-watching/service-watching.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const HOME = mkdtempSync("/var/tmp/service-telling-")

afterAll(() => rmSync(HOME, { recursive: true, force: true }))

const WATCHED = "service-watching"

const NOW = "2026-09-22T00:00:00.000Z"

const BROKE = "2026-09-08T00:00:00.000Z"

const A_DAY = 24 * 60 * 60 * 1000

function shownAs(activeState: string, result: string) {
  return (units: readonly string[]): string =>
    units
      .map(
        (unit) =>
          `Id=${unit}\nActiveState=${activeState}\nResult=${result}\nStateChangeTimestamp=@0`
      )
      .join("\n\n")
}

const FAILED = shownAs("failed", "exit-code")

const RUNNING = shownAs("active", "success")

let made = 0

function homeOf(): string {
  made += 1
  return mkdtempSync(`${HOME}/${made}-`)
}

test("a name handed in with its unit suffix is read as the service's slug", () => {
  expect(slugOf("ttc-client.service")).toBe("ttc-client")
  expect(slugOf("ttc-client")).toBe("ttc-client")
})

test("a unit that failed is told once, and the ledger carries that telling", async () => {
  const home = homeOf()
  const sent: string[] = []
  const ticked = await telling({
    root: ROOT,
    home,
    slug: WATCHED,
    now: NOW,
    send: async (_to, body) => {
      sent.push(body)
      return null
    },
    show: FAILED,
  })
  expect(ticked.refused).toEqual([])
  expect(sent.length).toBe(1)
  expect(sent[0]).toContain(`\`${WATCHED}\` is broken.`)
  expect(ledgerRead(home)[WATCHED]?.toldAt).toBe(NOW)
})

test("a unit told inside its cooling reads systemd nothing and tells nobody", async () => {
  const home = homeOf()
  ledgerWrite(home, { [WATCHED]: { brokenSince: BROKE, toldAt: NOW } })
  let asked = 0
  const ticked = await telling({
    root: ROOT,
    home,
    slug: WATCHED,
    now: NOW,
    send: async () => {
      throw new Error("a telling inside the cooling was sent")
    },
    show: (units) => {
      asked += 1
      return FAILED(units)
    },
  })
  expect(ticked).toEqual({ told: [], refused: [] })
  expect(asked).toBe(0)
  expect(ledgerRead(home)[WATCHED]?.toldAt).toBe(NOW)
})

test("a unit told right through its cooling is told once more", async () => {
  const home = homeOf()
  const after = new Date(Date.parse(NOW) + A_DAY).toISOString()
  ledgerWrite(home, { [WATCHED]: { brokenSince: BROKE, toldAt: NOW } })
  const ticked = await telling({
    root: ROOT,
    home,
    slug: WATCHED,
    now: after,
    send: async () => null,
    show: FAILED,
  })
  expect(ticked.told.length).toBe(1)
  expect(ledgerRead(home)[WATCHED]?.toldAt).toBe(after)
})

test("a telling for one service takes no other service's entry out of the ledger", async () => {
  const home = homeOf()
  ledgerWrite(home, { "another-service": { brokenSince: BROKE, toldAt: null } })
  await telling({
    root: ROOT,
    home,
    slug: WATCHED,
    now: NOW,
    send: async () => null,
    show: FAILED,
  })
  const held = ledgerRead(home)
  expect(held["another-service"]).toEqual({ brokenSince: BROKE, toldAt: null })
  expect(held[WATCHED]?.toldAt).toBe(NOW)
})

test("a unit systemd has started again already is told as having failed all the same", () => {
  const health = healthAsked({ root: ROOT, slug: WATCHED, now: new Date(NOW), show: RUNNING })
  expect(health.length).toBe(1)
  expect(health[0]?.broken).toContain("started it again")
})

test("a slug no service page states is told rather than swallowed", async () => {
  const home = homeOf()
  const sent: string[] = []
  const ticked = await telling({
    root: ROOT,
    home,
    slug: "no-such-service",
    now: NOW,
    send: async (to, body) => {
      sent.push(`${to}|${body}`)
      return null
    },
    show: FAILED,
  })
  expect(ticked.told).toEqual(["no-such-service to `alan`"])
  expect(sent[0]).toContain("no service-workstation is slugged")
})
