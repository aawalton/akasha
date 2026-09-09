import { afterAll, expect, test } from "bun:test"
import {
  aProperty,
  aType,
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
import { claimedFileNotLeftBehind } from "../../../../guards/pages/claimed-file-not-left-behind/claimed-file-not-left-behind.change-guard.code.ts"
import { importNotLeftHanging } from "../../../../guards/pages/import-not-left-hanging/import-not-left-hanging.change-guard.code.ts"
import { relationNotLeftHanging } from "../../../../guards/pages/relation-not-left-hanging/relation-not-left-hanging.change-guard.code.ts"
import {
  pathsIn,
  refusing,
  stating,
} from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../../modules/change-guarding/change-guarding.module.code.ts"
import type { Guard } from "../../../../modules/change-guarding/change-guarding.module.types.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
  worldAt,
  worldOver,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { removePropertyValue } from "../../../file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.code.ts"
import { runChange as removeFile } from "../remove-file/remove-file.change-mechanical-file.code.ts"
import { runChange as removeCodeFile } from "../remove-file-code/remove-file-code.change-mechanical.code.ts"
import {
  importersFirst,
  parentsOf,
  runChange,
} from "./remove-file-page.change-mechanical-file.code.ts"

type Unnaming = { at: string; key: string; value: string }

const REMOVE_FILE_CODE = "change-mechanical/remove-file-code"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const REMOVE_PROPERTY_VALUE = "change-mechanical-file-content/remove-property-value"

const RUNS: Reaching = (world, at, given) => {
  if (at === REMOVE_FILE_CODE) return removeCodeFile(world, given as { at: string })
  if (at === REMOVE_FILE) {
    return Promise.resolve(removeFile(world, given as { at: string }))
  }
  if (at === REMOVE_PROPERTY_VALUE) {
    return Promise.resolve(removePropertyValue(world, given as Unnaming))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const GUARDS = new Map<string, readonly Guard[]>([[REMOVE_FILE_CODE, [importNotLeftHanging]]])

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
  definition: "a page its parent names in parts",
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
    definition: "a page naming the child in parts",
    parts: [named],
  })
}

const PARTS = aProperty("01a04a4a-0002-7000-8000-000000000008", "parts", "relation-property", {
  targetPageType: "domain",
})

const MODULE = aType(
  idOf("6"),
  "module",
  ["page-type/domain"],
  ["code", "test", "note", "part-slugs", "parts"]
)

const DECLARING: Readonly<Record<string, string>> = {
  [`akasha/${MODULE[0]}`]: bodyOf(MODULE[1]),
  [`akasha/${PARTS[0]}`]: bodyOf(PARTS[1]),
}

function familyRepo(named: Readonly<Record<string, string>>): string {
  return indexedRepo({ ...DECLARING, [CHILD_PAGE]: CHILD, ...named })
}

function bodiesOf(said: Answer, world: World): ReadonlyMap<string, string | null> {
  return bodiesIn(said, world.base)
}

function bodyIn(said: Answer, world: World, at: string): string {
  return bodiesOf(said, world).get(at) ?? ""
}

function tookAway(path: string): Answer {
  return stating([{ kind: "remove", path }])
}

test("a page and the file beside that page are taken away together", async () => {
  const root = indexedRepo(SPARE)
  const world = worldIn(root)

  const said = await runChange(world, { at: NAMER_PAGE })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
  for (const [, body] of bodiesOf(said, world)) {
    expect(body).toBe(null)
  }
})

test("a path beside a page is refused", async () => {
  const root = indexedRepo()

  const said = await runChange(worldIn(root), { at: HELD_CODE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${HELD_CODE}\` names no page, so no page is taken away`)
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
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` holds no body, so nothing is taken away`)
})

test("a file beside the page git does not track is taken away too", async () => {
  const root = keptRepo()

  const said = await runChange(worldIn(root), { at: KEPT_PAGE })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([KEPT_NOTES, KEPT_PAGE])
})

test("a page an earlier change in the same answer took away is no page here", async () => {
  const root = indexedRepo(SPARE)
  const world = worldOver(worldIn(root), tookAway(NAMER_PAGE))

  const said = await runChange(world, { at: NAMER_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` names no page, so no page is taken away`)
})

test("the parent naming the page in parts is answered from the world", () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })

  expect(parentsOf(worldIn(root), CHILD_PAGE)).toEqual([
    { path: PARENT_PAGE, propertySlug: "parts" },
  ])
})

test("a parent an earlier change in the same answer took away is answered no longer", () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })
  const world = worldOver(worldIn(root), tookAway(PARENT_PAGE))

  expect(parentsOf(world, CHILD_PAGE)).toEqual([])
})

test("the page and the parent's entry for that page go in one answer", async () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })
  const world = worldIn(root)

  const said = await runChange(world, { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([CHILD_PAGE, PARENT_PAGE])
  expect(bodiesOf(said, world).get(CHILD_PAGE)).toBe(null)
  expect(bodyIn(said, world, PARENT_PAGE)).toContain('"parts": []')
  expect(bodyIn(said, world, PARENT_PAGE)).not.toContain("module/child")
})

test("a parent naming the page bare rather than qualified loses that entry too", async () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "child") })
  const world = worldIn(root)

  const said = await runChange(world, { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([CHILD_PAGE, PARENT_PAGE])
  expect(bodyIn(said, world, PARENT_PAGE)).toContain('"parts": []')
  expect(bodyIn(said, world, PARENT_PAGE)).not.toContain('"child"')
})

test("a page two parents name loses its entry in both", async () => {
  const root = familyRepo({
    [PARENT_PAGE]: naming("parent", idOf("e"), "module/child"),
    [AUNT_PAGE]: naming("aunt", idOf("f"), "module/child"),
  })

  const world = worldIn(root)

  const said = await runChange(world, { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([AUNT_PAGE, CHILD_PAGE, PARENT_PAGE])
  expect(bodyIn(said, world, PARENT_PAGE)).toContain('"parts": []')
  expect(bodyIn(said, world, AUNT_PAGE)).toContain('"parts": []')
})

test("a page its parent names is refused by the relation guard no longer", async () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })
  const world = worldIn(root)
  const alone = guardedBy(world, tookAway(CHILD_PAGE), [relationNotLeftHanging])

  expect(parentsOf(world, CHILD_PAGE)).toEqual([{ path: PARENT_PAGE, propertySlug: "parts" }])
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
  expect([...pathsIn(said)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
})

import { ledgerAt } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

test("a page taken away over a ledger is answered rather than answered twice", async () => {
  const root = indexedRepo()

  const said = await runChange(ledgerAt(root, textIn(root), GUARDED), { at: NAMER_PAGE })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
})

test("a page a parent names in parts goes through the guarded chain", async () => {
  const root = familyRepo({ [PARENT_PAGE]: naming("parent", idOf("e"), "module/child") })

  const said = await runChange(worldIn(root, GUARDED), { at: CHILD_PAGE })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([CHILD_PAGE, PARENT_PAGE])
})

test("a page a relation outside parts names is refused through the guarded chain", async () => {
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
    `\`${SPARE_CODE}\` imports \`${HELD_CODE}\`, and \`${HELD_CODE}\` holds no body after`
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
  expect([...pathsIn(said)].sort()).toEqual([PAIR_CODE, PAIR_TEST, PAIR_PAGE])
})
