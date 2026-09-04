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
  assignedTo,
  bodyOf,
  pathOf,
  seatNamedIn,
  slugOf,
  took,
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

test("a page is landed by a program, its commit saying no check ran", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    expect(wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toBe(true)
    const at = join(root, pathOf(slugOf("akasha", OWN)))
    expect(readFileSync(at, "utf8")).toContain('dispatchedAs: "Explore"')
    expect(messageIn(root)).toContain(MECHANICAL)
  } finally {
    world.sweep()
  }
})

test("a page that landed states the agent id the subagent acts under", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    expect(wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toBe(true)
    const at = join(root, pathOf(slugOf("akasha", OWN)))
    expect(readFileSync(at, "utf8")).toContain(`agentId: "${SEAT_ID}--${OWN}"`)
  } finally {
    world.sweep()
  }
})

test("a page already there is left as it is", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    expect(wrote(root, "akasha", SEAT_ID, OWN, "Explore")).toBe(true)
    const held = gitIn(root, ["rev-parse", "HEAD"])
    expect(wrote(root, "akasha", SEAT_ID, OWN, "Task")).toBe(true)
    expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(held)
  } finally {
    world.sweep()
  }
})

test("a seat stating no assignment writes nothing", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    expect(wrote(root, "thea", SEAT_ID, OWN, "Explore")).toBe(false)
    expect(existsSync(join(root, pathOf(slugOf("thea", OWN))))).toBe(false)
  } finally {
    world.sweep()
  }
})

test("a page taken away goes, and the commit says a program took it", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    wrote(root, "akasha", SEAT_ID, OWN, "Explore")
    expect(took(root, "akasha", OWN)).toBe(true)
    expect(existsSync(join(root, pathOf(slugOf("akasha", OWN))))).toBe(false)
    expect(messageIn(root)).toContain(MECHANICAL)
  } finally {
    world.sweep()
  }
})

test("a page taken away is forgotten by whoever read it", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    wrote(root, "akasha", SEAT_ID, OWN, "Explore")
    const at = pathOf(slugOf("akasha", OWN))
    const oid = blobIdOf(new TextEncoder().encode(readFileSync(join(root, at), "utf8")))
    recordRead(root, AGENT, { path: at, oid, seenAt: 1, mechanicalOid: null })
    expect(readingIn(root, AGENT, at)).not.toBe(null)
    expect(took(root, "akasha", OWN)).toBe(true)
    expect(readingIn(root, AGENT, at)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a page that is not there is taken away by doing nothing", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    const held = gitIn(root, ["rev-parse", "HEAD"])
    expect(took(root, "akasha", OWN)).toBe(true)
    expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(held)
  } finally {
    world.sweep()
  }
})
