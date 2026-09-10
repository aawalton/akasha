import { afterAll, expect, test } from "bun:test"
import { listedTakenFrom } from "@akasha/indexes/testing"
import { landing } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  declaresIn,
  introducedIn,
  type PageType,
  partedIn,
  sourceOf,
  typeNamedIn,
} from "./introduced-property-is-a-part.code-check.decision.code.ts"
import {
  bytesOf,
  judgedBy,
  PAGE_TYPE,
  pathFor,
  QUALIFIED,
  rooted,
  scratch,
  shadowed,
  TEXT,
  typed,
} from "./introduced-property-is-a-part.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a page type naming the property it introduces among its parts is let through", () => {
  const root = rooted()
  typed(root, "held", null, ["mine"], ["text-property/mine"])
  const said = judgedBy(
    landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], ["text-property/mine"]) })
  )
  expect(said).toEqual([])
})

test("a page type introducing a property it does not part is refused", () => {
  const root = rooted()
  typed(root, "held", null, ["mine"], [])
  const said = judgedBy(landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], []) }))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`mine`")
  expect(said[0]?.path).toBe(pathFor("held"))
})

test("a property restated to narrow it is inherited, not introduced", () => {
  const root = rooted()
  typed(root, "over", null, ["mine"], ["text-property/mine"])
  typed(root, "under", "over", ["mine"], [])
  const held = { [pathFor("under")]: bytesOf("under", "over", ["mine"], []) }
  expect(judgedBy(landing(root, held))).toEqual([])
})

test("a property restated under a page type the same change adds is inherited", () => {
  const root = rooted()
  const said = judgedBy(
    landing(root, {
      [pathFor("over")]: bytesOf("over", null, ["mine"], ["text-property/mine"]),
      [pathFor("under")]: bytesOf("under", "over", ["mine"], []),
    })
  )
  expect(said).toEqual([])
})

test("a page type the same change adds does not hide the introducer above it", () => {
  const root = rooted()
  const said = judgedBy(
    landing(root, {
      [pathFor("over")]: bytesOf("over", null, ["mine"], []),
      [pathFor("under")]: bytesOf("under", "over", ["mine"], []),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("over"))
  expect(said[0]?.reason).toContain("`mine`")
})

test("a property two page types introduce is passed over", () => {
  const root = rooted()
  typed(root, "one", null, ["shared"], [])
  typed(root, "two", null, ["shared"], [])
  const held = { [pathFor("one")]: bytesOf("one", null, ["shared"], []) }
  expect(judgedBy(landing(root, held))).toEqual([])
})

test("a type that stops introducing a property leaves the other introducer refused", () => {
  const root = rooted()
  typed(root, "one", null, ["shared"], [])
  typed(root, "two", null, ["shared"], [])
  const said = judgedBy(landing(root, { [pathFor("one")]: bytesOf("one", null, [], []) }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("two"))
})

test("a type taken away leaves the other introducer refused", () => {
  const root = rooted()
  typed(root, "one", null, ["shared"], [`${TEXT}/shared`])
  typed(root, "two", null, ["shared"], [])
  const said = judgedBy(
    landing(
      root,
      { [pathFor("one")]: null },
      { [pathFor("one")]: bytesOf("one", null, ["shared"], [`${TEXT}/shared`]) }
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("two"))
  expect(said[0]?.reason).toContain("`shared`")
})

test("a part is matched by the slug it addresses, whatever page type it names", () => {
  const root = rooted()
  typed(root, "held", null, ["mine"], ["number-property/mine"])
  const said = judgedBy(
    landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], ["number-property/mine"]) })
  )
  expect(said).toEqual([])
})

test("a part is matched by the slug it addresses, whatever the declaration names", () => {
  const root = rooted()
  typed(root, "held", null, [QUALIFIED], [QUALIFIED])
  const held = { [pathFor("held")]: bytesOf("held", null, [QUALIFIED], [QUALIFIED]) }
  expect(judgedBy(landing(root, held))).toEqual([])
})

test("a page type declaring a property by page type and parting nothing is still refused", () => {
  const root = rooted()
  typed(root, "held", null, [QUALIFIED], [])
  const held = { [pathFor("held")]: bytesOf("held", null, [QUALIFIED], []) }
  const said = judgedBy(landing(root, held))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain(`\`${QUALIFIED}\``)
  expect(said[0]?.path).toBe(pathFor("held"))
})

test("a declaration naming its page type and a bare one reach the same property", () => {
  const root = rooted()
  typed(root, "over", null, [QUALIFIED], [QUALIFIED])
  typed(root, "under", "over", ["foo"], [])
  const held = { [pathFor("under")]: bytesOf("under", "over", ["foo"], []) }
  expect(judgedBy(landing(root, held))).toEqual([])
})

test("a page type the change takes away is not judged", () => {
  const root = rooted()
  typed(root, "held", null, ["mine"], [])
  typed(root, "other", null, ["its"], ["text-property/its"])
  const said = judgedBy(
    landing(
      root,
      {
        [pathFor("held")]: null,
        [pathFor("other")]: bytesOf("other", null, ["its"], ["text-property/its"]),
      },
      { [pathFor("held")]: bytesOf("held", null, ["mine"], []) }
    )
  )
  expect(said).toEqual([])
})

test("a page type the index does not list by slug is judged from the value gathered for it", () => {
  const root = rooted()
  typed(root, "held", null, ["mine"], [])
  typed(root, "other", null, ["its"], [`${TEXT}/its`])
  listedTakenFrom(root, PAGE_TYPE, "held")
  const said = judgedBy(
    landing(root, { [pathFor("other")]: bytesOf("other", null, ["its"], [`${TEXT}/its`]) })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("held"))
  expect(said[0]?.reason).toContain("`mine`")
})

test("what a page type declares and parts is read off its body", () => {
  expect(
    declaresIn({ properties: [{ pagePropertySlug: "one" }, { pagePropertySlug: "two" }] })
  ).toEqual(["one", "two"])
  expect(declaresIn(null)).toEqual([])
  expect([...partedIn({ partSlugs: ["text-property/one", "module/two"] })]).toEqual(["one", "two"])
  expect([...partedIn({})]).toEqual([])
})

test("a page-type page is named wherever it sits, and no other page is", () => {
  expect(typeNamedIn("a/b/check.page-type.ts")).toBe("check")
  expect(typeNamedIn("pages/held.page-type.ts")).toBe("held")
  expect(typeNamedIn("held.domain.ts")).toBeNull()
})

const BOTH: readonly string[] = ["one", "two"]

test("a property either page type above declares is inherited, not introduced", () => {
  const root = rooted()
  typed(root, "one", null, ["mine"], [`${TEXT}/mine`])
  typed(root, "two", null, ["its"], [`${TEXT}/its`])
  const change = landing(root, {
    [pathFor("under")]: bytesOf("under", BOTH, ["mine", "its", "foo"], []),
  })
  const shadow = shadowed(change)
  const under: PageType = {
    slug: "under",
    path: pathFor("under"),
    value: shadow.pageOf(pathFor("under")),
  }
  expect(introducedIn(under, sourceOf([under], shadow.index.sourceIn()))).toEqual(["foo"])
})

test("a page type inheriting through the second name above it hides no introducer", () => {
  const root = rooted()
  typed(root, "one", null, ["its"], [`${TEXT}/its`])
  typed(root, "two", null, ["mine"], [])
  const held = { [pathFor("under")]: bytesOf("under", BOTH, ["mine"], []) }
  const said = judgedBy(landing(root, held))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("two"))
  expect(said[0]?.reason).toContain("`mine`")
  expect(said[0]?.reason).toContain("`two`")
})

test("a page type naming two above it is refused naming the property and itself", () => {
  const root = rooted()
  typed(root, "one", null, ["its"], [`${TEXT}/its`])
  typed(root, "two", null, ["shared"], [`${TEXT}/shared`])
  const held = { [pathFor("under")]: bytesOf("under", BOTH, ["mine"], []) }
  const said = judgedBy(landing(root, held))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("under"))
  expect(said[0]?.reason).toBe(
    "introduces `mine` and does not name it among its parts — a property sits under the page " +
      "type introducing it, and `under` is the only one that does"
  )
})
