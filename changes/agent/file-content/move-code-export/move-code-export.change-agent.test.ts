import { expect, test } from "bun:test"
import { runChange as changeFileContent } from "../../../mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.code.ts"
import { runChange as moveCodeExport } from "../../../mechanical/file-content/move/move-code-export/move-code-export.change-mechanical.code.ts"
import { refusing, stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { moveCodeExportCommand } from "./move-code-export.change-agent.code.ts"

const MOVED = "change-mechanical/move-code-export"

const FROM = "akasha/one/one.held.ts"

const TO = "akasha/one/two.held.ts"

const USES = "akasha/one/uses.held.ts"

const HELD = `import type { Deep } from "./deep.held.ts"

export type Kept = {
  readonly deep: Deep
}

export type Other = {
  readonly name: string
}
`

const USING = `import type { Kept } from "./one.held.ts"

export type Wraps = {
  readonly kept: Kept
}
`

type Passage = { at: string; old: string; new: string }

type Adding = { at: string; body: string }

type Moving = { from: string; to: string; of: string }

const RUNS: Reaching = (world, at, given) => {
  if (at === MOVED) return moveCodeExport(world, given as Moving)
  if (at === "change-mechanical-file-content/change-file-content") {
    return Promise.resolve(changeFileContent(world, given as Passage))
  }
  if (at === "change-mechanical/add-file-code") {
    const asked = given as Adding
    return Promise.resolve(stating([{ kind: "add", path: asked.at, content: asked.body }]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function worldOf(held: Readonly<Record<string, string>>, importers: readonly string[] = []): World {
  return {
    root: "/nowhere",
    index: { importersOf: () => importers } as never,
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: RUNS,
  }
}

function addedAt(said: Answer, path: string): string {
  const found = said.edits.flatMap((one) => (one.kind === "add" && one.path === path ? [one] : []))
  return found[0]?.content ?? ""
}

test("the three arguments are answered as the edits the move leaves", async () => {
  const world = worldOf({ [FROM]: HELD, [USES]: USING }, [USES])

  const said = await moveCodeExportCommand(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toContain("export type Kept = {")
})

test("arguments holding no path to move from are refused by the name of the argument", async () => {
  const said = await moveCodeExportCommand(worldOf({}), { to: TO, of: "Kept" })

  expect(said.refused ?? "").toMatch(/`from`/)
})

test("arguments holding no path to move to are refused by the name of the argument", async () => {
  const said = await moveCodeExportCommand(worldOf({}), { from: FROM, of: "Kept" })

  expect(said.refused ?? "").toMatch(/`to`/)
})

test("arguments naming no type are refused by the name of the argument", async () => {
  const said = await moveCodeExportCommand(worldOf({}), { from: FROM, to: TO })

  expect(said.refused ?? "").toMatch(/`of`/)
})

test("the move this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  let handed: unknown = null
  const said = await moveCodeExportCommand(
    {
      ...worldOf({}),
      reaching: (_world, at, given) => {
        reached = at
        handed = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { from: FROM, to: TO, of: "Kept" }
  )

  expect(reached).toBe(MOVED)
  expect(handed).toEqual({ from: FROM, to: TO, of: "Kept" })
  expect(said.refused).toBeNull()
})
