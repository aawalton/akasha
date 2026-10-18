import { expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import {
  stalledAt,
  stalledIn,
  stallPathFor,
} from "akasha/code/spawning/modules/stall-noting/stall-noting.module.code.ts"

function ownGroup(): string {
  const said = readFileSync("/proc/self/cgroup", "utf8")
  return `/sys/fs/cgroup${said.trim().split(":").at(-1) ?? ""}`
}

test("each process in a group is noted with its state, what it waits in and its command", () => {
  const said = stalledIn(ownGroup())
  expect(said).toContain(String(process.pid))
  expect(said).toMatch(/ [RSDTZI] wchan=\S+ threads \S/)
})

test("a group no longer there is noted as nothing rather than throwing", () => {
  expect(stalledIn("/sys/fs/cgroup/akasha-no-such-group")).toBe("")
})

test("noting past its deadline reads no process and says how many it left unread", () => {
  expect(stalledIn(ownGroup(), Date.now() - 1)).toMatch(/^\d+ more processes were left unread$/)
})

test("a note is answered once and taken away", () => {
  const at = stallPathFor(`probe-${String(process.pid)}-${String(Bun.nanoseconds())}`)
  writeFileSync(at, "12 S wchan=futex\n")
  expect(stalledAt(at)).toBe("12 S wchan=futex")
  expect(existsSync(at)).toBe(false)
  expect(stalledAt(at)).toBeUndefined()
})
