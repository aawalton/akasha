import { describe, expect, test } from "bun:test"
import {
  MANIFEST,
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
