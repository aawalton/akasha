import { afterAll, expect, test } from "bun:test"
import { removeUnusedExportKeywords } from "akasha/change/agent/file-content/remove-unused-export-keywords/remove-unused-export-keywords.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { bodyAnswered } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  put,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const MOST = 100

const AT = "akasha/held.module.code.ts"

const READER = "akasha/reader.module.code.ts"

const PLAIN = "akasha/plain.module.code.ts"

const PLAIN_TEXT = "const plain = 1\n"

const TEXT =
  "export function held(): number {\n  return 1\n}\n\n" +
  "export function spare(): number {\n  return held()\n}\n"

const READER_TEXT =
  'import { spare } from "akasha/akasha/held.module.code.ts"\n\nexport const reader = spare\n'

function worldOver(
  held: Readonly<Record<string, string>>,
  importers: readonly string[],
  asked: string[] = []
): World {
  const root = scratch.rootFor("remove-unused-export-keywords-")
  for (const [at, body] of Object.entries(held)) put(root, at, body)
  const index = {
    carryingOf: () => ({ refused: "no page property carries that slug here" }),
    everyOfType: () => [],
    everyPath: () => Object.keys(held),
    importersOf: () => importers,
    pageTypesIn: () => new Set<string>(),
    valuesByPath: () => new Map<string, never>(),
  } as never
  return {
    root,
    index,
    textOf: (path: string) => {
      asked.push(path)
      return held[path] ?? null
    },
    bodyOf: (path: string) => held[path] ?? null,
    under: () => [],
    base: (path: string) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: running,
  }
}

test("the keyword goes from a value its own file names and stays on one nothing names", async () => {
  const world = worldOver({ [AT]: TEXT }, [])

  const said = await removeUnusedExportKeywords(world, MOST)

  expect(bodyAnswered(said, world, AT)).toBe(
    "function held(): number {\n  return 1\n}\n\nexport function spare(): number {\n  return held()\n}\n"
  )
})

test("a run capped at no file drops no keyword", async () => {
  const world = worldOver({ [AT]: TEXT }, [])

  expect((await removeUnusedExportKeywords(world, 0)).edits).toEqual([])
})

test("a path left alone keeps every keyword it has", async () => {
  const world = worldOver({ [AT]: TEXT }, [])

  expect((await removeUnusedExportKeywords(world, MOST, new Set([AT]))).edits).toEqual([])
})

test("a value another file names keeps its keyword", async () => {
  const world = worldOver({ [AT]: TEXT, [READER]: READER_TEXT }, [READER])

  const said = await removeUnusedExportKeywords(world, MOST)

  expect(bodyAnswered(said, world, AT)).toBe(
    "function held(): number {\n  return 1\n}\n\nexport function spare(): number {\n  return held()\n}\n"
  )
})

test("a file spelling no `export` is left unread", async () => {
  const asked: string[] = []
  const world = worldOver({ [AT]: TEXT, [PLAIN]: PLAIN_TEXT }, [], asked)

  await removeUnusedExportKeywords(world, MOST)

  expect(asked).toContain(AT)
  expect(asked).not.toContain(PLAIN)
})
