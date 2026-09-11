import { expect, test } from "bun:test"
import {
  ALLOWED_CPU,
  cpuAllowedIn,
  overIts,
  spentBetween,
  underIts,
} from "akasha/commands/modules/change-ceiling/change-ceiling.module.code.ts"

const HELD = { edits: [{ kind: "add", path: "a/b.ts", content: "" }], refused: null } as const

const TAKEN = {
  cpu: 0,
  childCpu: 0,
  peak: 0,
  resident: 0,
  readCalls: 0,
  writeCalls: 0,
  readBytes: 0,
  measured: true,
  at: 0,
}

test("a change stating no processor seconds is allowed the seconds this module names", () => {
  expect(cpuAllowedIn(null)).toBe(ALLOWED_CPU)
  expect(cpuAllowedIn({ slug: "rename-page-type" })).toBe(ALLOWED_CPU)
})

test("a change stating seconds that are no number above nothing is allowed the same", () => {
  expect(cpuAllowedIn({ slug: "rename-page-type", maxCpuSeconds: 0 })).toBe(ALLOWED_CPU)
})

test("a change stating its own processor seconds is allowed those", () => {
  expect(cpuAllowedIn({ slug: "rename-page-type", maxCpuSeconds: 900 })).toBe(900)
})

test("what a change spent counts the processor time of the runs that change reached", () => {
  const spent = spentBetween(TAKEN, { ...TAKEN, cpu: 4.5, childCpu: 1.25 })

  expect(spent).toBe(5.75)
})

test("a change at its seconds exactly is passed over", () => {
  expect(overIts("rename-page-type", 299, 300)).toBeNull()
  expect(overIts("rename-page-type", 300, 300)).toBeNull()
})

test("a change past its seconds is told what that change spent and what it was allowed", () => {
  const said = overIts("rename-page-type", 412.5, 300) ?? ""

  expect(said).toContain("`rename-page-type` ran to the end and spent 412.5 processor seconds")
  expect(said).toContain("past the 300 its page allows")
  expect(said).toContain("Ask Alan")
})

test("a change inside its seconds answers what that change answered", async () => {
  const said = await underIts("rename-page-type", null, async () => HELD)

  expect(said).toEqual(HELD)
})

function spinning(ms: number): undefined {
  const until = Date.now() + ms
  while (Date.now() < until) {}
}

test("a change past its seconds runs to its end and then answers no edit", async () => {
  const ran: string[] = []
  const stated = { slug: "rename-page-type", maxCpuSeconds: 0.01 }

  const said = await underIts("rename-page-type", stated, async () => {
    spinning(50)
    ran.push("ran")
    return HELD
  })

  expect(ran).toEqual(["ran"])
  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`rename-page-type` ran to the end and spent")
})
