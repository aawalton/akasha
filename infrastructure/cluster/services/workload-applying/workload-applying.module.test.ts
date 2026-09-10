import { afterAll, expect, test } from "bun:test"
import { seededWorld } from "../web-app-reading/web-app-reading.module.test-fixtures.ts"
import { servableNamed } from "./workload-applying.module.code.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

test("a slug no cluster service page carries is read as no workload", () => {
  const read = servableNamed(WORLD.root, "no-such-service-here")

  expect(read).toHaveProperty("refused")
})

test("a slug no cluster service page carries is refused by naming that slug", () => {
  const read = servableNamed(WORLD.root, "no-such-service-here")

  expect("refused" in read ? read.refused : "").toContain("no-such-service-here")
})

test("a root git will not list is refused rather than read as no cluster service", () => {
  const read = servableNamed("/var/empty/no-such-root-here", "headscale")

  expect("refused" in read ? read.refused : "").toContain("git could not list")
})
