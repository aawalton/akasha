import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, readingIn, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { said as gitIn } from "@akasha/git/git-running"
import { listedFiled, pageFiled } from "@akasha/indexes/testing"
import {
  agentIdOf,
  asking,
  assignedTo,
  bodyOf,
  LOG_AT,
  landingAgain,
  logPathOf,
  pathOf,
  seatNamedIn,
  slugOf,
  stampedAt,
  TRIES,
  took,
  WAIT_MS,
  WRITING,
  wrote,
} from "./subagent-presence.module.code.ts"
import {
  AGAIN,
  AGENT,
  ANOTHER,
  counting,
  GOING,
  HELD_ASSIGNMENT,
  HELD_ID,
  handedPaths,
  heldInHistory,
  heldUnder,
  idIn,
  keptUnder,
  LOCKED,
  landedAt,
  landedUnder,
  loggedAt,
  MECHANICAL,
  messageIn,
  OWN,
  pastTheStamp,
  REFUSED,
  SEAT_AT,
  SEAT_BODY,
  SEAT_ID,
  seated,
  stampOpening,
  underSeat,
  WENT,
  whyIn,
} from "./subagent-presence.module.test-fixtures.ts"

test("a stamp says the time to the millisecond, carrying the offset it was written at", () => {
  const when = new Date(1788600000123)
  const said = stampedAt(when)
  expect(said).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/)
  expect(stampOpening(`${said} anything`)?.getTime()).toBe(when.getTime())
})

test("a line carrying no stamp is read as carrying none", () => {
  expect(stampOpening(`subagent-presence: take ryn ${OWN} — the lock was held`)).toBe(null)
})

test("a slug joins the seat's name to the id the subagent runs under", () => {
  expect(slugOf("akasha", OWN)).toBe(`akasha-${OWN}`)
})

test("the mark between a seat's id and a subagent's own comes out as one hyphen", () => {
  expect(slugOf("akasha", `first--second`)).toBe("akasha-first-second")
})

test("an agent id joins the seat's id to the id the subagent runs under", () => {
  expect(agentIdOf(SEAT_ID, OWN)).toBe(`${SEAT_ID}--${OWN}`)
})

test("an agent id keeps a mark a slug would collapse", () => {
  expect(agentIdOf("akasha", `first--second`)).toBe("akasha--first--second")
  expect(slugOf("akasha", `first--second`)).toBe("akasha-first-second")
})

test("a page sits under the subagents folder named for its slug", () => {
  expect(pathOf("akasha-abc")).toBe("seat-system/subagents/pages/akasha-abc.subagent.ts")
})

test("a log sits in the seat's own folder named for this module", () => {
  expect(logPathOf(SEAT_ID, "/var/tmp/base")).toBe(`/var/tmp/base/${SEAT_ID}/${LOG_AT}`)
})

test("a body states the type and slug and seat and assignment and kind and agent id", () => {
  const body = bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Explore", "seat--own")
  expect(body).toContain("export const akashaAbc = {")
  expect(body).toContain('pageTypeSlug: "subagent"')
  expect(body).toContain('slug: "akasha-abc"')
  expect(body).toContain('principalSeatName: "akasha"')
  expect(body).toContain('assignmentSlug: "domain/akasha-system"')
  expect(body).toContain('dispatchedAs: "Explore"')
  expect(body).toContain('agentId: "seat--own"')
})

test("a body composed states no id, leaving the command to mint one", () => {
  expect(
    bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Explore", "seat--own")
  ).not.toContain("id:")
})

test("a body carries the id it is handed, before everything else the body states", () => {
  const body = bodyOf("a-abc", "akasha", "domain/akasha-system", "Explore", "seat--own", HELD_ID)
  expect(body).toContain(`id: ${JSON.stringify(HELD_ID)}`)
  expect(body.indexOf("id:")).toBeLessThan(body.indexOf("pageTypeSlug:"))
})

test("a page takes the assignment from the page its seat is at", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("subagent-presence-")
    writing(root, SEAT_AT, SEAT_BODY)
    listedFiled(root, "seat", "akasha", [{ path: SEAT_AT, id: SEAT_ID }])
    expect(assignedTo(root, "akasha")).toBe("domain/akasha-system")
  } finally {
    world.sweep()
  }
})

test("a seat the index carries no page for is assigned nothing", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("subagent-presence-")
    pageFiled(root, ANOTHER, "akasha/seat-system/seats/pages/thea.seat.ts")
    expect(assignedTo(root, "akasha")).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a seat is named by the page the index carries for its id", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("subagent-presence-")
    pageFiled(root, SEAT_ID, "akasha/seat-system/seats/pages/akasha.seat.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe("akasha")
  } finally {
    world.sweep()
  }
})

test("a seat the index carries no page for is named by nothing", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("subagent-presence-")
    pageFiled(root, ANOTHER, "akasha/seat-system/seats/pages/thea.seat.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a page that is no seat names no seat", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("subagent-presence-")
    pageFiled(root, SEAT_ID, "akasha/persona-system/personas/akasha/akasha.persona.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a page is landed by a program, its commit saying nothing of the checks", async () => {
  await underSeat(async (root) => {
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(landedAt(root, OWN)).toContain('dispatchedAs: "Explore"')
    expect(messageIn(root)).not.toContain(MECHANICAL)
  })
})

test("a page that landed states the agent id the subagent acts under", async () => {
  await underSeat(async (root) => {
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(landedAt(root, OWN)).toContain(`agentId: "${SEAT_ID}--${OWN}"`)
  })
})

test("a page already there is left as it is", async () => {
  await underSeat(async (root) => {
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    const held = gitIn(root, ["rev-parse", "HEAD"])
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(held)
  })
})

test("a seat stating no assignment writes nothing and says which seat and why", async () => {
  await underSeat(async (root) => {
    const went = await wrote(root, "thea", SEAT_ID, OWN, "Explore")
    expect(whyIn(went)).toContain("thea")
    expect(whyIn(went)).toContain("no assignment is stated")
    expect(whyIn(went)).toContain(pathOf(slugOf("thea", OWN)))
    expect(existsSync(join(root, pathOf(slugOf("thea", OWN))))).toBe(false)
  })
})

test("a page taken away goes, and the commit says nothing of the checks", async () => {
  await underSeat(async (root) => {
    await wrote(root, "akasha", SEAT_ID, OWN, "Explore")
    expect(await took(root, "akasha", OWN)).toEqual(WENT)
    expect(existsSync(join(root, pathOf(slugOf("akasha", OWN))))).toBe(false)
    expect(messageIn(root)).not.toContain(MECHANICAL)
  })
})

test("a subagent stopping hands the edits it kept to the seat that dispatched it", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    const slug = slugOf("akasha", OWN)
    await wrote(root, "akasha", SEAT_ID, OWN, "Explore")
    keptUnder(root, slug, "one.md")
    expect(await took(root, "akasha", OWN)).toEqual(WENT)
    expect(handedPaths(root, "akasha", slug)).toEqual(["one.md"])
  } finally {
    world.sweep()
  }
})

test("a page taken away is forgotten by whoever read it", async () => {
  await underSeat(async (root) => {
    await wrote(root, "akasha", SEAT_ID, OWN, "Explore")
    const at = pathOf(slugOf("akasha", OWN))
    const oid = blobIdOf(new TextEncoder().encode(readFileSync(join(root, at), "utf8")))
    recordRead(root, AGENT, { path: at, oid, seenAt: 1, carriedOid: null })
    expect(readingIn(root, AGENT, at)).not.toBe(null)
    expect(await took(root, "akasha", OWN)).toEqual(WENT)
    expect(readingIn(root, AGENT, at)).toBe(null)
  })
})

test("a page that is not there is taken away by doing nothing", async () => {
  await underSeat(async (root) => {
    const held = gitIn(root, ["rev-parse", "HEAD"])
    expect(await took(root, "akasha", OWN)).toEqual(WENT)
    expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(held)
  })
})

test("a subagent whose page is in history takes up that page rather than a new one", async () => {
  await underSeat(async (root) => {
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    expect(idIn(landedAt(root, OWN))).toBe(HELD_ID)
  })
})

test("a page taken up keeps the kind it carried and takes its seat's assignment", async () => {
  await underSeat(async (root) => {
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    const landed = landedAt(root, OWN)
    expect(landed).toContain('dispatchedAs: "Explore"')
    expect(landed).toContain('assignmentSlug: "domain/akasha-system"')
    expect(landed).not.toContain(HELD_ASSIGNMENT)
    expect(landed).toContain(`agentId: "${SEAT_ID}--${OWN}"`)
  })
})

test("a page taken up under a seat stating no assignment takes history's", async () => {
  await underSeat(async (root) => {
    heldUnder(root, "thea", OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    expect(await wrote(root, "thea", SEAT_ID, OWN, "Task")).toEqual(WENT)
    expect(landedUnder(root, "thea", OWN)).toContain(
      `assignmentSlug: ${JSON.stringify(HELD_ASSIGNMENT)}`
    )
  })
})

test("a subagent with no page in history has one composed as before", async () => {
  await underSeat(async (root) => {
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    const landed = landedAt(root, OWN)
    expect(idIn(landed)).toBe(null)
    expect(landed).toContain('dispatchedAs: "Task"')
    expect(landed).toContain('assignmentSlug: "domain/akasha-system"')
  })
})

test("a page in history under another agent id is composed afresh", async () => {
  await underSeat(async (root) => {
    heldInHistory(root, OWN, agentIdOf(ANOTHER, OWN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    const landed = landedAt(root, OWN)
    expect(idIn(landed)).toBe(null)
    expect(landed).toContain('dispatchedAs: "Task"')
    expect(landed).toContain('assignmentSlug: "domain/akasha-system"')
  })
})

test("the commit says whether the page was taken up or composed", async () => {
  await underSeat(async (root) => {
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(messageIn(root)).toContain("a subagent states the agent id it acts under")
    heldInHistory(root, AGAIN, agentIdOf(SEAT_ID, AGAIN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, AGAIN, "Explore")).toEqual(WENT)
    expect(messageIn(root)).toContain("a subagent resuming takes up the page it had")
  })
})

test("a page put up and taken down comes back with the id it had", async () => {
  await underSeat(async (root) => {
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(await took(root, "akasha", OWN)).toEqual(WENT)
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(idIn(landedAt(root, OWN))).toBe(HELD_ID)
  })
})

test("a write the seat's assignment refuses leaves its reason in the log", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    const base = world.rootFor("subagent-presence-logs-")
    asking(root, SEAT_ID, [WRITING, "thea", OWN, "Explore", SEAT_ID], base)
    const held = await loggedAt(logPathOf(SEAT_ID, base), 30000)
    const line = held.split("\n")[0] ?? ""
    const at = stampOpening(line)
    expect(at).not.toBe(null)
    expect(Math.abs((at?.getTime() ?? 0) - Date.now())).toBeLessThan(120000)
    expect(pastTheStamp(line).startsWith(`subagent-presence: write thea ${OWN} — `)).toBe(true)
    expect(held).toContain("thea")
    expect(held).toContain("no assignment is stated")
  } finally {
    world.sweep()
  }
}, 40000)

test("a write that landed leaves no reason in the log", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    const base = world.rootFor("subagent-presence-logs-")
    asking(root, SEAT_ID, [WRITING, "akasha", OWN, "Explore", SEAT_ID], base)
    const at = join(root, pathOf(slugOf("akasha", OWN)))
    const until = Date.now() + 30000
    while (Date.now() < until && !existsSync(at)) await Bun.sleep(50)
    expect(existsSync(at)).toBe(true)
    expect(await loggedAt(logPathOf(SEAT_ID, base), 500)).toBe("")
  } finally {
    world.sweep()
  }
}, 40000)

test("a landing refused for a held lock is asked for again until that landing goes", async () => {
  const run = counting([LOCKED, LOCKED, GOING])
  expect(await landingAgain(run.ask, run.waited)).toEqual(GOING)
  expect(run.count()).toBe(3)
  expect(run.waits).toEqual([WAIT_MS, WAIT_MS])
})

test("a landing refused for a held lock every time is asked for five times and no more", async () => {
  const run = counting([LOCKED])
  expect(await landingAgain(run.ask, run.waited)).toEqual(LOCKED)
  expect(run.count()).toBe(TRIES)
})

test("a refusal naming no held lock is answered at once and waits for nothing", async () => {
  const run = counting([REFUSED])
  expect(await landingAgain(run.ask, run.waited)).toEqual(REFUSED)
  expect(run.count()).toBe(1)
  expect(run.waits).toEqual([])
})
