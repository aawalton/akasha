import { expect, test } from "bun:test"
import {
  type Asking,
  askedBack,
  askingAt,
  logPathOf,
  seatNamedIn,
  WRITING,
} from "akasha/agent/subagent/modules/page-asking/subagent-page-asking.module.code.ts"
import { agentIdOf } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import {
  ANOTHER,
  heldInHistory,
  inScratch,
  OWN,
  PERSONA_AT,
  pageWritten,
  SEAT_AT,
  SEAT_ID,
  underSeat,
} from "akasha/agent/subagent/modules/presence/subagent-presence.module.test-fixtures.ts"
import { pageFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

function noting(asked: (readonly string[])[]): Asking {
  return (_root, _seatId, args) => {
    asked.push(args)
    return undefined
  }
}

async function seatedById(act: (root: string) => Promise<void>): Promise<undefined> {
  await underSeat(async (root) => {
    pageFiled(root, SEAT_ID, SEAT_AT)
    await act(root)
  })
}

test("a subagent whose page went is asked back under the kind history states", async () => {
  await seatedById(async (root) => {
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    const asked: (readonly string[])[] = []
    expect(askedBack(root, agentIdOf(SEAT_ID, OWN), noting(asked))).toBe(true)
    expect(asked.length).toBe(1)
    expect(asked[0]?.slice(0, 5)).toEqual([WRITING, "akasha", OWN, "", SEAT_ID])
    expect(Number(asked[0]?.[5])).toBeGreaterThan(0)
  })
})

test("a subagent whose page is there asks for nothing", async () => {
  await seatedById(async (root) => {
    await pageWritten(root)
    const asked: (readonly string[])[] = []
    expect(askedBack(root, agentIdOf(SEAT_ID, OWN), noting(asked))).toBe(false)
    expect(asked).toEqual([])
  })
})

test("a subagent history has no page for asks for nothing", async () => {
  await seatedById(async (root) => {
    const asked: (readonly string[])[] = []
    expect(askedBack(root, agentIdOf(SEAT_ID, OWN), noting(asked))).toBe(false)
    heldInHistory(root, OWN, agentIdOf(ANOTHER, OWN), "Explore")
    expect(askedBack(root, agentIdOf(SEAT_ID, OWN), noting(asked))).toBe(false)
    expect(asked).toEqual([])
  })
})

test("a seat, and a subagent of a seat the index has no page for, ask for nothing", async () => {
  await seatedById(async (root) => {
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    const asked: (readonly string[])[] = []
    expect(askedBack(root, SEAT_ID, noting(asked))).toBe(false)
    expect(askedBack(root, agentIdOf(ANOTHER, OWN), noting(asked))).toBe(false)
    expect(asked).toEqual([])
  })
})

test("an ask answers whether the program it started has ended", async () => {
  await underSeat(async (root) => {
    const running = askingAt(`${root}/nothing-here.code.ts`, root, SEAT_ID, [], root)
    const until = Date.now() + 5_000
    while (!running.ended() && Date.now() < until) await Bun.sleep(20)
    expect(running.ended()).toBe(true)
  })
})

test("a log sits in the seat's own folder named for the module landing a subagent's page", () => {
  expect(logPathOf(SEAT_ID, "/var/tmp/base")).toBe(`/var/tmp/base/${SEAT_ID}/subagent-presence.log`)
})

test("a seat is named by the page the index carries for its id", () => {
  inScratch((root) => {
    pageFiled(root, SEAT_ID, "akasha/agent/seat/pages/akasha.seat.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe("akasha")
  })
})

test("a seat the index carries no page for is named by nothing", () => {
  inScratch((root) => {
    pageFiled(root, ANOTHER, "akasha/agent/seat/pages/thea.seat.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe(null)
  })
})

test("a page that is no seat names no seat", () => {
  inScratch((root) => {
    pageFiled(root, SEAT_ID, PERSONA_AT)
    expect(seatNamedIn(root, SEAT_ID)).toBe(null)
  })
})
