import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../command-system/scratching.module.code.ts"
import { insideOf, settled } from "./settling.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function worldAt(): string {
  return realpathSync(scratch.rootFor("akasha-settling-"))
}

test("a path that stands settles on itself", () => {
  const root = worldAt()
  writeFileSync(join(root, "one.ts"), "one\n")
  expect(settled(join(root, "one.ts"))).toBe(join(root, "one.ts"))
})

test("a path is judged by where it lands, never by how it is spelled", () => {
  const root = worldAt()
  mkdirSync(join(root, "here"), { recursive: true })
  writeFileSync(join(root, "one.ts"), "one\n")
  expect(settled(join(root, "here", "..", "one.ts"))).toBe(join(root, "one.ts"))
})

test("a link settles on what it points at", () => {
  const root = worldAt()
  writeFileSync(join(root, "one.ts"), "one\n")
  symlinkSync(join(root, "one.ts"), join(root, "pointer.ts"))
  expect(settled(join(root, "pointer.ts"))).toBe(join(root, "one.ts"))
})

test("a link through a folder settles on where the file lands", () => {
  const root = worldAt()
  mkdirSync(join(root, "real"), { recursive: true })
  writeFileSync(join(root, "real", "one.ts"), "one\n")
  symlinkSync(join(root, "real"), join(root, "seen"))
  expect(settled(join(root, "seen", "one.ts"))).toBe(join(root, "real", "one.ts"))
})

test("a path settles even where nothing stands at the end of it yet", () => {
  const root = worldAt()
  expect(settled(join(root, "not", "there", "yet.ts"))).toBe(join(root, "not", "there", "yet.ts"))
})

test("a ring of links settles rather than running on", () => {
  const root = worldAt()
  symlinkSync(join(root, "two.ts"), join(root, "one.ts"))
  symlinkSync(join(root, "one.ts"), join(root, "two.ts"))
  expect(typeof settled(join(root, "one.ts"))).toBe("string")
})

test("a root holds itself", () => {
  expect(insideOf("/one/two", "/one/two")).toBe(true)
})

test("a path under a root is inside it", () => {
  expect(insideOf("/one/two", "/one/two/three/four.ts")).toBe(true)
})

test("a path beside a root is not inside it", () => {
  expect(insideOf("/one/two", "/one/three/four.ts")).toBe(false)
})

test("a path above a root is not inside it", () => {
  expect(insideOf("/one/two", "/one")).toBe(false)
})

test("a root's name being a prefix of another does not put it inside", () => {
  expect(insideOf("/one/two", "/one/twothree/four.ts")).toBe(false)
})
