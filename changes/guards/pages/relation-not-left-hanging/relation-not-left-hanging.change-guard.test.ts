import { afterAll, expect, test } from "bun:test"
import { relationNotLeftHanging } from "akasha/changes/guards/pages/relation-not-left-hanging/relation-not-left-hanging.change-guard.code.ts"
import { stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { guardedBy, NOT_READ } from "akasha/changes/modules/guarding/change-guarding.module.code.ts"
import {
  heldAt,
  tookAway,
} from "akasha/changes/modules/guarding/change-guarding.module.test-fixtures.ts"
import { worldAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  bodyOf,
  HELD_PAGE,
  HELD_SLUG,
  idOf,
  indexedRepo,
  NAMER_PAGE,
  pageOf,
  scratch,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import { schemaFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { NOT_WORKED_OUT } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const GUARDS = [relationNotLeftHanging]

const APART_PAGE = "akasha/apart.domain.ts"

const APART_BODY = bodyOf({ id: idOf("b"), pageTypeSlug: "domain", slug: "apart" })

const SPARK_TYPE = "akasha/spark.page-type.ts"

const SPARK_PAGE = "akasha/spark/one.spark.ts"

const LONE_PAGE = "akasha/lone/lone.module.ts"

const MORTAL_TYPE = bodyOf({
  id: idOf("d"),
  pageTypeSlug: "page-type",
  slug: "spark",
  extends: ["page-type/domain"],
  mortal: true,
})

function brokenRoot(): string {
  const root = scratch.rootFor("relation-broken-")
  schemaFiled(root, "text-property", "held", [
    {
      pageTypeSlug: "text-property",
      targetPageTypeSlug: null,
      unique: null,
      slug: "held",
      propertySlug: "held",
    },
  ])
  return root
}

function takingAway(root: string, path: string): Answer {
  return tookAway(root, path, GUARDS)
}

test("a shadow that will not build refuses rather than answering no hanging relation", () => {
  const root = brokenRoot()

  const said = guardedBy(
    worldAt(root, heldAt(root, HELD_PAGE)),
    stating([
      { kind: "remove", path: HELD_PAGE },
      { kind: "add", path: APART_PAGE, content: APART_BODY },
    ]),
    GUARDS
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(NOT_WORKED_OUT)
})

test("an index that will not read refuses rather than answering no hanging relation", () => {
  const root = scratch.rootFor("relation-no-index-")

  const said = guardedBy(
    worldAt(root, heldAt(root, HELD_PAGE)),
    stating([{ kind: "remove", path: HELD_PAGE }]),
    GUARDS
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(NOT_READ)
})

test("a page another page still names is refused", () => {
  const root = indexedRepo()

  const said = takingAway(root, HELD_PAGE)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(
    /^`akasha\/two\/namer\.module\.ts` names `akasha\/one\/held\.module\.ts` as its `(note|part-slugs)`, and `akasha\/one\/held\.module\.ts` is taken away$/
  )
})

test("a page no other page names is not refused", () => {
  const root = indexedRepo()

  const said = takingAway(root, NAMER_PAGE)

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
})

test("a mortal page naming the page taken away is not refused", () => {
  const root = indexedRepo({
    [SPARK_TYPE]: MORTAL_TYPE,
    [SPARK_PAGE]: pageOf({
      id: idOf("e"),
      pageTypeSlug: "spark",
      slug: "one",
      partSlugs: ["module/lone"],
    }),
    [LONE_PAGE]: pageOf({
      id: idOf("f"),
      pageTypeSlug: "module",
      slug: "lone",
      definition: "a page a mortal page names",
    }),
  })

  const said = takingAway(root, LONE_PAGE)

  expect(said.refused).toBe(null)
})

test("a page whose page type is mortal is not refused for the pages naming that page", () => {
  const root = indexedRepo({
    [SPARK_TYPE]: MORTAL_TYPE,
    [SPARK_PAGE]: pageOf({ id: idOf("e"), pageTypeSlug: "spark", slug: "one" }),
    [NAMER_PAGE]: pageOf({
      id: idOf("9"),
      pageTypeSlug: "module",
      slug: "namer",
      definition: "a page an indexed repository carries",
      code: "ts",
      note: HELD_SLUG,
      partSlugs: [`module/${HELD_SLUG}`, "spark/one"],
    }),
  })

  const said = takingAway(root, SPARK_PAGE)

  expect(said.refused).toBe(null)
})
