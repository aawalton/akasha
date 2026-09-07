import { afterAll, expect, test } from "bun:test"
import { indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import {
  answered,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { type Asked, runChange } from "./add-page-file.change-mechanical.code.ts"

const RUNS: Reaching = (_world, at, given) => {
  if (at === "change-mechanical-file/add-code-file") {
    const asked = given as Asked
    return Promise.resolve(answered([writing(asked.at, null, asked.body)]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

afterAll(scratch.sweep)

const BODY = "export const fresh = 1\n"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
}

test("a page path is written by the change this change reaches", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.module.ts"

  const said = await runChange(worldIn(root), { at, body: BODY })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ path: at, was: null, body: BODY }])
})

test("a path beside a page is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.module.code.ts"

  const said = await runChange(worldIn(root), { at, body: BODY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${at}\` is under no page name, so this change writes nothing`)
})

test("a path under no page type is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.notatype.ts"

  const said = await runChange(worldIn(root), { at, body: BODY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${at}\` is under no page name, so this change writes nothing`)
})
