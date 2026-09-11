import { afterAll, expect, test } from "bun:test"
import { seededWorld } from "akasha/infrastructure/services/clusters/web-app-reading/web-app-reading.module.test-fixtures.ts"
import { servableNamed } from "akasha/infrastructure/services/clusters/workload-applying/workload-applying.module.code.ts"

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
