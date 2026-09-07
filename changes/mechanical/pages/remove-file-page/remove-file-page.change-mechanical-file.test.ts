import { afterAll, expect, test } from "bun:test"
import {
  aProperty,
  bodyOf,
  HELD_CODE,
  HELD_PAGE,
  idOf,
  indexedRepo,
  NAMER_CODE,
  NAMER_PAGE,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { claimedFileNotLeftBehind } from "../../../guards/pages/claimed-file-not-left-behind/claimed-file-not-left-behind.change-guard.code.ts"
import { importNotLeftHanging } from "../../../guards/pages/import-not-left-hanging/import-not-left-hanging.change-guard.code.ts"
import { relationNotLeftHanging } from "../../../guards/pages/relation-not-left-hanging/relation-not-left-hanging.change-guard.code.ts"
import {
  answered,
  refusing,
  taking,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import type { Guard } from "../../../modules/change-guarding/change-guarding.module.types.ts"
import {
  type Reaching,
  type World,
  worldAt,
  worldOver,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange as removeCodeFile } from "../remove-code-file/remove-code-file.change-mechanical-file.code.ts"
import { removeFile } from "../remove-file/remove-file.change-mechanical-file.code.ts"
import { removePropertyValue } from "../remove-property-value/remove-property-value.change-mechanical-data.code.ts"
import {
  importersFirst,
  parentsOf,
  runChange,
} from "./remove-file-page.change-mechanical-file.code.ts"

type Unnaming = { at: string; key: string; value: string }

const REMOVE_CODE_FILE = "change-mechanical-file/remove-code-file"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const REMOVE_PROPERTY_VALUE = "change-mechanical-data/remove-property-value"

const RUNS: Reaching = (world, at, given) => {
  if (at === REMOVE_CODE_FILE) return removeCodeFile(world, given as { at: string })
  if (at === REMOVE_FILE) return Promise.resolve(removeFile(given as { at: string }, world.textOf))
  if (at === REMOVE_PROPERTY_VALUE) {
    return Promise.resolve(removePropertyValue(world, given as Unnaming))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const GUARDS = new Map<string, readonly Guard[]>([[REMOVE_CODE_FILE, [importNotLeftHanging]]])

const GUARDED: Reaching = async (world, at, given) => {
  const said = await RUNS(world, at, given)
  if (said.refused !== null) return said
  return guardedBy(world, said, GUARDS.get(at) ?? [])
}

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

const CHILD_NOTER_PAGE = "akasha/four/child-noter.module.ts"

const PAIR_PAGE = "akasha/five/pair.module.ts"

const PAIR_CODE = "akasha/five/pair.module.code.ts"

const PAIR_TEST = "akasha/five/pair.module.test.ts"

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

const PAIR: Readonly<Record<string, string>> = {
  [PAIR_PAGE]: pageOf({
    id: idOf("d"),
    pageTypeSlug: "module",
    slug: "pair",
    definition: "a page whose test imports the code beside that page",
    code: "ts",
    test: "ts",
  }),
  [PAIR_CODE]: "export const pair = 1\n",
  [PAIR_TEST]: 'import { pair } from "./pair.module.code.ts"\n\nexport const said = pair\n',
}

const CHILD = pageOf({
  id: idOf("d"),
  pageTypeSlug: "module",
  slug: "child",
  definition: "a page its parent names in part-slugs",
})

function worldIn(root: string, reaching: Reaching = RUNS): World {
  return worldAt(root, textIn(root), reaching)
}

function noting(slug: string, id: string, named: string): string {
  return pageOf({
    id,
    pageTypeSlug: "module",
    slug,
    definition: "a page naming the child by a relation that is no containment",
    note: named,
  })
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

test("a page and the file beside that page are taken away together", async () => {
  const root = indexedRepo(SPARE)
  const was = textIn(root)

  const said = await runChange(worldIn(root), { at: NAMER_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([NAMER_CODE, NAMER_PAGE])
  for (const one of said.edits) {
    expect(one.body).toBe(null)
    expect(one.was).toBe(was(one.path))
  }
})

test("a path beside a page is refused", async () => {
  const root = indexedRepo()

  const said = await runChange(worldIn(root), { at: HELD_CODE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${HELD_CODE}\` is under no page name, so this change takes nothing away`
  )
})

test("a path under no page type is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.notatype.ts"

  const said = await runChange(worldIn(root), { at })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${at}\` is under no page name, so this change takes nothing away`)
})

test("a path the world names no page at is refused", async () => {
  const root = indexedRepo()

  const said = await runChange(worldIn(root), { at: MISSING })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${MISSING}\` names no page, so no page is taken away`)
})

test("a page holding no body is refused by the removal of its own file", async () => {
  const root = indexedRepo(SPARE)
  const was = textIn(root)
  const reading = (path: string): string | null => (path === NAMER_PAGE ? null : was(path))

  const said = await runChange(worldAt(root, reading, RUNS), { at: NAMER_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` holds no body, so a removal takes nothing away`)
})

test("a file beside the page git does not track is taken away too", async () => {
  const root = keptRepo()

  const said = await runChange(worldIn(root), { at: KEPT_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([KEPT_NOTES, KEPT_PAGE])
})

test("a page an earlier change in the same answer took away is no page here", async () => {
  const root = indexedRepo(SPARE)
  const world = worldOver(worldIn(root), tookAway(root, NAMER_PAGE))

  const said = await runChange(world, { at: NAMER_PAGE })

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

test("the page and the parent's entry for that page go in one answer", async () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })
  const was = textIn(root)

  const said = await runChange(worldIn(root), { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([CHILD_PAGE, PARENT_PAGE])
  expect(said.edits.find((one) => one.path === CHILD_PAGE)?.body).toBe(null)
  expect(bodyIn(said, PARENT_PAGE)).toContain('"partSlugs": []')
  expect(bodyIn(said, PARENT_PAGE)).not.toContain("module/child")
  expect(said.edits.find((one) => one.path === PARENT_PAGE)?.was).toBe(was(PARENT_PAGE))
})

test("a parent naming the page bare rather than qualified loses that entry too", async () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "child") })

  const said = await runChange(worldIn(root), { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([CHILD_PAGE, PARENT_PAGE])
  expect(bodyIn(said, PARENT_PAGE)).toContain('"partSlugs": []')
  expect(bodyIn(said, PARENT_PAGE)).not.toContain('"child"')
})

test("a page two parents name loses its entry in both", async () => {
  const root = familyRepo({
    [PARENT_PAGE]: naming("parent", idOf("e"), "module/child"),
    [AUNT_PAGE]: naming("aunt", idOf("f"), "module/child"),
  })

  const said = await runChange(worldIn(root), { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([AUNT_PAGE, CHILD_PAGE, PARENT_PAGE])
  expect(bodyIn(said, PARENT_PAGE)).toContain('"partSlugs": []')
  expect(bodyIn(said, AUNT_PAGE)).toContain('"partSlugs": []')
})

test("a page its parent names is refused by the relation guard no longer", async () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })
  const world = worldIn(root)
  const alone = guardedBy(world, tookAway(root, CHILD_PAGE), [relationNotLeftHanging])

  expect(parentsOf(world, CHILD_PAGE)).toEqual([{ path: PARENT_PAGE, propertySlug: "part-slugs" }])
  expect(alone.refused ?? "").toContain(`\`${CHILD_PAGE}\` is taken away`)
  expect((await runChange(world, { at: CHILD_PAGE })).refused).toBe(null)
})

test("a page another page still names is refused by the guards this change names", async () => {
  const root = indexedRepo(SPARE)
  const world = worldIn(root)

  const answer = await runChange(world, { at: HELD_PAGE })
  const said = guardedBy(world, answer, [relationNotLeftHanging, claimedFileNotLeftBehind])

  expect(answer.refused).toBe(null)
  expect(said.refused ?? "").toContain(`\`${HELD_PAGE}\` is taken away`)
})

test("a page and the file beside that page leave no file behind", async () => {
  const root = indexedRepo()
  const world = worldIn(root, GUARDED)

  const answer = await runChange(world, { at: NAMER_PAGE })
  const said = guardedBy(world, answer, [relationNotLeftHanging, claimedFileNotLeftBehind])

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([NAMER_CODE, NAMER_PAGE])
})

test("a page a parent names in part-slugs goes through the guarded chain", async () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })

  const said = await runChange(worldIn(root, GUARDED), { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([CHILD_PAGE, PARENT_PAGE])
})

test("a page a relation outside part-slugs names is refused through the guarded chain", async () => {
  const root = familyRepo({ [CHILD_NOTER_PAGE]: noting("child-noter", idOf("0"), "child") })
  const world = worldIn(root, GUARDED)

  const answer = await runChange(world, { at: CHILD_PAGE })
  const said = guardedBy(world, answer, [relationNotLeftHanging])

  expect(said.refused).toBe(
    `\`${CHILD_NOTER_PAGE}\` names \`${CHILD_PAGE}\` as its \`note\`, and \`${CHILD_PAGE}\` is taken away`
  )
})

test("a page whose code file another page imports is refused through the guarded chain", async () => {
  const root = indexedRepo(SPARE)

  const said = await runChange(worldIn(root, GUARDED), { at: HELD_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${SPARE_CODE}\` imports \`${HELD_CODE}\`, and \`${HELD_CODE}\` is taken away`
  )
})

test("a file importing a second file going in the same act goes before that file", () => {
  const root = indexedRepo(PAIR)

  const order = importersFirst(worldIn(root), [PAIR_PAGE, PAIR_CODE, PAIR_TEST])

  expect(order).toEqual([PAIR_PAGE, PAIR_TEST, PAIR_CODE])
})

test("a file importing a file outside the act keeps the order the act was given in", () => {
  const root = indexedRepo(SPARE)

  const order = importersFirst(worldIn(root), [HELD_PAGE, HELD_CODE])

  expect(order).toEqual([HELD_PAGE, HELD_CODE])
})

test("a page whose test imports the code beside that page is taken away whole", async () => {
  const root = indexedRepo(PAIR)
  const world = worldIn(root, GUARDED)

  const answer = await runChange(world, { at: PAIR_PAGE })
  const said = guardedBy(world, answer, [relationNotLeftHanging, claimedFileNotLeftBehind])

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([PAIR_CODE, PAIR_TEST, PAIR_PAGE])
})
