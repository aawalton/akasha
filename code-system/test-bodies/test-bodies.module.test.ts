import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  bodiesAt,
  endingOf,
  folderOf,
  loaderOf,
  preloadingOf,
  SERVED,
  SERVING,
  servedBy,
  servingOut,
  wholeOf,
} from "./test-bodies.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ONE = "/repo/one/held.module.code.ts"

const TWO = "/repo/two/held.module.test.ts"

test("a path the change carries is matched whole, and a near neighbour is not", () => {
  const filter = wholeOf([ONE, TWO])
  expect(filter.test(ONE)).toBe(true)
  expect(filter.test(TWO)).toBe(true)
  expect(filter.test(`${ONE}x`)).toBe(false)
  expect(filter.test("/repo/one/other.module.code.ts")).toBe(false)
})

test("a path the change carries is matched by its ending, however it was written", () => {
  const filter = endingOf([ONE])
  expect(filter.test("./held.module.code.ts")).toBe(true)
  expect(filter.test("../one/held.module.code.ts")).toBe(true)
  expect(filter.test(ONE)).toBe(true)
  expect(filter.test("./other.module.code.ts")).toBe(false)
})

test("a change carrying no path matches nothing at all", () => {
  expect(wholeOf([]).test("")).toBe(false)
  expect(wholeOf([]).test(ONE)).toBe(false)
  expect(endingOf([]).test("./held.module.code.ts")).toBe(false)
})

test("the folder an import is read against drops the mark a served body carries", () => {
  expect(folderOf(`${SERVED}:${ONE}`)).toBe("/repo/one")
  expect(folderOf(ONE)).toBe("/repo/one")
})

test("the form a body is read as follows the extension its path carries", () => {
  expect(loaderOf("/repo/one.ts")).toBe("ts")
  expect(loaderOf("/repo/one.tsx")).toBe("tsx")
  expect(loaderOf("/repo/one.json")).toBe("json")
  expect(loaderOf("/repo/one.notes")).toBe("text")
})

test("a body handed over is served under the form its path names", () => {
  const said = servingOut({ [ONE]: "export const held = 1\n" }, ONE)
  expect(said).toEqual({ contents: "export const held = 1\n", loader: "ts" })
})

test("a path the change takes away refuses the import reaching it", () => {
  expect(() => servingOut({ [ONE]: null }, ONE)).toThrow(ONE)
  expect(() => servingOut({}, ONE)).toThrow(ONE)
})

test("the bodies are read back out of the file they were written to", () => {
  const at = join(scratch.rootFor("test-bodies-"), "bodies.json")
  writeFileSync(at, JSON.stringify({ [ONE]: "held\n", [TWO]: null }))
  expect(bodiesAt(at)).toEqual({ [ONE]: "held\n", [TWO]: null })
})

test("the preload text names this module and the file the bodies were written to", () => {
  const said = preloadingOf("/var/tmp/held/bodies.json")
  expect(said).toContain(JSON.stringify(SERVING))
  expect(said).toContain(JSON.stringify("/var/tmp/held/bodies.json"))
  expect(said).toContain("Bun.plugin(servedBy(bodiesAt(")
})

test("the plugin made for a change is named once however many bodies it serves", () => {
  expect(servedBy({}).name).toBe(servedBy({ [ONE]: "held\n" }).name)
})
