import { beforeEach, describe, expect, mock, test } from "bun:test"
import type { Asked } from "../../pages-query/src/index"
import { ROUTE_TARGETS } from "./page-type"

const PERSON = "b41d9c62-3f7e-4a18-9d55-6c2e8f0a7b34"
const OUTAGE = "the page query service did not answer"

const OUT_OF_REACH: Asked = { ok: false, why: OUTAGE }

function holding(targets: readonly string[]): Asked {
  return {
    ok: true,
    answer: {
      n: targets.length,
      value: null,
      over: null,
      rows: targets.map((target) => ({ values: { target } })),
      faults: [],
      omitted: [],
      unfound: [],
    },
  }
}

let answer: Asked = OUT_OF_REACH

const realAsk = await import("@shared/pages-query/ask")

mock.module("@shared/pages-query/ask", () => ({
  ...realAsk,
  askComposed: async (): Promise<Asked> => answer,
}))

const { decideRouteAccess } = await import("./route-access")

beforeEach(() => {
  answer = OUT_OF_REACH
})

describe("an unreadable record refuses", () => {
  test("a store that will not answer permits nobody", async () => {
    const decision = await decideRouteAccess(PERSON, ROUTE_TARGETS.READOUT_FEED)
    expect(decision.permitted).toBe(false)
  })

  test("both surfaces refuse, not just the one that was asked about first", async () => {
    for (const target of Object.values(ROUTE_TARGETS)) {
      const decision = await decideRouteAccess(PERSON, target)
      expect(decision.permitted).toBe(false)
    }
  })

  test("refuses regardless of who is asking", async () => {
    for (const person of [PERSON, "00000000-0000-0000-0000-000000000000", ""]) {
      const decision = await decideRouteAccess(person, ROUTE_TARGETS.READOUT_FEED)
      expect(decision.permitted).toBe(false)
    }
  })

  test("says why, so the refusal is distinguishable from an absent grant", async () => {
    const decision = await decideRouteAccess(PERSON, ROUTE_TARGETS.READOUT_FEED)
    expect(decision.unreadable).toContain(OUTAGE)
  })
})

describe("a readable record decides on what it holds", () => {
  test("a record holding no grant permits nobody, and says nothing is unreadable", async () => {
    answer = holding([])
    const decision = await decideRouteAccess(PERSON, ROUTE_TARGETS.READOUT_FEED)
    expect(decision.permitted).toBe(false)
    expect(decision.unreadable).toBeUndefined()
  })

  test("a grant on one surface does not carry to the other", async () => {
    answer = holding([ROUTE_TARGETS.READOUT_FEED])
    expect((await decideRouteAccess(PERSON, ROUTE_TARGETS.READOUT_FEED)).permitted).toBe(true)
    expect((await decideRouteAccess(PERSON, ROUTE_TARGETS.DEVICE_SECRET_MINT)).permitted).toBe(
      false
    )
  })

  test("a namespace grant covers the surfaces standing beneath it", async () => {
    answer = holding(["readout-*"])
    expect((await decideRouteAccess(PERSON, ROUTE_TARGETS.READOUT_FEED)).permitted).toBe(true)
    expect((await decideRouteAccess(PERSON, ROUTE_TARGETS.DEVICE_SECRET_MINT)).permitted).toBe(
      false
    )
  })
})
