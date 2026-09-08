import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Said } from "@akasha/utils/run/running"
import { ran } from "@akasha/utils/run/running"
import { type Bodies, HOLD, insideOf, mountedOver } from "./test-overlay.module.code.ts"

const roots: string[] = []

afterAll(() => {
  for (const at of roots) rmSync(at, { recursive: true, force: true })
})

function checkout(): string {
  const at = mkdtempSync(join(HOLD, "akasha-overlay-under-"))
  roots.push(at)
  mkdirSync(join(at, "deep"))
  writeFileSync(join(at, "one.txt"), "on disk\n")
  writeFileSync(join(at, "deep/two.txt"), "deeper on disk\n")
  return at
}

function inside(root: string, bodies: Bodies, argv: readonly string[]): Said {
  const over = mountedOver(root, bodies)
  try {
    return ran(over.under(argv), { cwd: root, env: { ...process.env, ...over.env } })
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
    const said = ran(over.under(["pwd"]), { cwd: root, env: { ...process.env, ...over.env } })
    expect(said.out.trim()).toBe(over.merged)
  } finally {
    over.sweep()
  }
})

test("a path reaching outside the checkout refuses the mount", () => {
  expect(() => mountedOver(checkout(), { "../away.txt": "no" })).toThrow(/reaches outside/)
  expect(() => mountedOver(checkout(), { "/etc/away.txt": "no" })).toThrow(/reaches outside/)
})

test("a path inside the checkout is told from one reaching out of it", () => {
  expect(insideOf("deep/two.txt")).toBe(true)
  expect(insideOf("./deep/../two.txt")).toBe(true)
  expect(insideOf("../two.txt")).toBe(false)
  expect(insideOf("/two.txt")).toBe(false)
})

test("what a mount wrote to is gone once that mount is swept", () => {
  const over = mountedOver(checkout(), { "one.txt": "carried\n" })
  const held = over.env.AKASHA_UPPER
  over.sweep()
  expect(held).toBeDefined()
  expect(ran(["test", "-e", String(held)]).code).not.toBe(0)
})
