import { afterAll, expect, test } from "bun:test"
import {
  aProperty,
  bodyOf,
  HELD_PAGE,
  idOf,
  indexedRepo,
  NAMER_CODE,
  NAMER_PAGE,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { relationNotLeftHanging } from "../../../guards/pages/relation-not-left-hanging/relation-not-left-hanging.change-guard.code.ts"
import { answered, taking } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import {
  type World,
  worldAt,
  worldOver,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { parentsOf, removePage } from "./remove-page.change-mechanical.code.ts"

afterAll(scratch.sweep)

const MISSING = "akasha/one/missing.module.ts"

const NOTES = aProperty(idOf("c"), "notes", "file-property")

const KEPT_TYPE = "akasha/kept.page-type.ts"

const KEPT_PAGE = "akasha/kept/one.kept.ts"

const KEPT_NOTES = "akasha/kept/one.kept.notes.uncommitted.jsonl"

const SPARE_PAGE = "akasha/three/spare.module.ts"

const SPARE_CODE = "akasha/three/spare.module.code.ts"

const NOTER_PAGE = "akasha/three/noter.module.ts"

const CHILD_PAGE = "akasha/four/child.module.ts"

const PARENT_PAGE = "akasha/four/parent.module.ts"

const AUNT_PAGE = "akasha/four/aunt.module.ts"

const SPARE: Readonly<Record<string, string>> = {
  [SPARE_PAGE]: pageOf({
    id: idOf("d"),
    pageTypeSlug: "module",
    slug: "spare",
    definition: "a page importing the page held",
    code: "ts",
  }),
  [SPARE_CODE]: 'import { kept } from "../one/held.module.code.ts"\n\nexport const spare = kept\n',
  [NOTER_PAGE]: pageOf({
    id: idOf("0"),
    pageTypeSlug: "module",
    slug: "noter",
    definition: "a page naming the page held by a relation that is no containment",
    note: "held",
  }),
}

const CHILD = pageOf({
  id: idOf("d"),
  pageTypeSlug: "module",
  slug: "child",
  definition: "a page its parent names in part-slugs",
})

function worldIn(root: string): World {
  return worldAt(root, textIn(root))
}

function keptRepo(): string {
  return indexedRepo({
    ...SPARE,
    [`akasha/${NOTES[0]}`]: bodyOf(NOTES[1]),
    [KEPT_TYPE]: bodyOf({
      id: idOf("e"),
      pageTypeSlug: "page-type",
      slug: "kept",
      extendsSlug: ["page-type/page"],
      properties: [
        {
          pagePropertySlug: "notes",
          required: false,
          many: false,
          uncommitted: true,
          default: "jsonl",
        },
      ],
    }),
    [KEPT_PAGE]: pageOf({ id: idOf("f"), pageTypeSlug: "kept", slug: "one" }),
    [KEPT_NOTES]: '{"held":1}\n',
  })
}

function naming(slug: string, id: string, named: string): string {
  return pageOf({
    id,
    pageTypeSlug: "module",
    slug,
    definition: "a page naming the child in part-slugs",
    partSlugs: [named],
  })
}

function familyRepo(named: Readonly<Record<string, string>>): string {
  return indexedRepo({ [CHILD_PAGE]: CHILD, ...named })
}

function bodyIn(said: Answer, at: string): string {
  return said.edits.find((one) => one.path === at)?.body ?? ""
}

function tookAway(root: string, path: string): Answer {
  return answered([taking(path, textIn(root)(path) ?? "")])
}

test("a page and the file beside that page are taken away together", () => {
  const root = indexedRepo(SPARE)
  const was = textIn(root)

  const said = removePage(worldIn(root), { at: NAMER_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([NAMER_CODE, NAMER_PAGE])
  for (const one of said.edits) {
    expect(one.body).toBe(null)
    expect(one.was).toBe(was(one.path))
  }
})

test("a page another page still names is refused by the guards this change names", () => {
  const root = indexedRepo(SPARE)

  const said = removePage(worldIn(root), { at: HELD_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(`\`${HELD_PAGE}\` is taken away`)
})

test("a path the world names no page at is refused", () => {
  const root = indexedRepo()

  const said = removePage(worldIn(root), { at: MISSING })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${MISSING}\` names no page, so no page is taken away`)
})

test("a page holding no body is refused by the removal of its own file", () => {
  const root = indexedRepo(SPARE)
  const was = textIn(root)
  const reading = (path: string): string | null => (path === NAMER_PAGE ? null : was(path))

  const said = removePage(worldAt(root, reading), { at: NAMER_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` holds no body, so a removal takes nothing away`)
})

test("a file beside the page git does not track is taken away too", () => {
  const root = keptRepo()

  const said = removePage(worldIn(root), { at: KEPT_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([KEPT_NOTES, KEPT_PAGE])
})

test("a page an earlier change in the same answer took away is no page here", () => {
  const root = indexedRepo(SPARE)
  const world = worldOver(worldIn(root), tookAway(root, NAMER_PAGE))

  const said = removePage(world, { at: NAMER_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` names no page, so no page is taken away`)
})

test("the parent naming the page in part-slugs is answered from the world", () => {
  const root = indexedRepo()

  expect(parentsOf(worldIn(root), HELD_PAGE)).toEqual([
    { path: NAMER_PAGE, propertySlug: "part-slugs" },
  ])
})

test("a parent an earlier change in the same answer took away is answered no longer", () => {
  const root = indexedRepo()
  const world = worldOver(worldIn(root), tookAway(root, NAMER_PAGE))

  expect(parentsOf(world, HELD_PAGE)).toEqual([])
})

test("the page and the parent's entry for that page go in one answer", () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })
  const was = textIn(root)

  const said = removePage(worldIn(root), { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([CHILD_PAGE, PARENT_PAGE])
  expect(said.edits.find((one) => one.path === CHILD_PAGE)?.body).toBe(null)
  expect(bodyIn(said, PARENT_PAGE)).toContain('"partSlugs": []')
  expect(bodyIn(said, PARENT_PAGE)).not.toContain("module/child")
  expect(said.edits.find((one) => one.path === PARENT_PAGE)?.was).toBe(was(PARENT_PAGE))
})

test("a parent naming the page bare rather than qualified loses that entry too", () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "child") })

  const said = removePage(worldIn(root), { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([CHILD_PAGE, PARENT_PAGE])
  expect(bodyIn(said, PARENT_PAGE)).toContain('"partSlugs": []')
  expect(bodyIn(said, PARENT_PAGE)).not.toContain('"child"')
})

test("a page two parents name loses its entry in both", () => {
  const root = familyRepo({
    [PARENT_PAGE]: naming("parent", idOf("e"), "module/child"),
    [AUNT_PAGE]: naming("aunt", idOf("f"), "module/child"),
  })

  const said = removePage(worldIn(root), { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([AUNT_PAGE, CHILD_PAGE, PARENT_PAGE])
  expect(bodyIn(said, PARENT_PAGE)).toContain('"partSlugs": []')
  expect(bodyIn(said, AUNT_PAGE)).toContain('"partSlugs": []')
})

test("a page its parent names is refused by the relation guard no longer", () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })
  const world = worldIn(root)
  const alone = guardedBy(world, tookAway(root, CHILD_PAGE), [relationNotLeftHanging])

  expect(parentsOf(world, CHILD_PAGE)).toEqual([{ path: PARENT_PAGE, propertySlug: "part-slugs" }])
  expect(alone.refused ?? "").toContain(`\`${CHILD_PAGE}\` is taken away`)
  expect(removePage(world, { at: CHILD_PAGE }).refused).toBe(null)
})
