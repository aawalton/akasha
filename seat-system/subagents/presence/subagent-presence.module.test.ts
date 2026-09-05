import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, readingIn, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { said as gitIn } from "@akasha/git/git-running"
import { listedFiled, pageFiled, rebuiltIn } from "@akasha/indexes/testing"
import { declaringUnder } from "@akasha/testing-system/declaring"
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

const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

const OWN = "a38f63805f9b94edf"

const SEAT_AT = "akasha/seat-system/seats/pages/akasha.seat.ts"

const SEAT_BODY = `export const akasha = { assignmentSlug: "domain/akasha-system" }\n`

const AGENT = "01a05844-6e60-7000-b54c-4b14559df70d"

const TREE = "akasha"

const MECHANICAL = "Checks-bypassed: a `change-mechanical` change runs no check"

const WENT = { went: true } as const

function seated(root: string): string {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(declaringUnder(TREE))) writing(root, path, body)
  writing(root, SEAT_AT, SEAT_BODY)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  rebuiltIn(root, TREE)
  listedFiled(root, "seat", "akasha", [{ path: SEAT_AT, id: SEAT_ID }])
  return root
}

function messageIn(root: string): string {
  return gitIn(root, ["log", "-1", "--pretty=%B"])
}

function whyIn(went: unknown): string {
  return typeof went === "object" && went !== null && "why" in went ? String(went.why) : ""
}

async function loggedAt(at: string, within: number): Promise<string> {
  const until = Date.now() + within
  while (Date.now() < until) {
    if (existsSync(at)) {
      const held = readFileSync(at, "utf8")
      if (held !== "") return held
    }
    await Bun.sleep(50)
  }
  return existsSync(at) ? readFileSync(at, "utf8") : ""
}

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

test("a body states no id, leaving the command to mint one", () => {
  expect(
    bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Explore", "seat--own")
  ).not.toContain("id:")
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
    const at = join(root, pathOf(slugOf("akasha", OWN)))
    expect(readFileSync(at, "utf8")).toContain('dispatchedAs: "Explore"')
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
    const at = join(root, pathOf(slugOf("akasha", OWN)))
    expect(readFileSync(at, "utf8")).toContain(`agentId: "${SEAT_ID}--${OWN}"`)
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
