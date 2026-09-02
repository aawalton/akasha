import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { rootOf } from "@akasha/command-system/rooting"
import { scratchWorld } from "@akasha/command-system/scratching"
import { codeOf, namedFor, reachedIn, searchedIn } from "./hook-reaching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HOOK = "block-nothing"

const NAMED = "block-nothing.agent-hook.code.ts"

function worldAt(): string {
  return scratch.rootFor("akasha-hook-reaching-")
}

function coded(root: string, under: string): string {
  const at = join(root, "akasha", under)
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, NAMED), "export const ran = (): number => 0\n")
  return join("akasha", under, NAMED)
}

test("a hook's code file is named for the hook", () => {
  expect(namedFor(HOOK)).toBe(NAMED)
})

test("the code file is the one beside the page", () => {
  expect(codeOf("akasha/one/two.agent-hook.ts")).toBe("akasha/one/two.agent-hook.code.ts")
})

test("a page path that is already a code file names no second code file", () => {
  expect(codeOf("akasha/one/two.agent-hook.code.ts")).toBeNull()
})

test("a path named nothing typescript names no code file", () => {
  expect(codeOf("akasha/one/two.json")).toBeNull()
})

test("the search answers the path a hook's code file has, read against the root", () => {
  const root = worldAt()
  const at = coded(root, "hook-system/agent-hooks/block-nothing")
  expect(searchedIn(root, HOOK)).toEqual([at])
})

test("the search finds a hook's code file wherever under the folder it has been carried", () => {
  const root = worldAt()
  const at = coded(root, "somewhere/else/entirely")
  expect(searchedIn(root, HOOK)).toEqual([at])
})

test("what git keeps its own workings in is passed over by the search", () => {
  const root = worldAt()
  const at = coded(root, "hooks/block-nothing")
  mkdirSync(join(root, "akasha", ".git", "objects"), { recursive: true })
  writeFileSync(join(root, "akasha", ".git", "objects", NAMED), "one\n")
  expect(searchedIn(root, HOOK)).toEqual([at])
})

test("an index that answers nothing sends the reach to the search", () => {
  const root = worldAt()
  const at = coded(root, "hook-system/agent-hooks/block-nothing")
  expect(reachedIn(root, HOOK)).toEqual({ at })
})

test("a name reaching no file is unreached, and says the name it looked for", () => {
  const root = worldAt()
  mkdirSync(join(root, "akasha"), { recursive: true })
  const said = reachedIn(root, HOOK)
  expect(said).toHaveProperty("unreached")
  if (!("unreached" in said)) return
  expect(said.unreached).toContain(NAMED)
  expect(said.unreached).toContain(HOOK)
})

test("a name reaching two files is unreached, and names both", () => {
  const root = worldAt()
  const one = coded(root, "here")
  const two = coded(root, "there")
  const said = reachedIn(root, HOOK)
  expect(said).toHaveProperty("unreached")
  if (!("unreached" in said)) return
  expect(said.unreached).toContain(one)
  expect(said.unreached).toContain(two)
})

test("a hook this repository carries is reached by its name", () => {
  const said = reachedIn(rootOf(import.meta.path), "block-biome")
  expect(said).toHaveProperty("at")
  if (!("at" in said)) return
  expect(said.at.endsWith("block-biome.agent-hook.code.ts")).toBe(true)
})
