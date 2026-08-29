import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { expect, test } from "bun:test"
import { checksAt, checksIn, judgingBy, onDisk } from "./checking.module.code.ts"

const CHECKS_AT = ".git/data/index/identity/check/slug"

function rootWith(
  named: readonly {
    readonly slug: string
    readonly needs: string
    readonly runsOn: readonly string[]
    readonly body: string
  }[]
): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-checking-"))
  mkdirSync(join(root, CHECKS_AT), { recursive: true })
  for (const one of named) {
    const at = `akasha/checks-system/check/${one.slug}/${one.slug}.check.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    const camel = one.slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())
    writeFileSync(
      join(root, at),
      `export const ${camel} = {\n` +
        `  slug: "${one.slug}",\n` +
        `  needs: "${one.needs}",\n` +
        `  runsOn: ${JSON.stringify(one.runsOn)},\n` +
        `}\n`
    )
    writeFileSync(join(root, `${at.slice(0, -".ts".length)}.code.ts`), one.body)
    writeFileSync(
      join(root, CHECKS_AT, `${one.slug}.jsonl`),
      `${JSON.stringify({ path: at, id: "01a04bc4-0000-7000-8000-000000000000" })}\n`
    )
  }
  return root
}

const REFUSES_ALL = `export function refusesAll() {\n  return ["refused"]\n}\n`

const ADMITS_ALL = `export function admitsAll() {\n  return []\n}\n`

const THROWS = `export function throws() {\n  throw new Error("could not look")\n}\n`

test("a check is found through the index rather than by walking the tree", () => {
  const root = rootWith([
    { slug: "admits-all", needs: "file", runsOn: ["patch"], body: ADMITS_ALL },
  ])
  const found = checksIn(root)
  expect(found.map((one) => one.slug)).toEqual(["admits-all"])
  expect(found[0]?.needs).toBe("file")
  rmSync(root, { recursive: true })
})

test("a check is run once for each changed file, and not for the rest of the tree", () => {
  const root = rootWith([
    { slug: "refuses-all", needs: "file", runsOn: ["patch"], body: REFUSES_ALL },
  ])
  writeFileSync(join(root, "one.ts"), "one")
  writeFileSync(join(root, "two.ts"), "two")
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["one.ts"],
    at: onDisk(root),
  })
  expect(said.map((one) => one.path)).toEqual(["one.ts"])
  rmSync(root, { recursive: true })
})

test("a check that threw refuses the change it could not judge", () => {
  const root = rootWith([{ slug: "throws", needs: "file", runsOn: ["patch"], body: THROWS }])
  writeFileSync(join(root, "one.ts"), "one")
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["one.ts"],
    at: onDisk(root),
  })
  expect(said.length).toBe(1)
  expect(said[0]?.reason).toContain("could not look")
  rmSync(root, { recursive: true })
})

test("a file the change took away is judged by nothing", () => {
  const root = rootWith([
    { slug: "refuses-all", needs: "file", runsOn: ["patch"], body: REFUSES_ALL },
  ])
  const said = judgingBy(checksIn(root)).over({
    root,
    changed: ["gone.ts"],
    at: onDisk(root),
  })
  expect(said).toEqual([])
  rmSync(root, { recursive: true })
})

test("a phase takes only the checks that state it", () => {
  const root = rootWith([
    { slug: "admits-all", needs: "file", runsOn: ["patch"], body: ADMITS_ALL },
    { slug: "refuses-all", needs: "file", runsOn: ["deploy"], body: REFUSES_ALL },
  ])
  const every = checksIn(root)
  expect(checksAt(every, "patch").map((one) => one.slug)).toEqual(["admits-all"])
  expect(checksAt(every, "deploy").map((one) => one.slug)).toEqual(["refuses-all"])
  expect(checksAt(every, "worktree")).toEqual([])
  rmSync(root, { recursive: true })
})

test("a check page stating no needs a runner can honour is refused", () => {
  const root = rootWith([
    { slug: "admits-all", needs: "tree", runsOn: ["patch"], body: ADMITS_ALL },
  ])
  expect(() => checksIn(root)).toThrow("states no `needs`")
  rmSync(root, { recursive: true })
})
