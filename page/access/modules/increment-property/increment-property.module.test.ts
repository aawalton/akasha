import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { FileWriteDeps } from "akasha/page/access/modules/file-write/file-write.module.code.ts"
import {
  type IncrementDeps,
  incrementProperty,
} from "akasha/page/access/modules/increment-property/increment-property.module.code.ts"
import type {
  Incremented,
  Incrementing,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.code.ts"
import {
  BESIDE_AT,
  counterRoot,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.test-fixtures.ts"
import { answering } from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import { writerFor } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

const HELD = [{ key: "slug", eq: "held-counter" }]

function finding(slugs: readonly string[]): FileWriteDeps {
  return {
    ask: () => Promise.resolve({ rows: slugs.map((slug) => ({ slug })), n: slugs.length }),
    read: () => Promise.resolve({ refused: "nothing is read here" }),
    write: () => Promise.resolve({ refused: "nothing is written here" }),
  }
}

function over(slugs: readonly string[], answer: Incremented, told: Incrementing[] = []) {
  const deps: IncrementDeps = {
    find: finding(slugs),
    increment: (asked) => {
      told.push(asked)
      return Promise.resolve(answer)
    },
  }
  return deps
}

test("an increment returns the count the pages answered", async () => {
  const said = await incrementProperty(
    { pageTypeSlug: "counter", where: HELD, key: "taps" },
    over(["held-counter"], { value: 3 })
  )
  expect(said).toBe(3)
})

test("an increment names the page it found, adds one by default, and sets what it is handed", async () => {
  const told: Incrementing[] = []
  await incrementProperty(
    { pageTypeSlug: "counter", where: HELD, key: "taps", set: { lastTappedAt: "now" } },
    over(["held-counter"], { value: 1 }, told)
  )
  expect(told[0]?.slug).toBe("held-counter")
  expect(told[0]?.by).toBe(1)
  expect(told[0]?.set).toEqual({ lastTappedAt: "now" })
})

test("an increment adds the amount it states", async () => {
  const told: Incrementing[] = []
  await incrementProperty(
    { pageTypeSlug: "counter", where: HELD, key: "taps", by: 5 },
    over(["held-counter"], { value: 5 }, told)
  )
  expect(told[0]?.by).toBe(5)
})

test("an increment matching no page returns null and sends nothing", async () => {
  const told: Incrementing[] = []
  const said = await incrementProperty(
    { pageTypeSlug: "counter", where: HELD, key: "taps" },
    over([], { value: 1 }, told)
  )
  expect(said).toBe(null)
  expect(told.length).toBe(0)
})

test("an increment matching more than one page is refused", async () => {
  const done = incrementProperty(
    { pageTypeSlug: "counter", where: [], key: "taps" },
    over(["one", "two"], { value: 1 })
  )
  await expect(done).rejects.toThrow("at most one page")
})

test("an increment the pages refuse throws the refusal", async () => {
  const done = incrementProperty(
    { pageTypeSlug: "counter", where: HELD, key: "taps" },
    over(["held-counter"], { refused: "`taps` holds a string rather than a number" })
  )
  await expect(done).rejects.toThrow("rather than a number")
})

test("many increments sent at once through the pages service are each counted", async () => {
  const root = counterRoot()
  const writer = writerFor({ root })
  const server = Bun.serve({ port: 0, fetch: (request) => answering({ root, writer }, request) })
  process.env.PAGES_SERVICE_ORIGIN = `http://127.0.0.1:${server.port}`
  try {
    const many = 40
    const counts = await Promise.all(
      Array.from({ length: many }, () =>
        incrementProperty({
          pageTypeSlug: "counter",
          where: HELD,
          key: "taps",
          set: { lastTappedAt: "2026-09-24T12:00:00.000Z" },
        })
      )
    )
    expect(new Set(counts).size).toBe(many)
    expect(Math.max(...counts.map((one) => one ?? 0))).toBe(many)
    expect(readFileSync(join(root, BESIDE_AT), "utf8")).toContain(`"taps": ${many}`)
  } finally {
    delete process.env.PAGES_SERVICE_ORIGIN
    await server.stop(true)
  }
})
