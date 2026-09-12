import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  groupIn,
  heldIn,
  isSeatScope,
  opened,
  seatScopeIn,
  turnedOn,
} from "akasha/seat-system/seat-grouping/seat-grouping.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function scopeWith(held: readonly string[], control = ""): string {
  const at = scratch.rootFor("seat-grouping-")
  writeFileSync(join(at, "cgroup.procs"), held.map((one) => `${one}\n`).join(""))
  writeFileSync(join(at, "cgroup.subtree_control"), control)
  return at
}

test("a group is read from the last field of the first line", () => {
  expect(groupIn("0::/user.slice/app.slice/tmux-spawn-a.scope\n")).toBe(
    "/user.slice/app.slice/tmux-spawn-a.scope"
  )
  expect(groupIn("")).toBe(null)
})

test("a seat's scope is known by the name tmux gives it", () => {
  expect(isSeatScope("/user.slice/app.slice/tmux-spawn-a.scope")).toBe(true)
  expect(isSeatScope("/user.slice/app.slice/tmux-seat-ember-7.scope")).toBe(false)
  expect(isSeatScope("/user.slice/app.slice/akasha-call-7")).toBe(false)
})

test("a group that is no seat's scope is left alone", () => {
  expect(seatScopeIn("0::/user.slice/app.slice/akasha-call-7\n")).toBe(null)
  expect(seatScopeIn("0::/user.slice/app.slice/tmux-spawn-a.scope\n")).toBe(
    "/sys/fs/cgroup/user.slice/app.slice/tmux-spawn-a.scope"
  )
})

test("every process the scope held moves into one child of that scope", () => {
  const at = scopeWith(["11", "12", "13"])
  expect(opened(at)).toBe(true)
  expect(readFileSync(join(at, "agent", "cgroup.procs"), "utf8")).toBe("13")
  expect(turnedOn(at)).toBe(true)
})

test("processor time and memory are turned on for the scope's children", () => {
  const at = scopeWith(["11"])
  opened(at)
  expect(readFileSync(join(at, "cgroup.subtree_control"), "utf8")).toBe("+cpu +memory")
})

test("a scope opened already is left as it is", () => {
  const at = scopeWith(["11"], "cpu memory")
  expect(opened(at)).toBe(true)
  expect(heldIn(at)).toEqual(["11"])
})

test("a scope holding nothing is opened all the same", () => {
  const at = scopeWith([])
  expect(opened(at)).toBe(true)
  expect(turnedOn(at)).toBe(true)
})
