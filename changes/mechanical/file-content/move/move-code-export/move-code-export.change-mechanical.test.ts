import { expect, test } from "bun:test"
import { refusing, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange as changeFileContent } from "../../change/change-file-content/change-file-content.change-mechanical-file-content.code.ts"
import { runChange } from "./move-code-export.change-mechanical.code.ts"

const FROM = "akasha/one/one.held.ts"

const TO = "akasha/one/two.held.ts"

const USES = "akasha/one/uses.held.ts"

const FAR = "akasha/one/deeper/far.held.ts"

const ELSEWHERE = "akasha/two/two.held.ts"

const DEEP = `import type { Deep } from "./deep.held.ts"`

const HELD = `${DEEP}

export type Kept = {
  readonly deep: Deep
}

export type Other = {
  readonly name: string
}
`

const SHARED = `${DEEP}

export type Kept = {
  readonly deep: Deep
}

export type Other = {
  readonly deep: Deep
}
`

const USING = `import type { Kept } from "./one.held.ts"

export type Wraps = {
  readonly kept: Kept
}
`

const FAR_USING = `import type { Kept } from "../one.held.ts"

export type Holds = {
  readonly kept: Kept
}
`

const LANDED = `${DEEP}

export type Kept = {
  readonly deep: Deep
}
`

const TAKEN = `

export type Kept = {
  readonly deep: Deep
}`

type Passage = { at: string; old: string; new: string }

type Adding = { at: string; body: string }

const RUNS: Reaching = (world, at, given) => {
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

function puttingAt(said: Answer, path: string): readonly string[] {
  return said.edits.flatMap((one) =>
    one.kind === "replace" && one.path === path ? [one.contentTo] : []
  )
}

function takenAt(said: Answer, path: string): readonly string[] {
  return said.edits.flatMap((one) =>
    one.kind === "replace" && one.path === path ? [one.contentFrom] : []
  )
}

test("the type lands in the sibling body with the import that type names", async () => {
  const world = worldOf({ [FROM]: HELD, [USES]: USING }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe(LANDED)
})

test("every body importing that type names the path the type landed at", async () => {
  const world = worldOf({ [FROM]: HELD, [USES]: USING }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(puttingAt(said, USES)).toEqual([`import type { Kept } from "./two.held.ts"`])
})

test("an importer in another folder keeps the way that importer spells the folder", async () => {
  const world = worldOf({ [FROM]: HELD, [FAR]: FAR_USING }, [FAR])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(puttingAt(said, FAR)).toEqual([`import type { Kept } from "../two.held.ts"`])
})

test("the declaration leaves the body that declared it", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "Kept" })

  expect(takenAt(said, FROM)).toContain(TAKEN)
})

test("an import the body left behind no longer names is dropped", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "Kept" })

  expect(takenAt(said, FROM)).toContain(`${DEEP}\n`)
})

test("an import the body left behind still names is kept", async () => {
  const said = await runChange(worldOf({ [FROM]: SHARED }), { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(takenAt(said, FROM)).not.toContain(`${DEEP}\n`)
})

test("a landing path in another folder is refused", async () => {
  const world = worldOf({ [FROM]: HELD })

  const said = await runChange(world, { from: FROM, to: ELSEWHERE, of: "Kept" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${ELSEWHERE}\` sits in another folder than \`${FROM}\``)
})

test("a landing path holding a body declaring no such type is refused", async () => {
  const world = worldOf({ [FROM]: HELD, [TO]: "export const two = 1\n" })

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${TO}\` is a body declaring no exported type named \`Kept\``)
})

test("a landing path already declaring that type is left as it is", async () => {
  const world = worldOf({ [FROM]: HELD, [TO]: LANDED, [USES]: USING }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe("")
  expect(puttingAt(said, TO)).toEqual([])
  expect(puttingAt(said, USES)).toEqual([`import type { Kept } from "./two.held.ts"`])
})

test("a body declaring no such type is refused", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "Missing" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${FROM}\` declares no type named \`Missing\``)
})
