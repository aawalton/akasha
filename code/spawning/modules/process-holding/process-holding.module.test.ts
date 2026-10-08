import { expect, test } from "bun:test"
import { existsSync, readFileSync, readlinkSync } from "node:fs"
import { join } from "node:path"
import { heldHere } from "akasha/code/spawning/modules/process-holding/process-holding.module.code.ts"
import {
  madePid,
  madeSpace,
  ownAt,
} from "akasha/code/spawning/modules/running/running.module.code.ts"

const ROOM = 4096

test("a process held here sits in a leaf of the group made for that hold", () => {
  const before = ownAt()
  const letting = heldHere(ROOM)
  const inside = String(ownAt())
  letting()

  expect(inside.endsWith("/run")).toBe(true)
  expect(madePid(inside.split("/").at(-2) ?? "")).toBe(process.pid)
  expect(ownAt()).toBe(before)
})

test("the group a hold made names the process space its maker ran in", () => {
  const letting = heldHere(ROOM)
  const inside = String(ownAt())
  letting()
  const space = readlinkSync("/proc/self/ns/pid").replace(/\D/g, "")
  expect(madeSpace(inside.split("/").at(-2) ?? "")).toBe(space)
})

test("the memory ceiling of a hold is stated on the leaf the process is held in", () => {
  const letting = heldHere(ROOM)
  const leaf = `/sys/fs/cgroup${String(ownAt())}`
  const high = readFileSync(join(leaf, "memory.high"), "utf8").trim()
  letting()

  expect(high).toBe(String(ROOM * 1048576))
})

test("letting go takes away the group the hold made", () => {
  const letting = heldHere(ROOM)
  const leaf = `/sys/fs/cgroup${String(ownAt())}`
  letting()

  expect(existsSync(leaf)).toBe(false)
  expect(existsSync(join(leaf, ".."))).toBe(false)
})
