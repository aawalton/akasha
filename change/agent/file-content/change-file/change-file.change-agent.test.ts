import { expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { changeFileCommand } from "akasha/change/agent/file-content/change-file/change-file.change-agent.code.ts"
import { replayed } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  groupAt,
  groupsIn,
} from "akasha/code/module-property-group/modules/group-writing/group-writing.module.code.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const AT = "akasha/one.held.ts"

function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: { pageTypesIn: () => new Set<string>() } as never,
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: running,
  }
}

function landedIn(held: Readonly<Record<string, string>>, said: Answer): string {
  const after = replayed(said, (path) => held[path] ?? null)
  if ("refused" in after) throw new Error(after.refused)
  const body = after.get(AT)
  return typeof body === "string" ? body : ""
}

test("the arguments naming a path and two passages are answered as one edit", async () => {
  const said = await changeFileCommand(worldOf({ [AT]: "one two\n" }), {
    at: AT,
    old: "two",
    new: "four",
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "replace", path: AT, contentFrom: "two", contentTo: "four" }])
})

test("arguments holding no path are refused by the name of the argument", async () => {
  const said = await changeFileCommand(worldOf({}), { old: "two", new: "four" })

  expect(said.refused ?? "").toMatch(/`at`/)
})

test("arguments holding no passage are refused by the name of the argument", async () => {
  const said = await changeFileCommand(worldOf({}), { at: AT, new: "four" })

  expect(said.refused ?? "").toMatch(/`old`/)
})

test("arguments saying nothing the passage becomes are refused by the name of the argument", async () => {
  const said = await changeFileCommand(worldOf({}), { at: AT, old: "two" })

  expect(said.refused ?? "").toMatch(/`new`/)
})

test("the passage this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  const said = await changeFileCommand(
    {
      ...worldOf({}),
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, old: "two", new: "four" }
  )

  expect(reached).toBe("change-mechanical-file-content/change-file-content-of-any-kind")
  expect(said.refused).toBeNull()
})

test("a passage ending mid-line drops the newline its fence left and lands", async () => {
  const held = { [AT]: "export const one = { a: 1, b: 2 }\n" }
  const said = await changeFileCommand(worldOf(held), { at: AT, old: "a: 1\n", new: "a: 9\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "a: 1", contentTo: "a: 9" },
  ])
  expect(landedIn(held, said)).toBe("export const one = { a: 9, b: 2 }\n")
})

test("a passage of whole lines lands with the lines around it as they were", async () => {
  const held = { [AT]: "one\ntwo\nthree\nfour\n" }
  const said = await changeFileCommand(worldOf(held), {
    at: AT,
    old: "two\nthree\n",
    new: "2\n3\n",
  })

  expect(said.refused).toBeNull()
  expect(landedIn(held, said)).toBe("one\n2\n3\nfour\n")
})

test("a passage whose fence closed with no-newline loses no second character", async () => {
  const held = { [AT]: "export const one = { a: 1, b: 2 }\n" }
  const said = await changeFileCommand(worldOf(held), { at: AT, old: "a: 1", new: "a: 9" })

  expect(said.refused).toBeNull()
  expect(landedIn(held, said)).toBe("export const one = { a: 9, b: 2 }\n")
})

type Pair = { readonly written: string; readonly beside: string }

const REPO = worldAt(ROOT, () => null, running)

function firstPair(): Pair | null {
  const index = REPO.index
  const reading = readingIn(ROOT)
  for (const group of groupsIn(index)) {
    for (const pageTypeSlug of group.pageTypeSlugs) {
      for (const listed of index.everyOfType(pageTypeSlug)) {
        const value = index.pageByPath(listed.path)
        if (value === null) continue
        const beside = groupAt(listed.path, group.slug)
        if (beside === null) continue
        if (!existsSync(join(ROOT, beside))) continue
        const page = { path: listed.path, value }
        try {
          return { written: fileOf(reading, page, pageTypeSlug, group.propertySlug), beside }
        } catch {}
      }
    }
  }
  return null
}

const PAIR = firstPair() as Pair

function repoWorld(held: Readonly<Record<string, string>>): World {
  return {
    ...REPO,
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    base: (path) => held[path] ?? null,
  }
}

test("a passage on a file a group writes is refused rather than dropped", async () => {
  const said = await changeFileCommand(repoWorld({}), {
    at: PAIR.written,
    old: "two",
    new: "four",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(PAIR.beside)
  expect(said.refused ?? "").toContain("bodyIn")
})

test("a passage on the code a group writes from is edited as any other body is", async () => {
  const held = { [PAIR.beside]: "one two\n" }
  const said = await changeFileCommand(repoWorld(held), {
    at: PAIR.beside,
    old: "two",
    new: "four",
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: PAIR.beside, contentFrom: "two", contentTo: "four" },
  ])
})
