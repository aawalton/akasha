import { expect, test } from "bun:test"
import {
  grouping,
  holding,
} from "../../folder-matches-a-shape.code-check.decision.test-fixtures.ts"
import {
  answeringTo,
  heldFolder,
  namingFolderOf,
  namingOver,
  openingWith,
  strippedOf,
} from "./folder-naming.module.code.ts"

const HELD = new Set<string>(["modules", "pages", "properties", "scripts"])

test("the opening a name shares with the page above it is taken off, and no more", () => {
  expect(strippedOf("temper-world-zones", ["temper-world", "temper-worlds"])).toBe("zones")
  expect(strippedOf("zones", ["temper-world", "temper-worlds"])).toBe("zones")
})

test("the opening is taken off again while what is left still opens with a name above", () => {
  expect(openingWith("y-z", ["x", "y"])).toBe("y")
  expect(strippedOf("x-y-z", ["x", "y"])).toBe("z")
})

test("a name the page above is named leaves nothing, so no name is worked out", () => {
  expect(strippedOf("temper-skills", ["temper-skill", "temper-skills"])).toBe(null)
})

test("a folder wanting a name that cannot be worked out still wants a name", () => {
  const naming = namingOver(
    holding({
      "akasha/temper-skills": ["temper-skills", "temper-skills"],
      "akasha/temper-skills/skills": ["temper-skill", "temper-skills"],
    }),
    HELD
  )
  expect(naming("akasha/temper-skills/skills")).toEqual({ name: null, gives: "temper-skills" })
})

test("a folder named `pages` the page in it names is that page's folder rather than a part", () => {
  const holds = holding({ "akasha/pages-system/pages": ["page", "pages"] })
  expect(heldFolder("akasha/pages-system/pages", holds, HELD)).toBe(false)
  expect(namingFolderOf("akasha/pages-system/pages/address", holds, HELD)).toBe(
    "akasha/pages-system/pages"
  )
})

test("a folder named `pages` the page in it does not name is a part, and is looked through", () => {
  const holds = holding({ "akasha/foo/pages": ["bar"] })
  expect(heldFolder("akasha/foo/pages", holds, HELD)).toBe(true)
  expect(namingFolderOf("akasha/foo/pages/deep", holds, HELD)).toBe("akasha/foo")
})

test("a folder named `pages` holding no page at all is a part", () => {
  const holds = holding({})
  expect(heldFolder("akasha/foo/pages", holds, HELD)).toBe(true)
  expect(namingFolderOf("akasha/foo/pages/deep", holds, HELD)).toBe("akasha/foo")
})

test("a name no enabled shape takes is no part, whatever else that folder is", () => {
  const holds = holding({})
  expect(heldFolder("akasha/foo/pages", holds, new Set<string>(["modules"]))).toBe(false)
})

test("a folder named `scripts` the page in it does not name is a part, and is looked through", () => {
  const holds = holding({ "akasha/foo/scripts": ["bar"] })
  expect(heldFolder("akasha/foo/scripts", holds, HELD)).toBe(true)
  expect(namingFolderOf("akasha/foo/scripts/deep", holds, HELD)).toBe("akasha/foo")
})

test("a folder named `scripts` the page in it names is that page's folder rather than a part", () => {
  const holds = holding({ "akasha/code-system/scripts": ["script", "scripts"] })
  expect(heldFolder("akasha/code-system/scripts", holds, HELD)).toBe(false)
  expect(namingFolderOf("akasha/code-system/scripts/deep", holds, HELD)).toBe(
    "akasha/code-system/scripts"
  )
})

test("every part between a folder and the page above it is looked through", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  expect(namingFolderOf("akasha/foo/modules/pages/deep", holds, HELD)).toBe("akasha/foo")
})

test("a folder named for no part is never looked through", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  expect(heldFolder("akasha/foo/other", holds, HELD)).toBe(false)
  expect(namingFolderOf("akasha/foo/other/deep", holds, HELD)).toBe("akasha/foo/other")
})

test("the folders sitting in a folder answer to that folder", () => {
  const grouped = grouping({ "akasha/foo": ["akasha/foo/one", "akasha/foo/two"] })
  expect(answeringTo("akasha/foo", grouped, holding({}), HELD)).toEqual([
    "akasha/foo/one",
    "akasha/foo/two",
  ])
})

test("a part is looked through, so the folders in it answer to the folder above that part", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  const grouped = grouping({
    "akasha/foo": ["akasha/foo/modules"],
    "akasha/foo/modules": ["akasha/foo/modules/one"],
  })
  expect([...answeringTo("akasha/foo", grouped, holds, HELD)].sort()).toEqual([
    "akasha/foo/modules",
    "akasha/foo/modules/one",
  ])
  expect(namingFolderOf("akasha/foo/modules/one", holds, HELD)).toBe("akasha/foo")
})

test("a folder named `pages` the page in it names ends the descent", () => {
  const holds = holding({ "akasha/pages-system/pages": ["page", "pages"] })
  const grouped = grouping({
    "akasha/pages-system": ["akasha/pages-system/pages"],
    "akasha/pages-system/pages": ["akasha/pages-system/pages/address"],
  })
  expect(answeringTo("akasha/pages-system", grouped, holds, HELD)).toEqual([
    "akasha/pages-system/pages",
  ])
})

test("a folder that is no part ends the descent, that folder naming the folders in it", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  const grouped = grouping({
    "akasha/foo": ["akasha/foo/other"],
    "akasha/foo/other": ["akasha/foo/other/deep"],
  })
  expect(answeringTo("akasha/foo", grouped, holds, HELD)).toEqual(["akasha/foo/other"])
  expect(namingFolderOf("akasha/foo/other/deep", holds, HELD)).toBe("akasha/foo/other")
})
