import { afterEach, expect, test } from "bun:test"
import { updateRootParentLastSyncedAt } from "akasha/alan/collection/great-courses/modules/root-parent-query/root-parent-query.module.code.ts"
import { z } from "zod"

const SENT_BODY = z.record(z.string(), z.unknown())

const HELD_FETCH = globalThis.fetch

afterEach(() => {
  globalThis.fetch = HELD_FETCH
})

test("the day written back names the commit the root was asked at", async () => {
  const writes: Record<string, unknown>[] = []
  globalThis.fetch = ((url: string, init: RequestInit) => {
    const body = SENT_BODY.parse(JSON.parse(String(init.body)))
    if (String(url).endsWith("/write")) {
      writes.push(body)
      return Promise.resolve(Response.json({ commit: "a".repeat(40), wrote: ["a.ts"], took: [] }))
    }
    const root = { slug: "the-great-courses", title: "The Great Courses", externalIdentity: [] }
    return Promise.resolve(Response.json({ rows: [root], n: 1, at: "commit-asked" }))
  }) as typeof fetch
  expect(await updateRootParentLastSyncedAt()).toBe(true)
  expect(writes.map((one) => one.read)).toEqual(["commit-asked"])
})
