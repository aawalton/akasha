import { describe, expect, test } from "bun:test"
import {
  MANIFEST,
  progressOf,
  sameCourse,
  writeOf,
} from "akasha/alan/collection/great-courses/browser-extensions/watching/great-courses-watching.browser-extension.extension-worker.code.ts"
import { manifestFault } from "akasha/command/pages/deploy/modules/extension-placing/deploy-extension-placing.module.code.ts"

describe("MANIFEST", () => {
  test("the manifest is one a deploy places", () => {
    expect(manifestFault(MANIFEST)).toBeNull()
  })

  test("the worker reaches alanwalton.com", () => {
    expect(MANIFEST.host_permissions).toContain("https://alanwalton.com/*")
  })
})

describe("sameCourse", () => {
  test("a course page the link was sent on to is the same course", () => {
    const link = "https://www.thegreatcoursesplus.com/the-vikings"
    expect(sameCourse(link, "/the-vikings")).toBe(true)
  })

  test("another course page is not", () => {
    const link = "https://www.thegreatcoursesplus.com/the-vikings"
    expect(sameCourse(link, "/the-celtic-world")).toBe(false)
  })
})

describe("writeOf", () => {
  test("the write sets the course's length and progress by its id", () => {
    expect(JSON.parse(writeOf("id-1", 60, 35))).toEqual({
      op: "patchPage",
      args: {
        pageTypeSlug: "great-course",
        where: [{ key: "id", eq: "id-1" }],
        set: { ownLength: 60, ownProgress: 35 },
      },
    })
  })

  test("progress is never written past the length", () => {
    expect(JSON.parse(writeOf("id-1", 60, 61)).args.set.ownProgress).toBe(60)
  })
})

describe("progressOf", () => {
  const row = (attributes: Readonly<Record<string, unknown>>) => ({
    id: "id-1",
    slug: "a",
    title: null,
    attributes,
  })

  test("a course's progress is read off its page", () => {
    expect(progressOf(row({ ownProgress: 42.5 }))).toBe(42.5)
  })

  test("a page stating no progress is at the start", () => {
    expect(progressOf(row({}))).toBe(0)
  })

  test("no page gives no progress", () => {
    expect(progressOf(null)).toBeNull()
  })
})
