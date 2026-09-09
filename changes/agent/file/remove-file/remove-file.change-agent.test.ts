import { expect, test } from "bun:test"
import { runChange as removeFileMechanical } from "../../../mechanical/file/remove/remove-file/remove-file.change-mechanical-file.code.ts"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { removeFile } from "./remove-file.change-agent.code.ts"

const ASKED = "the world was asked"

const REMOVE_FILE = "change-mechanical/remove-file-of-any-kind"

const ORDINARY = "akasha/notes.md"

const PAGE = "changes/change.page-type.ts"

const SHAPED = "alan/web/routes/api.surplus.ts"

const PAGE_TYPES = new Set(["page-type"])

const BODY = "alpha\n"

const UNASKED: World = {
  root: "/nowhere",
  index: new Proxy(
    {},
    {
      get(_held, named) {
        if (named === "pageTypesIn") return () => PAGE_TYPES
        throw new Error(ASKED)
      },
    }
  ) as never,
  textOf: () => {
    throw new Error(ASKED)
  },
  bodyOf: () => {
    throw new Error(ASKED)
  },
  under: () => [],
  base: () => {
    throw new Error(ASKED)
  },
  over: NOTHING_OVER,
}

const RUNS: Reaching = (world, at, given) => {
  if (at !== REMOVE_FILE) {
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  }
  const asked = given as Parameters<typeof removeFileMechanical>[1]
  return Promise.resolve(removeFileMechanical(world, asked))
}

function worldOf(held: Readonly<Record<string, string>>): World {
  const textOf = (path: string): string | null => held[path] ?? null
  return { ...UNASKED, textOf, bodyOf: textOf, base: textOf, reaching: RUNS }
}

test("a path the tree holds a body for is answered as one edit taking that path away", async () => {
  const said = await removeFile(worldOf({ [ORDINARY]: BODY }), { at: ORDINARY })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "remove", path: ORDINARY }])
})

test("a page file is refused, and the refusal names the change that takes a page away", async () => {
  const said = await removeFile(UNASKED, { at: PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/remove-page/)
})

test("a file named as a page of no page type is taken away rather than refused", async () => {
  const said = await removeFile(worldOf({ [SHAPED]: BODY }), { at: SHAPED })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "remove", path: SHAPED }])
})

test("a path holding no body is refused and answers no edit", async () => {
  const said = await removeFile(worldOf({}), { at: ORDINARY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("a file this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  const said = await removeFile(
    {
      ...UNASKED,
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: ORDINARY }
  )

  expect(reached).toBe(REMOVE_FILE)
  expect(said.refused).toBeNull()
})
