import { afterAll, expect, test } from "bun:test"
import {
  bodyOf,
  HELD_CODE,
  idOf,
  indexedRepo,
  NAMER_CODE,
  pageOf,
  scratch,
} from "@akasha/indexes/indexing/testing"
import { schemaFiled } from "@akasha/indexes/testing"
import { NOT_WORKED_OUT } from "@akasha/pages/shadow"
import { stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { guardedBy, NOT_READ } from "../../../modules/guarding/change-guarding.module.code.ts"
import {
  carriedOff,
  heldAt,
  tookAway,
} from "../../../modules/guarding/change-guarding.module.test-fixtures.ts"
import { importNotLeftHanging } from "./import-not-left-hanging.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [importNotLeftHanging]

const APART_PAGE = "akasha/apart.domain.ts"

const APART_BODY = bodyOf({ id: idOf("b"), pageTypeSlug: "domain", slug: "apart" })

const SPARE_PAGE = "akasha/three/spare.module.ts"

const SPARE_CODE = "akasha/three/spare.module.code.ts"

const CARRIED_CODE = "akasha/one/carried.module.code.ts"

function brokenRoot(): string {
  const root = scratch.rootFor("import-broken-")
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

function spareRepo(): string {
  return indexedRepo({
    [SPARE_PAGE]: pageOf({
      id: idOf("d"),
      pageTypeSlug: "module",
      slug: "spare",
      definition: "a page importing the page held",
      code: "ts",
    }),
    [SPARE_CODE]:
      'import { kept } from "../one/held.module.code.ts"\n\nexport const spare = kept\n',
  })
}

function takingAway(root: string, path: string): Answer {
  return tookAway(root, path, GUARDS)
}

test("a shadow that will not build refuses rather than answering no hanging import", () => {
  const root = brokenRoot()

  const said = guardedBy(
    worldAt(root, heldAt(root, HELD_CODE)),
    stating([
      { kind: "remove", path: HELD_CODE },
      { kind: "add", path: APART_PAGE, content: APART_BODY },
    ]),
    GUARDS
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(NOT_WORKED_OUT)
})

test("an index that will not read refuses rather than answering no hanging import", () => {
  const root = scratch.rootFor("import-no-index-")

  const said = guardedBy(
    worldAt(root, heldAt(root, HELD_CODE)),
    stating([{ kind: "remove", path: HELD_CODE }]),
    GUARDS
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(NOT_READ)
})

test("a file another file still imports is refused", () => {
  const root = indexedRepo()

  const said = takingAway(root, HELD_CODE)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${NAMER_CODE}\` imports \`${HELD_CODE}\`, and \`${HELD_CODE}\` holds no body after`
  )
})

test("a file nothing imports is not refused", () => {
  const root = spareRepo()

  const said = takingAway(root, NAMER_CODE)

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
})

test("a file carried off a path another file still imports is refused", () => {
  const root = indexedRepo()

  const said = carriedOff(root, HELD_CODE, CARRIED_CODE, GUARDS)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${NAMER_CODE}\` imports \`${HELD_CODE}\`, and \`${HELD_CODE}\` holds no body after`
  )
})

test("a file carried off a path nothing imports is not refused", () => {
  const root = spareRepo()

  const said = carriedOff(root, NAMER_CODE, CARRIED_CODE, GUARDS)

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
})
