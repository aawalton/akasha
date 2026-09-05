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
  logPathOf,
  pathOf,
  seatNamedIn,
  slugOf,
  took,
  WRITING,
  wrote,
} from "./subagent-presence.module.code.ts"
import {
  AGAIN,
  AGENT,
  ANOTHER,
  HELD_ASSIGNMENT,
  HELD_ID,
  heldInHistory,
  idIn,
  landedAt,
  loggedAt,
  MECHANICAL,
  messageIn,
  OWN,
  SEAT_AT,
  SEAT_BODY,
  SEAT_ID,
  seated,
  WENT,
  whyIn,
} from "./subagent-presence.module.test-fixtures.ts"

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

test("a page is landed by a program, its commit saying no check ran", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(landedAt(root, OWN)).toContain('dispatchedAs: "Explore"')
    expect(messageIn(root)).toContain(MECHANICAL)
  } finally {
    world.sweep()
  }
})

test("a page that landed states the agent id the subagent acts under", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(landedAt(root, OWN)).toContain(`agentId: "${SEAT_ID}--${OWN}"`)
  } finally {
    world.sweep()
  }
})

test("a page already there is left as it is", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    const held = gitIn(root, ["rev-parse", "HEAD"])
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(held)
  } finally {
    world.sweep()
  }
})

test("a seat stating no assignment writes nothing and says which seat and why", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    const went = await wrote(root, "thea", SEAT_ID, OWN, "Explore")
    expect(whyIn(went)).toContain("thea")
    expect(whyIn(went)).toContain("no assignment is stated")
    expect(whyIn(went)).toContain(pathOf(slugOf("thea", OWN)))
    expect(existsSync(join(root, pathOf(slugOf("thea", OWN))))).toBe(false)
  } finally {
    world.sweep()
  }
})

test("a page taken away goes, and the commit says a program took it", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    await wrote(root, "akasha", SEAT_ID, OWN, "Explore")
    expect(await took(root, "akasha", OWN)).toEqual(WENT)
    expect(existsSync(join(root, pathOf(slugOf("akasha", OWN))))).toBe(false)
    expect(messageIn(root)).toContain(MECHANICAL)
  } finally {
    world.sweep()
  }
})

test("a page taken away is forgotten by whoever read it", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    await wrote(root, "akasha", SEAT_ID, OWN, "Explore")
    const at = pathOf(slugOf("akasha", OWN))
    const oid = blobIdOf(new TextEncoder().encode(readFileSync(join(root, at), "utf8")))
    recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
    expect(readingIn(root, AGENT, at)).not.toBe(null)
    expect(await took(root, "akasha", OWN)).toEqual(WENT)
    expect(readingIn(root, AGENT, at)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a page that is not there is taken away by doing nothing", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    const held = gitIn(root, ["rev-parse", "HEAD"])
    expect(await took(root, "akasha", OWN)).toEqual(WENT)
    expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(held)
  } finally {
    world.sweep()
  }
})

test("a subagent whose page is in history takes up that page rather than a new one", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    expect(idIn(landedAt(root, OWN))).toBe(HELD_ID)
  } finally {
    world.sweep()
  }
})

test("a page taken up keeps the kind and the assignment that page carried", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    const landed = landedAt(root, OWN)
    expect(landed).toContain('dispatchedAs: "Explore"')
    expect(landed).toContain(`assignmentSlug: ${JSON.stringify(HELD_ASSIGNMENT)}`)
    expect(landed).toContain(`agentId: "${SEAT_ID}--${OWN}"`)
  } finally {
    world.sweep()
  }
})

test("a subagent with no page in history has one composed as before", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    const landed = landedAt(root, OWN)
    expect(idIn(landed)).toBe(null)
    expect(landed).toContain('dispatchedAs: "Task"')
    expect(landed).toContain('assignmentSlug: "domain/akasha-system"')
  } finally {
    world.sweep()
  }
})

test("a page in history under another agent id is composed afresh", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    heldInHistory(root, OWN, agentIdOf(ANOTHER, OWN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Task")).toEqual(WENT)
    const landed = landedAt(root, OWN)
    expect(idIn(landed)).toBe(null)
    expect(landed).toContain('dispatchedAs: "Task"')
    expect(landed).toContain('assignmentSlug: "domain/akasha-system"')
  } finally {
    world.sweep()
  }
})

test("the commit says whether the page was taken up or composed", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(messageIn(root)).toContain("a subagent states the agent id it acts under")
    heldInHistory(root, AGAIN, agentIdOf(SEAT_ID, AGAIN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, AGAIN, "Explore")).toEqual(WENT)
    expect(messageIn(root)).toContain("a subagent resuming takes up the page it had")
  } finally {
    world.sweep()
  }
})

test("a page put up and taken down comes back with the id it had", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(await took(root, "akasha", OWN)).toEqual(WENT)
    expect(await wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toEqual(WENT)
    expect(idIn(landedAt(root, OWN))).toBe(HELD_ID)
  } finally {
    world.sweep()
  }
})

test("a write the seat's assignment refuses leaves its reason in the log", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    const base = world.rootFor("subagent-presence-logs-")
    asking(root, SEAT_ID, [WRITING, "thea", OWN, "Explore", SEAT_ID], base)
    const held = await loggedAt(logPathOf(SEAT_ID, base), 30000)
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
