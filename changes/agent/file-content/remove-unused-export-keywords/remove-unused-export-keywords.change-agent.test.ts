import { expect, test } from "bun:test"
import { removeUnusedExportKeywords } from "akasha/changes/agent/file-content/remove-unused-export-keywords/remove-unused-export-keywords.change-agent.code.ts"
import { runChange as dropping } from "akasha/changes/mechanical/file-content/remove/remove-export-keyword/remove-export-keyword.change-mechanical-file-content.code.ts"
import {
  NOTHING_OVER,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  bodyAnswered,
  relaying,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const DROP = "change-mechanical-file-content/remove-export-keyword"

const NOWHERE = "/nowhere"

const AT = "akasha/held.module.code.ts"

const READER = "akasha/reader.module.code.ts"

const TEXT =
  "export function held(): number {\n  return 1\n}\n\n" +
  "export function spare(): number {\n  return held()\n}\n"

const READER_TEXT =
  'import { spare } from "akasha/akasha/held.module.code.ts"\n\nexport const reader = spare\n'

type Given = {
  readonly at: string
  readonly names: readonly string[]
}

function worldOver(held: Readonly<Record<string, string>>, importers: readonly string[]): World {
  const index = {
    everyPath: () => Object.keys(held),
    importersOf: () => importers,
    pageTypesIn: () => new Set<string>(),
  } as never
  return {
    root: NOWHERE,
    index,
    textOf: (path: string) => held[path] ?? null,
    bodyOf: (path: string) => held[path] ?? null,
    under: () => [],
    base: (path: string) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: relaying<Given>(DROP, dropping),
  }
}

test("the keyword goes from a value its own file names and stays on one nothing names", async () => {
  const world = worldOver({ [AT]: TEXT }, [])

  const said = await removeUnusedExportKeywords(world)

  expect(bodyAnswered(said, world, AT)).toBe(
    "function held(): number {\n  return 1\n}\n\nexport function spare(): number {\n  return held()\n}\n"
  )
})

test("a value another file names keeps its keyword", async () => {
  const world = worldOver({ [AT]: TEXT, [READER]: READER_TEXT }, [READER])

  const said = await removeUnusedExportKeywords(world)

  expect(bodyAnswered(said, world, AT)).toBe(
    "function held(): number {\n  return 1\n}\n\nexport function spare(): number {\n  return held()\n}\n"
  )
})
