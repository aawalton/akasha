import { expect, test } from "bun:test"
import { holding } from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import {
  heldFolder,
  namedUnder,
  namingFolderOf,
  namingOver,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-naming/folder-naming.module.code.ts"
import {
  openingWith,
  strippedOf,
} from "akasha/page/naming/modules/folder-named/folder-named.module.code.ts"

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
      "akasha/temper-skill": ["temper-skill"],
      "akasha/temper-skill/held": ["temper-skill"],
    }),
    HELD
  )
  expect(naming("akasha/temper-skill/held")).toEqual({ name: null, gives: "temper-skill" })
})

test("a name the folder does not carry yet is asked against the page above the same way", () => {
  const holds = holding({
    "akasha/pages": ["page", "pages"],
    "akasha/pages/service": ["pages-service"],
  })
  expect(namingOver(holds, HELD)("akasha/pages/service")).toEqual({ name: "service" })
  expect(namedUnder("akasha/pages/service", "page-service", holds, HELD)).toBe("service")
})

test("a name a part sits under is asked against the page above that part", () => {
  const holds = holding({ "akasha/foo": ["foo", "foos"] })
  expect(namedUnder("akasha/foo/modules/one", "foo-two", holds, HELD)).toBe("two")
  expect(namedUnder("akasha/foo/modules/one", "two", holds, HELD)).toBe("two")
})

test("the folder with nothing above it is asked for no name", () => {
  const naming = namingOver(holding({ "": ["akasha"] }), HELD)
  expect(naming("")).toBe(null)
})

test("a folder named `pages` the page in it names is that page's folder rather than a part", () => {
  const holds = holding({ "akasha/pages-system/pages": ["page", "pages"] })
  expect(heldFolder("akasha/pages-system/pages", holds, HELD)).toBe(false)
  expect(namingFolderOf("akasha/pages-system/pages/modules/address", holds, HELD)).toBe(
    "akasha/pages-system/pages"
  )
})

test("a folder named `pages` the page in it does not name is that page's folder all the same", () => {
  const holds = holding({ "akasha/foo/pages": ["bar"] })
  expect(heldFolder("akasha/foo/pages", holds, HELD)).toBe(false)
  expect(namingFolderOf("akasha/foo/pages/deep", holds, HELD)).toBe("akasha/foo/pages")
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

test("a folder named `scripts` holding a page is that page's folder rather than a part", () => {
  const holds = holding({ "akasha/foo/scripts": ["bar"] })
  expect(heldFolder("akasha/foo/scripts", holds, HELD)).toBe(false)
  expect(namingFolderOf("akasha/foo/scripts/deep", holds, HELD)).toBe("akasha/foo/scripts")
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

test("a part is looked through, so a folder in it is named against the folder above that part", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  expect(namingFolderOf("akasha/foo/modules/one", holds, HELD)).toBe("akasha/foo")
})

test("a folder named a plural holding a page slugged otherwise names what sits under it", () => {
  const held = new Set<string>([...HELD, "mechanics", "skills"])
  const holds = holding({
    "story/world": ["world"],
    "story/world/mechanics": ["world-mechanic"],
  })
  const at = "story/world/mechanics/skills/pages/world-class-solo"
  expect(heldFolder("story/world/mechanics", holds, held)).toBe(false)
  expect(namingFolderOf(at, holds, held)).toBe("story/world/mechanics")
  expect(namedUnder(at, "world-class-solo", holds, held)).toBe("world-class-solo")
})
