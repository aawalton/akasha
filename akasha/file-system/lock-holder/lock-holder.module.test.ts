import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { alive, holderOf, markIn, startedAt } from "./lock-holder.module.code.ts"

const UNKNOWN = "-"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const rooted = (): string => scratch.rootFor("akasha-lock-holder-")

function marked(body: string): string {
  const at = join(rooted(), "held-by")
  writeFileSync(at, body, "utf8")
  return at
}

async function gonePid(): Promise<number> {
  const kid = Bun.spawn(["bun", "-e", "Bun.sleepSync(60000)"], { stderr: "pipe" })
  kid.kill("SIGKILL")
  await kid.exited
  return kid.pid
}

test("the moment a process started is read off it, and reads the same however often it is asked", () => {
  const started = startedAt(process.pid)
  expect(started).not.toBe(UNKNOWN)
  expect(Number.parseInt(started, 10)).toBeGreaterThan(0)
  expect(startedAt(process.pid)).toBe(started)
})

test("a pid nothing is running under answers unknown rather than failing", async () => {
  expect(startedAt(await gonePid())).toBe(UNKNOWN)
})

test("a mark that stands is read back whole, with the whitespace around it dropped", () => {
  expect(markIn(marked(`${process.pid} 1\n`))).toBe(`${process.pid} 1`)
})

test("a mark that never stood, or stands empty, is no mark rather than a failure", () => {
  expect(markIn(join(rooted(), "never stood"))).toBeNull()
  expect(markIn(marked("   \n"))).toBeNull()
})

test("a holder is read out of a mark as its number and the moment it started", () => {
  expect(holderOf("1234 5678")).toEqual({ pid: 1234, started: "5678" })
})

test("no mark, or one naming no number, is no holder", () => {
  expect(holderOf(null)).toBeNull()
  expect(holderOf("nothing a holder reads from")).toBeNull()
  expect(holderOf("0 5678")).toBeNull()
  expect(holderOf("-3 5678")).toBeNull()
})

test("a mark naming a number and no moment is a holder whose moment is unknown", () => {
  expect(holderOf("1234")).toEqual({ pid: 1234, started: UNKNOWN })
  expect(holderOf("1234 ")).toEqual({ pid: 1234, started: UNKNOWN })
})

test("the process that wrote a mark reads back out of it as alive", () => {
  const mine = `${process.pid} ${startedAt(process.pid)}`
  const held = holderOf(markIn(marked(mine)))
  expect(held).toEqual({ pid: process.pid, started: startedAt(process.pid) })
  if (held === null) throw new Error("the mark just written read back as no holder")
  expect(alive(held)).toBe(true)
})

test("a holder whose process is gone is no holder", async () => {
  expect(alive({ pid: await gonePid(), started: startedAt(process.pid) })).toBe(false)
})

test("a pid standing for another process than the one that wrote the mark is no holder", () => {
  expect(alive({ pid: process.pid, started: "1" })).toBe(false)
})

test("an unknown moment leaves the holder weighed by its number alone", () => {
  expect(alive({ pid: process.pid, started: UNKNOWN })).toBe(true)
})
