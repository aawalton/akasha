import { expect, test } from "bun:test"
import type { DomainRow } from "akasha/domains/modules/rows/domain-rows.module.code.ts"
import type { Health } from "../service-health/service-health.module.code.ts"
import {
  COOLING_MS,
  championing,
  deciding,
  type Ledger,
  owing,
  told,
} from "./service-alerting.module.code.ts"

const BROKE: Health = {
  slug: "held-service",
  unit: "held-service.service",
  broken: "held-service.service failed, and systemd says `exit-code`",
}

const WELL: Health = { slug: "held-service", unit: "held-service.service", broken: null }

const AT = "2026-09-08T00:00:00.000Z"

function later(ms: number): string {
  return new Date(Date.parse(AT) + ms).toISOString()
}

function rowOf(slug: string, parent: string | null, persona: string | null): DomainRow {
  return { slug, path: `${slug}.ts`, persona, parent, sequence: [] }
}

const NOBODY = () => null

function decided(health: readonly Health[], ledger: Ledger, now: string) {
  return deciding({ health, champion: NOBODY, ledger, now, fallback: "alan" })
}

test("a service that just broke is told at once", () => {
  const said = decided([BROKE], {}, AT)
  expect(said.tell.length).toBe(1)
  expect(said.tell[0]?.body).toContain("is broken")
  expect(said.tell[0]?.body).toContain("It broke just now.")
  expect(said.keeping["held-service"]).toEqual({ brokenSince: AT, toldAt: null })
})

test("a service still broken inside the cooling is not told again", () => {
  const ledger = { "held-service": { brokenSince: AT, toldAt: AT } }
  const said = decided([BROKE], ledger, later(5 * 60 * 1000))
  expect(said.tell).toEqual([])
  expect(said.keeping["held-service"]?.brokenSince).toBe(AT)
})

test("a service broken right through the cooling is told once more", () => {
  const ledger = { "held-service": { brokenSince: AT, toldAt: AT } }
  const said = decided([BROKE], ledger, later(COOLING_MS))
  expect(said.tell.length).toBe(1)
  expect(said.tell[0]?.body).toContain(`broken since ${AT}`)
})

test("a service that came back and broke again is told again inside the cooling", () => {
  const first = decided([BROKE], {}, AT)
  const marked = told(first.keeping, "held-service", AT)
  const mended = decided([WELL], marked, later(60 * 1000))
  expect(mended.keeping["held-service"]).toBe(undefined)
  const again = decided([BROKE], mended.keeping, later(5 * 60 * 1000))
  expect(again.tell.length).toBe(1)
})

test("a service that is well is kept by nothing", () => {
  expect(decided([WELL], { "held-service": { brokenSince: AT, toldAt: AT } }, AT).keeping).toEqual(
    {}
  )
})

test("deciding never moves the mark saying the persona was told", () => {
  const said = decided([BROKE], {}, AT)
  expect(said.keeping["held-service"]?.toldAt).toBe(null)
  expect(told(said.keeping, "held-service", AT)["held-service"]?.toldAt).toBe(AT)
})

test("a mark that is no instant is owed a telling rather than swallowed", () => {
  expect(owing("not an instant", AT, COOLING_MS)).toBe(true)
  expect(owing(null, AT, COOLING_MS)).toBe(true)
})

test("the persona told is the nearest one climbing the tree", () => {
  const champion = championing([
    rowOf("workstation-service/held-service", "workspace-package/held", null),
    rowOf("workspace-package/held", "domain/akasha", "ember"),
    rowOf("domain/akasha", null, "akasha"),
  ])
  expect(champion("workstation-service/held-service")).toBe("ember")
})

test("a service no page above it champions falls to the one stated", () => {
  const said = deciding({
    health: [BROKE],
    champion: NOBODY,
    ledger: {},
    now: AT,
    fallback: "alan",
  })
  expect(said.tell[0]?.to).toBe("alan")
})

test("a tree that comes back on itself terminates rather than running away", () => {
  const champion = championing([
    rowOf("domain/one", "domain/two", null),
    rowOf("domain/two", "domain/one", null),
  ])
  expect(champion("domain/one")).toBe(null)
})
