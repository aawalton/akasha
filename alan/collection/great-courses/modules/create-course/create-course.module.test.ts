import { afterEach, expect, test } from "bun:test"
import { createCourse } from "akasha/alan/collection/great-courses/modules/create-course/create-course.module.code.ts"
import { z } from "zod"

const SENT_BODY = z.record(z.string(), z.unknown())

const HELD_FETCH = globalThis.fetch

afterEach(() => {
  globalThis.fetch = HELD_FETCH
})

test("a course is written as a new page", async () => {
  const writes: Record<string, unknown>[] = []
  globalThis.fetch = ((_url: string, init: RequestInit) => {
    writes.push(SENT_BODY.parse(JSON.parse(String(init.body))))
    return Promise.resolve(Response.json({ commit: "a".repeat(40), wrote: ["a.ts"], took: [] }))
  }) as typeof fetch
  const course = {
    title: "A Course",
    url: "https://example.com/c/a-course",
    externalId: "a-course",
  }
  const said = await createCourse(course, ["the-great-courses"])
  expect(said).toEqual({ created: 1, updated: 0, skipped: 0, failed: 0 })
  const pages = writes[0]?.pages as Record<string, unknown>[]
  expect(pages.map((one) => one.fresh)).toEqual([true])
})
