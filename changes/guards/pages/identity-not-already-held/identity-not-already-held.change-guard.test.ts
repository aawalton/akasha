import { afterAll, expect, test } from "bun:test"
import { idOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/guarding/change-guarding.module.code.ts"
import {
  addedTo,
  ledgerAt,
  worldAt,
  worldBefore,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { identityNotAlreadyHeld } from "./identity-not-already-held.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [identityNotAlreadyHeld]

const HELD = "akasha/one/held.module.ts"

const AWAY = "akasha/three/held.module.ts"

const FRESH = "akasha/three/fresh.module.ts"

const TYPE_WAS = "akasha/module.page-type.ts"

const TYPE_NOW = "akasha/unit.page-type.ts"

const CARRIED = "akasha/one/held.unit.ts"

const WAS_NAMED = '"module"'

const NOW_NAMED = '"unit"'

const TAKEN = idOf("8")

const FREE = idOf("f")

function aPage(id: string, slug: string): string {
  return pageOf({
    id,
    pageTypeSlug: "module",
    slug,
    definition: "a page carrying an identity",
    code: "ts",
  })
}

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

test("a page taking an id another page holds is refused", () => {
  const root = indexedRepo()

  const said = judged(root, stating([{ kind: "add", path: FRESH, content: aPage(TAKEN, "fresh") }]))

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${FRESH}\` states the id \`${TAKEN}\`, which \`${HELD}\` already holds`
  )
})

test("a page taking a slug another page of its page type holds is refused", () => {
  const root = indexedRepo()

  const said = judged(root, stating([{ kind: "add", path: AWAY, content: aPage(FREE, "held") }]))

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AWAY}\` states the slug \`held\`, which \`${HELD}\` already holds`)
})

test("a page taking an identity nothing else holds is not refused", () => {
  const root = indexedRepo()

  const said = judged(root, stating([{ kind: "add", path: FRESH, content: aPage(FREE, "fresh") }]))

  expect(said.refused).toBe(null)
})

test("a page the same answer moves to another path is not refused", () => {
  const root = indexedRepo()
  const was = textIn(root)(HELD) ?? ""

  const said = judged(
    root,
    stating([
      { kind: "add", path: AWAY, content: was },
      { kind: "remove", path: HELD },
    ])
  )

  expect(said.refused).toBe(null)
})

test("a page carried after its page type's rename holds its id at one path alone", () => {
  const root = indexedRepo()
  const world = ledgerAt(root, textIn(root))
  addedTo(
    world,
    stating([
      { kind: "move", pathFrom: TYPE_WAS, pathTo: TYPE_NOW },
      { kind: "replace", path: TYPE_NOW, contentFrom: WAS_NAMED, contentTo: NOW_NAMED },
    ])
  )
  expect(world.index.pageTypesIn().has("unit")).toBe(true)

  const said = guardedBy(
    world,
    stating([
      { kind: "move", pathFrom: HELD, pathTo: CARRIED },
      { kind: "replace", path: CARRIED, contentFrom: WAS_NAMED, contentTo: NOW_NAMED },
    ]),
    GUARDS,
    worldBefore(world)
  )

  expect(said.refused).toBe(null)
})

test("a path under no page name is judged by nothing", () => {
  const root = indexedRepo()
  const beside = "akasha/three/fresh.module.code.ts"

  const said = judged(
    root,
    stating([{ kind: "add", path: beside, content: "export const fresh = 1\n" }])
  )

  expect(said.refused).toBe(null)
})
