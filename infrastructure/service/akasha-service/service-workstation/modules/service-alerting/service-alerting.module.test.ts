import { expect, test } from "bun:test"
import { akasha } from "akasha/akasha.domain.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import type { DomainRow } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import {
  COOLING_MS,
  championing,
  deciding,
  type Ledger,
  owing,
  passedOn,
  told,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-alerting/service-alerting.module.code.ts"
import type { Health } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-health/service-health.module.code.ts"

const AKASHA_AT = `${domain.slug}/${akasha.slug}`

const BROKE: Health = {
  slug: "held-service",
  unit: "held-service.service",
  pagePath: "akasha/a.service-workstation.ts",
  broken: "held-service.service failed, and systemd says `exit-code`",
  told: true,
}

const WELL: Health = { ...BROKE, broken: null }

const UNTOLD: Health = { ...BROKE, told: false }

const AT = "2026-09-08T00:00:00.000Z"

function later(ms: number): string {
  return new Date(Date.parse(AT) + ms).toISOString()
}

function rowOf(slug: string, parent: string | null, persona: string | null): DomainRow {
  return { slug, path: `${slug}.ts`, persona, parent, sequence: [] }
}

const nobody = () => null

function decided(health: readonly Health[], ledger: Ledger, now: string) {
  return deciding({ health, champion: nobody, ledger, now, fallback: "alan" })
}

test("a service that just broke is told at once", () => {
  const said = decided([BROKE], {}, AT)
  expect(said.tell.length).toBe(1)
  expect(said.tell[0]?.body).toContain("is broken")
  expect(said.tell[0]?.body).toContain(`This was seen at ${AT}.`)
  expect(said.tell[0]?.body).not.toContain("just now")
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
  expect(said.tell[0]?.body).toContain(`This was seen at ${later(COOLING_MS)}.`)
})

test("a telling carries a moment rather than a stretch of time", () => {
  const body = decided([BROKE], { "held-service": { brokenSince: AT, toldAt: null } }, AT).tell[0]
    ?.body
  expect(body).toContain(AT)
  expect(body).not.toContain("ago")
})

test("a service that came back and broke again is not told again inside the cooling", () => {
  const first = decided([BROKE], {}, AT)
  const marked = told(first.keeping, "held-service", AT)
  const mended = decided([WELL], marked, later(60 * 1000))
  expect(mended.keeping["held-service"]).toEqual({ brokenSince: null, toldAt: AT })
  const again = decided([BROKE], mended.keeping, later(5 * 60 * 1000))
  expect(again.tell).toEqual([])
  expect(again.keeping["held-service"]).toEqual({
    brokenSince: later(5 * 60 * 1000),
    toldAt: AT,
  })
})

test("a service that came back and broke again past the cooling is told again", () => {
  const marked = told(decided([BROKE], {}, AT).keeping, "held-service", AT)
  const mended = decided([WELL], marked, later(60 * 1000))
  const again = decided([BROKE], mended.keeping, later(COOLING_MS))
  expect(again.tell.length).toBe(1)
})

test("a service well right through the cooling is held by nothing after it", () => {
  const marked = told(decided([BROKE], {}, AT).keeping, "held-service", AT)
  expect(decided([WELL], marked, later(COOLING_MS)).keeping).toEqual({})
})

test("a service stating it is not told is told to nobody and held by nothing", () => {
  const said = decided([UNTOLD], {}, AT)
  expect(said.tell).toEqual([])
  expect(said.keeping).toEqual({})
})

test("a service that is well and was never told is kept by nothing", () => {
  expect(
    decided([WELL], { "held-service": { brokenSince: AT, toldAt: null } }, AT).keeping
  ).toEqual({})
})

test("a service that mends states no day it broke while its cooling is held", () => {
  const said = decided([WELL], { "held-service": { brokenSince: AT, toldAt: AT } }, AT)
  expect(said.keeping["held-service"]).toEqual({ brokenSince: null, toldAt: AT })
})

test("a service stating it is not told is held by nothing though it was told before", () => {
  const said = decided([UNTOLD], { "held-service": { brokenSince: AT, toldAt: AT } }, AT)
  expect(said.keeping).toEqual({})
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
    rowOf("service-workstation/held-service", "workspace-package/held", null),
    rowOf("workspace-package/held", AKASHA_AT, "ember"),
    rowOf(AKASHA_AT, null, "akasha"),
  ])
  expect(champion("service-workstation/held-service")).toBe("ember")
})

test("a service no page above it champions falls to the one stated", () => {
  const said = deciding({
    health: [BROKE],
    champion: nobody,
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

test("a telling nothing could carry says who it was meant for", () => {
  const said = passedOn("ember", "`a-service` is broken.", "no seat is held")
  expect(said).toContain("meant for `ember`")
  expect(said).toContain("no seat is held")
  expect(said.endsWith(".")).toBe(true)
})

test("a reason already closed is not closed twice", () => {
  const said = passedOn("ember", "`a-service` is broken.", "no seat is held.")
  expect(said.endsWith("held.")).toBe(true)
})
