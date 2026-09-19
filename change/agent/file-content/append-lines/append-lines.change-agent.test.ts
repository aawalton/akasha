import { expect, test } from "bun:test"
import { appendLinesCommand } from "akasha/change/agent/file-content/append-lines/append-lines.change-agent.code.ts"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { refusing, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "akasha/one/held.jsonl"

const REACHES = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

const appending: Reaching = (_world, at, given) => {
  if (at !== REACHES) return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  const asked = given as { readonly at: string; readonly content: string }
  return Promise.resolve(stating([{ kind: "append", path: asked.at, content: asked.content }]))
}

function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { pageTypesIn: () => new Set<string>() }),
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: appending,
  }
}

test("the arguments naming a path and content are answered as one append", async () => {
  const said = await appendLinesCommand(worldOf({}), { at: AT, content: "one\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "append", path: AT, content: "one\n" }])
})

test("arguments holding no path are refused by the name of the argument", async () => {
  const said = await appendLinesCommand(worldOf({}), { content: "one\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at`/)
})

test("arguments holding no content are refused by the name of the argument", async () => {
  const said = await appendLinesCommand(worldOf({}), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`content`/)
})

test("the arguments this change hands on are reached through the runner the world carries", async () => {
  let reached = ""
  let carried: unknown = null
  const said = await appendLinesCommand(
    {
      ...worldOf({}),
      reaching: (_world, at, given) => {
        reached = at
        carried = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, content: "one\n" }
  )

  expect(reached).toBe(REACHES)
  expect(carried).toEqual({ at: AT, content: "one\n" })
  expect(said.refused).toBeNull()
})
