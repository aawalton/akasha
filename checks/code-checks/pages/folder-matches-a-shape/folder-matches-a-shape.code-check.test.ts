import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { idFiled, listedFiled, pathFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { shadowFor } from "@akasha/pages-system/shadow"
import { onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import { carrying, declaring } from "../../../modules/check-scratch/check-scratch.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  ancestorsOf,
  edgesOf,
  folderMatchesAShape,
  folderOf,
  foldersTouchedBy,
  type Holds,
  heldFolder,
  namesFiling,
  namingFolderOf,
  pageNameOf,
  reachedFolders,
} from "./folder-matches-a-shape.code-check.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ROOT = "/repo"

const encoder = new TextEncoder()

function change(
  changed: readonly string[],
  now: Readonly<Record<string, string | null>>,
  before: Readonly<Record<string, string | null>>
): Change {
  const bodied = (held: Readonly<Record<string, string | null>>) => (path: string) => {
    const said = held[path]
    return said === undefined || said === null ? null : encoder.encode(said)
  }
  return { root: ROOT, changed, after: bodied(now), before: bodied(before) }
}

function holding(named: Readonly<Record<string, readonly string[]>>): Holds {
  return (folder) => ({
    names: named[folder] ?? [],
    holds: null,
    declared: new Set<string>(),
  })
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
  const said = foldersTouchedBy(change(["akasha/a/b/one.ts"], { "akasha/a/b/one.ts": "" }, {}))
  expect([...said].sort()).toEqual(["akasha", "akasha/a", "akasha/a/b"])
})

test("an import the change adds carries the folder it reaches", () => {
  const said = foldersTouchedBy(
    change(
      ["akasha/a/one.ts"],
      { "akasha/a/one.ts": 'import { two } from "../c/two.ts"\n' },
      { "akasha/a/one.ts": "" }
    )
  )
  expect(said.has("akasha/c")).toBe(true)
})

test("an import the change takes away carries the folder it used to reach", () => {
  const said = foldersTouchedBy(
    change(
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
    change(["akasha/a/one.ts"], { "akasha/a/one.ts": body }, { "akasha/a/one.ts": body })
  )
  expect(said.has("akasha/c")).toBe(false)
})

test("a path the change takes away still carries the folders above it", () => {
  const said = foldersTouchedBy(
    change(["akasha/a/one.ts"], { "akasha/a/one.ts": null }, { "akasha/a/one.ts": "" })
  )
  expect(said.has("akasha/a")).toBe(true)
})

test("a folder named `pages` the page in it names is that page's folder rather than a part", () => {
  const holds = holding({ "akasha/pages-system/pages": ["page", "pages"] })
  expect(heldFolder("akasha/pages-system/pages", holds)).toBe(false)
  expect(namingFolderOf("akasha/pages-system/pages/address", holds)).toBe(
    "akasha/pages-system/pages"
  )
})

test("a folder named `pages` the page in it does not name is a part, and is looked through", () => {
  const holds = holding({ "akasha/foo/pages": ["bar"] })
  expect(heldFolder("akasha/foo/pages", holds)).toBe(true)
  expect(namingFolderOf("akasha/foo/pages/deep", holds)).toBe("akasha/foo")
})

test("a folder named `pages` holding no page at all is a part", () => {
  const holds = holding({})
  expect(heldFolder("akasha/foo/pages", holds)).toBe(true)
  expect(namingFolderOf("akasha/foo/pages/deep", holds)).toBe("akasha/foo")
})

test("a folder named `scripts` the page in it does not name is a part, and is looked through", () => {
  const holds = holding({ "akasha/foo/scripts": ["bar"] })
  expect(heldFolder("akasha/foo/scripts", holds)).toBe(true)
  expect(namingFolderOf("akasha/foo/scripts/deep", holds)).toBe("akasha/foo")
})

test("a folder named `scripts` the page in it names is that page's folder rather than a part", () => {
  const holds = holding({ "akasha/code-system/scripts": ["script", "scripts"] })
  expect(heldFolder("akasha/code-system/scripts", holds)).toBe(false)
  expect(namingFolderOf("akasha/code-system/scripts/deep", holds)).toBe(
    "akasha/code-system/scripts"
  )
})

test("every part between a folder and the page above it is looked through", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  expect(namingFolderOf("akasha/foo/modules/pages/deep", holds)).toBe("akasha/foo")
})

test("a folder named for no part is never looked through", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  expect(heldFolder("akasha/foo/other", holds)).toBe(false)
  expect(namingFolderOf("akasha/foo/other/deep", holds)).toBe("akasha/foo/other")
})

function idFor(n: number): string {
  return `01a04e00-0000-7000-8000-0000000000${String(n).padStart(2, "0")}`
}

function filed(
  root: string,
  path: string,
  id: string,
  kind: string,
  slug: string,
  body: string
): undefined {
  writing(root, path, body)
  const held = [{ path, id }]
  idFiled(root, id, held)
  listedFiled(root, kind, slug, held)
  pathFiled(root, path, held)
}

const SHAPE_CODE = `export function noStrays(standing) {
  return standing.strays.length === 0 ? [] : ["it holds a stray"]
}
`

const REFUSING_CODE = `export function refusesAll() {
  return ["a shape judging no folder judged this folder"]
}
`

function rooted(): string {
  const root = scratch.rootFor("akasha-folder-shape-")
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "always" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "page-type" })
  declaring(root, "code", { pageTypeSlug: "file-property", unique: null })
  const shape = "akasha/s/no-strays.folder-shape.ts"
  filed(
    root,
    shape,
    idFor(1),
    "folder-shape",
    "no-strays",
    `export const noStrays = { id: "${idFor(1)}", slug: "no-strays", pageTypeSlug: "folder-shape", code: "ts", enabled: true }\n`
  )
  writing(root, "akasha/s/no-strays.folder-shape.code.ts", SHAPE_CODE)
  pathFiled(root, "akasha/s/no-strays.folder-shape.code.ts", [{ path: shape, id: idFor(1) }])
  const declares =
    '[{ pagePropertySlug: "id", required: true, many: false },' +
    ' { pagePropertySlug: "slug", required: true, many: false }]'
  filed(
    root,
    "akasha/t/page.page-type.ts",
    idFor(5),
    "page-type",
    "page",
    `export const it = { id: "${idFor(5)}", slug: "page", pageTypeSlug: "page-type",` +
      ` extendsSlug: [], properties: ${declares} }\n`
  )
  for (const [n, slug] of [
    [2, "page-type"],
    [3, "folder-shape"],
    [4, "file-property"],
  ] as [number, string][]) {
    filed(
      root,
      `akasha/t/${slug}.page-type.ts`,
      idFor(n),
      "page-type",
      slug,
      `export const it = { id: "${idFor(n)}", slug: "${slug}", pageTypeSlug: "page-type",` +
        ' extendsSlug: ["page-type/page"] }\n'
    )
  }
  return root
}

function arriving(root: string, bodies: Record<string, string>): Change {
  const was = onDisk(root)
  return {
    root,
    changed: Object.keys(bodies),
    after: (path: string): Uint8Array | null => {
      const said = bodies[path]
      return said === undefined ? was(path) : encoder.encode(said)
    },
    before: (): null => null,
  }
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return folderMatchesAShape(change, cast.shadow)
}

test("a page of a page type the change itself adds is a page, not a stray", () => {
  const root = rooted()
  const said = judged(
    arriving(root, {
      "akasha/b/probe.page-type.ts": `export const probe = { id: "${idFor(10)}", slug: "probe", pageTypeSlug: "page-type", extendsSlug: [] }\n`,
      "akasha/b/x.probe.ts": `export const x = { id: "${idFor(11)}", slug: "x", pageTypeSlug: "probe" }\n`,
    })
  )
  expect(said).toEqual([])
})

test("a file standing beside a page through a file property the change adds is no stray either", () => {
  const root = rooted()
  const said = judged(
    arriving(root, {
      "akasha/b/notes.file-property.ts": `export const notes = { id: "${idFor(20)}", slug: "notes", pageTypeSlug: "file-property", propertySlug: "notes" }\n`,
      "akasha/b/one.page-type.ts": `export const one = { id: "${idFor(21)}", slug: "one", pageTypeSlug: "page-type", extendsSlug: [], notes: "ts" }\n`,
      "akasha/b/one.page-type.notes.ts": "export const held = 1\n",
    })
  )
  expect(said).toEqual([])
})

const MANIFEST = { pageTypeSlug: "named-file-property", unique: null, fileName: "package.json" }

test("a file a page claims under the name its property states is no stray", () => {
  const root = rooted()
  declaring(root, "manifest", MANIFEST)
  carrying(root, "page-type", ["manifest"], "page")
  const said = judged(
    arriving(root, {
      "akasha/b/one.page-type.ts": `export const one = { id: "${idFor(30)}", slug: "one", pageTypeSlug: "page-type", extendsSlug: [], manifest: "json" }\n`,
      "akasha/b/package.json": '{ "name": "@akasha/one" }\n',
    })
  )
  expect(said).toEqual([])
})

test("a file no page claims is a stray still, though its name is one a property states", () => {
  const root = rooted()
  declaring(root, "manifest", MANIFEST)
  const said = judged(
    arriving(root, {
      "akasha/b/one.page-type.ts": `export const one = { id: "${idFor(31)}", slug: "one", pageTypeSlug: "page-type", extendsSlug: [] }\n`,
      "akasha/b/package.json": '{ "name": "@akasha/one" }\n',
    })
  )
  expect(said.map((each) => each.path)).toEqual(["akasha/b"])
  expect(said[0]?.reason).toContain("it holds a stray")
})

test("a name no property states is a stray though a page claims the path", () => {
  const root = rooted()
  declaring(root, "manifest", MANIFEST)
  const path = "akasha/b/README"
  const page = "akasha/b/one.page-type.ts"
  pathFiled(root, path, [{ path: page, id: idFor(32) }])
  const said = judged(
    arriving(root, {
      [page]: `export const one = { id: "${idFor(32)}", slug: "one", pageTypeSlug: "page-type", extendsSlug: [] }\n`,
      [path]: "read me\n",
    })
  )
  expect(said.map((each) => each.path)).toEqual(["akasha/b"])
})

test("the page a claimed file stands beside is the one the index names", () => {
  expect(pageNameOf("akasha/pages-system/indexes/indexes.workspace-package.ts")).toBe(
    "indexes.workspace-package"
  )
  expect(
    namesFiling(
      new Map([
        ["manifest", "package.json"],
        ["code", null],
      ])
    )
  ).toEqual(new Map([["package.json", "manifest"]]))
})

test("a shape judging no folder is never loaded", () => {
  const root = rooted()
  const shape = "akasha/s/refuses-all.folder-shape.ts"
  filed(
    root,
    shape,
    idFor(40),
    "folder-shape",
    "refuses-all",
    `export const refusesAll = { id: "${idFor(40)}", slug: "refuses-all", pageTypeSlug: "folder-shape", code: "ts", enabled: false }\n`
  )
  const beside = "akasha/s/refuses-all.folder-shape.code.ts"
  writing(root, beside, REFUSING_CODE)
  pathFiled(root, beside, [{ path: shape, id: idFor(40) }])
  const said = judged(
    arriving(root, {
      "akasha/b/probe.page-type.ts": `export const probe = { id: "${idFor(41)}", slug: "probe", pageTypeSlug: "page-type", extendsSlug: [] }\n`,
    })
  )
  expect(said).toEqual([])
})
