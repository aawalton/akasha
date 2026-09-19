import { afterAll, expect, test } from "bun:test"
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  absentFrom,
  absentlyOf,
  type Bodies,
  HOLD,
  insideOf,
  mountedOver,
} from "akasha/code/running/modules/test-overlay/test-overlay.module.code.ts"
import type { Said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"

const ROOTS: string[] = []

afterAll(() => {
  for (const at of ROOTS) rmSync(at, { recursive: true, force: true })
})

function checkout(): string {
  const at = mkdtempSync(join(HOLD, "akasha-overlay-under-"))
  ROOTS.push(at)
  mkdirSync(join(at, "deep"))
  writeFileSync(join(at, "one.txt"), "on disk\n")
  writeFileSync(join(at, "deep/two.txt"), "deeper on disk\n")
  return at
}

const FIRST = 0

function inside(root: string, bodies: Bodies, argv: readonly string[]): Said {
  const over = mountedOver(root, bodies)
  try {
    const lane = over.lane(FIRST)
    return ran(lane.under(argv), { cwd: root, env: { ...process.env, ...lane.env } })
  } finally {
    over.sweep()
  }
}

test("a body carried is read at its path, and the file on disk is left as it was", () => {
  const root = checkout()
  expect(inside(root, { "one.txt": "carried\n" }, ["cat", "one.txt"]).out).toBe("carried\n")
  expect(readFileSync(join(root, "one.txt"), "utf8")).toBe("on disk\n")
})

test("a body carried at a path no file is at is read there", () => {
  const root = checkout()
  const said = inside(root, { "deep/three.txt": "brought\n" }, ["cat", "deep/three.txt"])
  expect(said.out).toBe("brought\n")
  expect(said.code).toBe(0)
})

test("a link carried is made at its path, pointing where the change says", () => {
  const root = checkout()
  const said = inside(root, { "deep/four.txt": { linkedTo: "../one.txt" } }, [
    "cat",
    "deep/four.txt",
  ])
  expect(said.out).toBe("on disk\n")
  expect(said.code).toBe(0)
})

test("a link carried beside a folder reaches what that folder holds", () => {
  const root = checkout()
  const said = inside(root, { "under/deep": { linkedTo: "../deep" } }, [
    "cat",
    "under/deep/two.txt",
  ])
  expect(said.out).toBe("deeper on disk\n")
})

test("a body carried over an executable file keeps that file's mode inside", () => {
  const root = checkout()
  writeFileSync(join(root, "run.sh"), "#!/bin/sh\necho on disk\n")
  chmodSync(join(root, "run.sh"), 0o755)
  const said = inside(root, { "run.sh": "#!/bin/sh\necho carried\n" }, ["./run.sh"])
  expect(said.out).toBe("carried\n")
  expect(said.code).toBe(0)
})

test("a body carried over a file the owner alone reads keeps that reading to the owner", () => {
  const root = checkout()
  chmodSync(join(root, "one.txt"), 0o600)
  const said = inside(root, { "one.txt": "carried\n" }, ["stat", "-c", "%a", "one.txt"])
  expect(said.out.trim()).toBe("600")
})

test("a path the change carries no body for is read off the checkout", () => {
  const root = checkout()
  expect(inside(root, { "one.txt": "carried\n" }, ["cat", "deep/two.txt"]).out).toBe(
    "deeper on disk\n"
  )
})

test("a path taken away is not there inside, and the file on disk stays", () => {
  const root = checkout()
  expect(inside(root, { "one.txt": null }, ["cat", "one.txt"]).code).not.toBe(0)
  expect(readFileSync(join(root, "one.txt"), "utf8")).toBe("on disk\n")
})

test("a run begins in the mounted tree rather than in the checkout", () => {
  const root = checkout()
  const over = mountedOver(root, {})
  try {
    const lane = over.lane(FIRST)
    const said = ran(lane.under(["pwd"]), { cwd: root, env: { ...process.env, ...lane.env } })
    expect(said.out.trim()).toBe(lane.merged)
  } finally {
    over.sweep()
  }
})

test("a run under a mount has a home of its own, and the sweep takes that home away", () => {
  const root = checkout()
  const over = mountedOver(root, {})
  const lane = over.lane(FIRST)
  const homed = String(lane.env.HOME)
  try {
    const said = ran(lane.under(["sh", "-c", 'printf %s "$HOME"']), {
      cwd: root,
      env: { ...process.env, ...lane.env },
    })
    expect(said.out).toBe(homed)
    expect(homed).not.toBe(process.env.HOME)
  } finally {
    over.sweep()
  }
  expect(ran(["test", "-e", homed]).code).not.toBe(0)
})

const SECOND = 1

test("a lane asked for again is the lane made before", () => {
  const over = mountedOver(checkout(), {})
  try {
    expect(over.lane(FIRST)).toBe(over.lane(FIRST))
  } finally {
    over.sweep()
  }
})

test("two lanes write nowhere in common, so two mounts share no work folder", () => {
  const over = mountedOver(checkout(), {})
  try {
    const one = over.lane(FIRST)
    const two = over.lane(SECOND)
    expect(one.env.AKASHA_WORK).not.toBe(two.env.AKASHA_WORK)
    expect(one.env.AKASHA_UPPER).not.toBe(two.env.AKASHA_UPPER)
    expect(one.merged).not.toBe(two.merged)
    expect(one.env.HOME).not.toBe(two.env.HOME)
    expect(one.env.AKASHA_LOWER).toBe(two.env.AKASHA_LOWER)
  } finally {
    over.sweep()
  }
})

test("a body carried reaches a lane that was never the lane carrying it", () => {
  const root = checkout()
  const over = mountedOver(root, { "one.txt": "carried\n" })
  try {
    const lane = over.lane(SECOND)
    const said = ran(lane.under(["cat", "one.txt"]), {
      cwd: root,
      env: { ...process.env, ...lane.env },
    })
    expect(said.out).toBe("carried\n")
  } finally {
    over.sweep()
  }
})

test("a run under a mount is told where the age key sits, since its own home holds none", () => {
  const held = process.env["SOPS_AGE_KEY_FILE"]
  process.env["SOPS_AGE_KEY_FILE"] = "/nowhere/keys.txt"
  const over = mountedOver(checkout(), {})
  try {
    expect(over.lane(FIRST).env["SOPS_AGE_KEY_FILE"]).toBe("/nowhere/keys.txt")
  } finally {
    over.sweep()
    if (held === undefined) delete process.env["SOPS_AGE_KEY_FILE"]
    else process.env["SOPS_AGE_KEY_FILE"] = held
  }
})

test("a path reaching outside the checkout refuses the mount", () => {
  expect(() => mountedOver(checkout(), { "../away.txt": "no" })).toThrow(/reaches outside/)
  expect(() => mountedOver(checkout(), { "/etc/away.txt": "no" })).toThrow(/reaches outside/)
})

test("a path inside the checkout is told from one reaching out of it", () => {
  expect(insideOf("deep/two.txt")).toBe(true)
  expect(insideOf("./two.txt")).toBe(true)
  expect(insideOf("../two.txt")).toBe(false)
  expect(insideOf("/two.txt")).toBe(false)
})

test("a named path the overlay carries a body for is in the tree that mount makes", () => {
  const root = checkout()
  expect(absentFrom(root, ["one.txt"], { "one.txt": "carried\n" })).toEqual([])
})

test("a named path the overlay carries a removal for is named as taken away", () => {
  const root = checkout()
  expect(absentFrom(root, ["one.txt"], { "one.txt": null })).toEqual([
    { path: "one.txt", why: "the overlay carried a removal for it" },
  ])
})

test("a named path the overlay carries nothing for is read off the checkout under it", () => {
  const root = checkout()
  expect(absentFrom(root, ["deep/two.txt"], {})).toEqual([])
  expect(absentFrom(root, ["deep/three.txt"], {})).toEqual([
    {
      path: "deep/three.txt",
      why: "the overlay carried no body for it, and the checkout under the overlay has none",
    },
  ])
})

test("a path the mount leaves out is really absent, as the reading of it says", () => {
  const root = checkout()
  const bodies: Bodies = { "one.txt": null }
  expect(absentFrom(root, ["one.txt"], bodies).length).toBe(1)
  expect(inside(root, bodies, ["test", "-e", "one.txt"]).code).not.toBe(0)
})

test("the reading of an absent path says renaming that path mends nothing", () => {
  const said = absentlyOf([{ path: "one.module.test.ts", why: "held" }])
  expect(said).toContain("1 test file the run named was nowhere in the tree the tests ran over")
  expect(said).toContain("one.module.test.ts — held")
  expect(said).toContain("renaming the file mends nothing")
  expect(said).toContain("akasha change list")
  expect(
    absentlyOf([
      { path: "one", why: "a" },
      { path: "two", why: "b" },
    ])
  ).toContain("2 test files the run named were nowhere")
})

test("what a mount wrote to is gone once that mount is swept", () => {
  const over = mountedOver(checkout(), { "one.txt": "carried\n" })
  const held = over.lane(FIRST).env.AKASHA_UPPER
  over.sweep()
  expect(held).toBeDefined()
  expect(ran(["test", "-e", String(held)]).code).not.toBe(0)
})
