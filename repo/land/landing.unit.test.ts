import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { loadPages } from "../../page/index/store/store.ts"
import { indexAfterLanding } from "./landing.ts"

const root = mkdtempSync("/var/tmp/astra-landing-")

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

test("a landing in a checkout the index was not built over leaves the index untouched", () => {
  const relPath = "pages/probe/astra-foreign-root.probe.md"
  mkdirSync(join(root, "pages/probe"), { recursive: true })
  writeFileSync(join(root, relPath), "---\npage-type-slug: probe\n---\n")
  const was = loadPages().length
  expect(() => indexAfterLanding("instructions", root, new Map(), [relPath], [])).not.toThrow()
  expect(loadPages().length).toBe(was)
  expect(loadPages().some((one) => one.key === relPath)).toBe(false)
})
