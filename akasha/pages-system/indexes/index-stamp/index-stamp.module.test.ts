import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import {
  declaring,
  declaringUnder,
} from "../../../testing-system/declaring/declaring.module.code.ts"
import { gitIn } from "../../../testing-system/gitting/gitting.module.code.ts"
import { indexingAt, rebuiltFrom } from "../indexing/indexing.module.code.ts"
import {
  headOf,
  staleFor,
  stampBuilt,
  stampIn,
  stampKept,
  stampSettled,
} from "./index-stamp.module.code.ts"

const NOWHERE = "0000000000000000000000000000000000000000"

const A_PAGE =
  'export const it = { id: "01a04de3-0000-7000-8000-00000000000a", pageTypeSlug: "page-type", slug: "a", extendsSlug: null } as const\n'

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoAt(): string {
  const repo = scratch.rootFor("akasha-stamp-")
  gitIn(repo, ["init", "--quiet"])
  gitIn(repo, ["config", "user.email", "held@akasha"])
  gitIn(repo, ["config", "user.name", "held"])
  gitIn(repo, ["config", "commit.gpgsign", "false"])
  return repo
}

function put(repo: string, at: string, body: string): string {
  const path = join(repo, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body)
  return at
}

function committed(repo: string, at: string, body: string): string {
  put(repo, at, body)
  gitIn(repo, ["add", "--", at])
  gitIn(repo, ["commit", "--quiet", "-m", at, "--", at])
  return headOf(repo) ?? ""
}

function indexAt(repo: string): string {
  return join(repo, ".git", "data", "index")
}

const TREE = "akasha"

test("an index carrying no stamp describes no commit", () => {
  const repo = repoAt()
  committed(repo, `${TREE}/a.ts`, "export const a = 1\n")

  expect(staleFor(repo, indexAt(repo))).toMatch(/names no commit/)
})

test("a stamp naming HEAD is fresh", () => {
  const repo = repoAt()
  const head = committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  stampKept(indexAt(repo), { commit: head, tree: TREE, settled: [] })

  expect(staleFor(repo, indexAt(repo))).toBe(null)
})

test("a commit made by hand the index was never settled over is stale", () => {
  const repo = repoAt()
  const head = committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  stampKept(indexAt(repo), { commit: head, tree: TREE, settled: [] })
  committed(repo, `${TREE}/b.ts`, "export const b = 2\n")

  expect(staleFor(repo, indexAt(repo))).toMatch(/akasha\/b\.ts/)
})

test("a commit of a path the settle named is fresh", () => {
  const repo = repoAt()
  const head = committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  stampKept(indexAt(repo), { commit: head, tree: TREE, settled: [] })
  stampSettled(repo, indexAt(repo), [`${TREE}/b.ts`])
  committed(repo, `${TREE}/b.ts`, "export const b = 2\n")

  expect(staleFor(repo, indexAt(repo))).toBe(null)
})

test("a settle advances the stamp to the commit its last settle carried", () => {
  const repo = repoAt()
  const head = committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  stampKept(indexAt(repo), { commit: head, tree: TREE, settled: [] })
  stampSettled(repo, indexAt(repo), [`${TREE}/b.ts`])
  const two = committed(repo, `${TREE}/b.ts`, "export const b = 2\n")
  stampSettled(repo, indexAt(repo), [`${TREE}/c.ts`])

  expect(stampIn(indexAt(repo))).toEqual({ commit: two, tree: TREE, settled: [`${TREE}/c.ts`] })
})

test("a settle over a stale index leaves the commit it cannot vouch for", () => {
  const repo = repoAt()
  const head = committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  stampKept(indexAt(repo), { commit: head, tree: TREE, settled: [] })
  committed(repo, `${TREE}/b.ts`, "export const b = 2\n")
  stampSettled(repo, indexAt(repo), [`${TREE}/c.ts`])

  expect(stampIn(indexAt(repo))?.commit).toBe(head)
  expect(staleFor(repo, indexAt(repo))).toMatch(/akasha\/b\.ts/)
})

test("a stamp naming a commit this repository does not hold is stale", () => {
  const repo = repoAt()
  committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  stampKept(indexAt(repo), { commit: NOWHERE, tree: TREE, settled: [] })

  expect(staleFor(repo, indexAt(repo))).toMatch(/does not hold/)
})

test("a change outside the tree the stamp names leaves the stamp fresh", () => {
  const repo = repoAt()
  const head = committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  stampKept(indexAt(repo), { commit: head, tree: TREE, settled: [] })
  committed(repo, "elsewhere/a.ts", "export const a = 1\n")

  expect(staleFor(repo, indexAt(repo))).toBe(null)
})

test("a rebuild stamps every path the worktree has changed", () => {
  const repo = repoAt()
  committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  put(repo, `${TREE}/a.ts`, "export const a = 2\n")
  put(repo, `${TREE}/new.ts`, "export const held = 3\n")
  stampBuilt(repo, join(repo, TREE), indexAt(repo))

  expect(stampIn(indexAt(repo))?.settled).toEqual([`${TREE}/a.ts`, `${TREE}/new.ts`])
  expect(staleFor(repo, indexAt(repo))).toBe(null)
})

test("a rebuild of a clean worktree stamps HEAD and nothing else", () => {
  const repo = repoAt()
  const head = committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  stampBuilt(repo, join(repo, TREE), indexAt(repo))

  expect(stampIn(indexAt(repo))).toEqual({ commit: head, tree: TREE, settled: [] })
})

test("a reset onto an earlier commit is stale rather than answered", () => {
  const repo = repoAt()
  committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  const two = committed(repo, `${TREE}/b.ts`, "export const b = 2\n")
  stampBuilt(repo, join(repo, TREE), indexAt(repo))
  gitIn(repo, ["reset", "--hard", "--quiet", `${two}~1`])

  expect(staleFor(repo, indexAt(repo))).toMatch(/akasha\/b\.ts/)
})

test("a checkout of a branch holding other pages is stale rather than answered", () => {
  const repo = repoAt()
  const head = committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  gitIn(repo, ["checkout", "--quiet", "-b", "held"])
  committed(repo, `${TREE}/held.ts`, "export const held = 1\n")
  gitIn(repo, ["checkout", "--quiet", head])
  stampBuilt(repo, join(repo, TREE), indexAt(repo))
  gitIn(repo, ["checkout", "--quiet", "held"])

  expect(staleFor(repo, indexAt(repo))).toMatch(/akasha\/held\.ts/)
})

test("a checkout of a branch leaving the tree unchanged is fresh", () => {
  const repo = repoAt()
  committed(repo, `${TREE}/a.ts`, "export const a = 1\n")
  stampBuilt(repo, join(repo, TREE), indexAt(repo))
  gitIn(repo, ["checkout", "--quiet", "-b", "held"])
  committed(repo, "elsewhere/a.ts", "export const a = 1\n")

  expect(staleFor(repo, indexAt(repo))).toBe(null)
})

test("a rebuild stamps the commit the pages were read at", () => {
  const repo = repoAt()
  for (const [at, body] of Object.entries(declaringUnder(TREE))) committed(repo, at, body)
  const head = committed(repo, `${TREE}/a.page-type.ts`, A_PAGE)
  rebuiltFrom(join(repo, TREE), indexAt(repo), repo)

  expect(stampIn(indexAt(repo))).toEqual({ commit: head, tree: TREE, settled: [] })
})

test("a settle names on the stamp the paths it covered", () => {
  const repo = repoAt()
  for (const [at, body] of Object.entries(declaringUnder(TREE))) committed(repo, at, body)
  committed(repo, `${TREE}/a.page-type.ts`, A_PAGE)
  rebuiltFrom(join(repo, TREE), indexAt(repo), repo)
  const held = indexingAt(indexAt(repo), repo)
  held.wrote(`${TREE}/b.page-type.ts`, A_PAGE, null)
  held.settle()

  expect(stampIn(indexAt(repo))?.settled).toEqual([`${TREE}/b.page-type.ts`])
})

test("a settle over an unstamped index stamps nothing", () => {
  const repo = repoAt()
  declaring(repo)
  committed(repo, `${TREE}/a.page-type.ts`, A_PAGE)
  const held = indexingAt(indexAt(repo), repo)
  held.wrote(`${TREE}/b.page-type.ts`, A_PAGE, null)
  held.settle()

  expect(stampIn(indexAt(repo))).toBe(null)
})

test("a stamp that is not one line of json describes no commit", () => {
  const repo = repoAt()
  mkdirSync(indexAt(repo), { recursive: true })
  writeFileSync(join(indexAt(repo), "stamp.jsonl"), "not json\n")

  expect(stampIn(indexAt(repo))).toBe(null)
  expect(staleFor(repo, indexAt(repo))).toMatch(/names no commit/)
})

test("a directory that is no repository is answered rather than thrown", () => {
  const held = scratch.rootFor("akasha-stamp-")
  stampKept(indexAt(held), { commit: NOWHERE, tree: TREE, settled: [] })

  expect(headOf(held)).toBe(null)
  expect(staleFor(held, indexAt(held))).toMatch(/no commit could be read/)
})
