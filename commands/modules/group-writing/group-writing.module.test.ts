import { describe, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  groupAt,
  groupsIn,
  writingIn,
} from "akasha/commands/modules/group-writing/group-writing.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

const ROOT = codeRoot()

const INDEX = shadowAt(ROOT).index

const COMPOSING = "composing"

const PAGE = "here/there/one.container-recipe.ts"

const GROUP = "here/there/one.container-recipe.composing.code.ts"

const WRITTEN = "here/there/Containerfile"

describe("where a page's group sits", () => {
  test("a group's code is beside the page keeping that group", () => {
    expect(groupAt(PAGE, COMPOSING)).toBe(GROUP)
  })

  test("a path that is no TypeScript file names no group", () => {
    expect(groupAt(WRITTEN, COMPOSING)).toBeNull()
  })
})

describe("the groups a file property names", () => {
  test("a group is answered with the property whose file that group writes", () => {
    const found = groupsIn(INDEX).find((one) => one.slug === COMPOSING)
    expect(found?.propertySlug).toBe("recipe")
  })

  test("a group is answered with the page types carrying that group", () => {
    const found = groupsIn(INDEX).find((one) => one.slug === COMPOSING)
    expect(found?.pageTypeSlugs).toEqual(["container-recipe"])
  })

  test("a group no file property names is not answered", () => {
    expect(groupsIn(INDEX).find((one) => one.slug === "check")).toBeUndefined()
  })
})

describe("reaching a group", () => {
  test("a group at no path is said rather than thrown", () => {
    expect("missing" in writingIn(ROOT, GROUP)).toBe(true)
  })

  test("every group beside a page answers the one function a group answers", () => {
    const gone: string[] = []
    for (const group of groupsIn(INDEX)) {
      for (const pageTypeSlug of group.pageTypeSlugs) {
        for (const listed of INDEX.everyOfType(pageTypeSlug)) {
          const beside = groupAt(listed.path, group.slug)
          if (beside === null || !existsSync(join(ROOT, beside))) continue
          if ("missing" in writingIn(ROOT, beside)) gone.push(beside)
        }
      }
    }
    expect(gone).toEqual([])
  })
})
