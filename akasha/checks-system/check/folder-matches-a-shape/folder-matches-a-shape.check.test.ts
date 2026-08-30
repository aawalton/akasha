import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import type { Leaving } from "../../judging/judging.module.code.ts"
import {
  ancestorsOf,
  edgesOf,
  folderMatchesAShape,
  folderOf,
  foldersTouchedBy,
  reachedFolders,
} from "./folder-matches-a-shape.check.code.ts"

const INDEX = join(".git", "data", "index")

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ROOT = "/repo"

const encoder = new TextEncoder()

function leaving(
  changed: readonly string[],
  now: Readonly<Record<string, string | null>>,
  before: Readonly<Record<string, string | null>>
): Leaving {
  const bodied = (held: Readonly<Record<string, string | null>>) => (path: string) => {
    const said = held[path]
    return said === undefined || said === null ? null : encoder.encode(said)
  }
  return { root: ROOT, changed, at: bodied(now), was: bodied(before) }
}

test("a folder is every part of a path but its last", () => {
  expect(folderOf("akasha/a/b/one.ts")).toBe("akasha/a/b")
  expect(folderOf("one.ts")).toBe("")
})

test("every folder above a path is an ancestor, nearest first", () => {
  expect(ancestorsOf("akasha/a/b/one.ts")).toEqual(["akasha/a/b", "akasha/a", "akasha"])
})

test("an import reaches the folders holding it, stopping where the importer stands too", () => {
  expect(reachedFolders("akasha/c/two.ts", "akasha/a/one.ts")).toEqual(["akasha/c"])
})

test("an import inside a folder is no entrance to it, so that folder is not reached", () => {
  expect(reachedFolders("akasha/a/deep/two.ts", "akasha/a/one.ts")).toEqual(["akasha/a/deep"])
})

test("a relative specifier makes an edge and a package specifier makes none", () => {
  const body = 'import { one } from "./two.ts"\nimport ts from "typescript"\n'
  expect([...edgesOf(ROOT, "akasha/a/one.ts", encoder.encode(body))]).toEqual(["akasha/a/two.ts"])
})

test("a body that is nothing makes no edge", () => {
  expect([...edgesOf(ROOT, "akasha/a/one.ts", null)]).toEqual([])
})

test("a changed path carries every folder above it", () => {
  const said = foldersTouchedBy(leaving(["akasha/a/b/one.ts"], { "akasha/a/b/one.ts": "" }, {}))
  expect([...said].sort()).toEqual(["akasha", "akasha/a", "akasha/a/b"])
})

test("an import the change adds carries the folder it reaches", () => {
  const said = foldersTouchedBy(
    leaving(
      ["akasha/a/one.ts"],
      { "akasha/a/one.ts": 'import { two } from "../c/two.ts"\n' },
      { "akasha/a/one.ts": "" }
    )
  )
  expect(said.has("akasha/c")).toBe(true)
})

test("an import the change takes away carries the folder it used to reach", () => {
  const said = foldersTouchedBy(
    leaving(
      ["akasha/a/one.ts"],
      { "akasha/a/one.ts": "" },
      { "akasha/a/one.ts": 'import { two } from "../c/two.ts"\n' }
    )
  )
  expect(said.has("akasha/c")).toBe(true)
})

test("an import the change leaves standing carries no folder of its own", () => {
  const body = 'import { two } from "../c/two.ts"\n'
  const said = foldersTouchedBy(
    leaving(["akasha/a/one.ts"], { "akasha/a/one.ts": body }, { "akasha/a/one.ts": body })
  )
  expect(said.has("akasha/c")).toBe(false)
})

test("a path the change takes away still carries the folders above it", () => {
  const said = foldersTouchedBy(
    leaving(["akasha/a/one.ts"], { "akasha/a/one.ts": null }, { "akasha/a/one.ts": "" })
  )
  expect(said.has("akasha/a")).toBe(true)
})

function idFor(n: number): string {
  return `01a04e00-0000-7000-8000-0000000000${String(n).padStart(2, "0")}`
}

function put(root: string, at: string, body: string): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, body, "utf8")
}

function filed(root: string, at: string, line: string): undefined {
  put(root, join(INDEX, at), `${line}\n`)
}

function property(root: string, slug: string, kind: string, unique: string | null): undefined {
  filed(
    root,
    join("schema", "page-property", "slug", `${slug}.jsonl`),
    JSON.stringify({ pageTypeSlug: kind, targetPageTypeSlug: null, unique })
  )
}

function stands(
  root: string,
  path: string,
  id: string,
  kind: string,
  slug: string,
  body: string
): undefined {
  put(root, path, body)
  const line = JSON.stringify({ path, id })
  filed(root, join("identity", "page", "id", `${id}.jsonl`), line)
  filed(root, join("identity", kind, "slug", `${slug}.jsonl`), line)
  filed(root, join("path", `${path}.jsonl`), line)
}

const SHAPE_CODE = `export function noStrays(standing) {
  return standing.strays.length === 0 ? [] : ["it holds a stray"]
}
`

function rooted(): string {
  const root = scratch.rootFor("akasha-folder-shape-")
  property(root, "id", "text-property", "always")
  property(root, "slug", "text-property", "page-type")
  property(root, "code", "file-property", null)
  const shape = "akasha/s/no-strays.folder-shape.ts"
  stands(
    root,
    shape,
    idFor(1),
    "folder-shape",
    "no-strays",
    `export const noStrays = { id: "${idFor(1)}", slug: "no-strays", pageTypeSlug: "folder-shape", code: "ts" }\n`
  )
  put(root, "akasha/s/no-strays.folder-shape.code.ts", SHAPE_CODE)
  filed(
    root,
    join("path", "akasha/s/no-strays.folder-shape.code.ts.jsonl"),
    JSON.stringify({ path: shape, id: idFor(1) })
  )
  for (const [n, slug] of [
    [2, "page-type"],
    [3, "folder-shape"],
    [4, "file-property"],
  ] as [number, string][]) {
    stands(
      root,
      `akasha/t/${slug}.page-type.ts`,
      idFor(n),
      "page-type",
      slug,
      `export const it = { id: "${idFor(n)}", slug: "${slug}", pageTypeSlug: "page-type", extendsSlug: null }\n`
    )
  }
  return root
}

function arriving(root: string, bodies: Record<string, string>): Leaving {
  return {
    root,
    changed: Object.keys(bodies),
    at: (path: string): Uint8Array | null => {
      const said = bodies[path]
      return said === undefined ? null : encoder.encode(said)
    },
    was: (): null => null,
  }
}

test("a page of a page type the change itself adds is a page, not a stray", () => {
  const root = rooted()
  const said = folderMatchesAShape(
    arriving(root, {
      "akasha/b/probe.page-type.ts": `export const probe = { id: "${idFor(10)}", slug: "probe", pageTypeSlug: "page-type", extendsSlug: null }\n`,
      "akasha/b/x.probe.ts": `export const x = { id: "${idFor(11)}", slug: "x", pageTypeSlug: "probe" }\n`,
    })
  )
  expect(said).toEqual([])
})

test("a file standing beside a page through a file property the change adds is no stray either", () => {
  const root = rooted()
  const said = folderMatchesAShape(
    arriving(root, {
      "akasha/b/notes.file-property.ts": `export const notes = { id: "${idFor(20)}", slug: "notes", pageTypeSlug: "file-property" }\n`,
      "akasha/b/one.page-type.ts": `export const one = { id: "${idFor(21)}", slug: "one", pageTypeSlug: "page-type", extendsSlug: null, notes: "ts" }\n`,
      "akasha/b/one.page-type.notes.ts": "export const held = 1\n",
    })
  )
  expect(said).toEqual([])
})
