import { expect, test } from "bun:test"
import { appendLinesFromCommand } from "akasha/changes/agent/file-content/append-lines-from/append-lines-from.change-agent.code.ts"
import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const AT = "akasha/one/held.jsonl"

const FROM = "akasha/one/staged.uncommitted.jsonl"

const CONTENT = "one\n"

const REACHES = "change-mechanical-file-content/append-lines"

const STAGED: Readonly<Record<string, string>> = { [FROM]: CONTENT }

const WORLD: World = {
  root: "/nowhere",
  index: Object.assign({} as World["index"], { pageTypesIn: () => new Set<string>() }),
  textOf: (path) => STAGED[path] ?? null,
  bodyOf: (path) => STAGED[path] ?? null,
  under: () => [],
  base: (path) => STAGED[path] ?? null,
  over: NOTHING_OVER,
  reaching: (_world, reached, given) => {
    const asked = given as { readonly at: string; readonly content: string }
    return Promise.resolve(
      reached === REACHES
        ? stating([{ kind: "append", path: asked.at, content: asked.content }])
        : refusing(`\`${reached}\` is reached by nothing here`)
    )
  },
}

test("the content the named path holds is answered as one append at the other path", async () => {
  const said = await appendLinesFromCommand(WORLD, { at: AT, from: FROM })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "append", path: AT, content: CONTENT }])
})

test("arguments holding no path to append at are refused by the name of the argument", async () => {
  const said = await appendLinesFromCommand(WORLD, { from: FROM })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at`/)
})

test("arguments holding no path to read from are refused by the name of the argument", async () => {
  const said = await appendLinesFromCommand(WORLD, { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`from`/)
})

test("a path the tree holds no text at is refused", async () => {
  const said = await appendLinesFromCommand(
    { ...WORLD, textOf: () => null },
    { at: AT, from: FROM }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no text/)
})

test("what this change hands on is the content read rather than the path read from", async () => {
  let carried: unknown = null
  const said = await appendLinesFromCommand(
    {
      ...WORLD,
      reaching: (_world, _reached, given) => {
        carried = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, from: FROM }
  )

  expect(carried).toEqual({ at: AT, content: CONTENT })
  expect(said.refused).toBeNull()
})
