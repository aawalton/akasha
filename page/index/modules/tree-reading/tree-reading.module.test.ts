import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  filesIn,
  foldersIn,
  pagesUnder,
  walkedUnder,
} from "akasha/page/index/modules/tree-reading/tree-reading.module.code.ts"
import {
  QUARANTINE_ROOT,
  VENDOR_ROOT,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function treeOf(named: readonly string[]): string {
  const root = scratch.rootFor("akasha-tree-reading-")
  for (const one of named) {
    const at = join(root, one)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, "\n")
  }
  return root
}

function under(root: string, found: readonly string[]): readonly string[] {
  return found.map((one) => one.slice(root.length + 1)).sort()
}

test("every file a caller takes is found however deep it sits", () => {
  const root = treeOf(["a.module.ts", "deep/down/b.module.ts", "notes.txt"])

  expect(
    under(
      root,
      walkedUnder(root, (name) => name.endsWith(".ts"))
    )
  ).toEqual(["a.module.ts", "deep/down/b.module.ts"])
})

test("the four folders left out are read by nothing", () => {
  const root = treeOf([
    "a.module.ts",
    `${VENDOR_ROOT}/b.module.ts`,
    `${QUARANTINE_ROOT}/c.module.ts`,
    ".git/d.module.ts",
    `${INDEX_AT}/e.module.ts`,
  ])

  expect(
    under(
      root,
      walkedUnder(root, () => true)
    )
  ).toEqual(["a.module.ts"])
})

test("a folder named for the quarantine below the top is read", () => {
  const root = treeOf([`${QUARANTINE_ROOT}/a.module.ts`, `under/${QUARANTINE_ROOT}/b.module.ts`])

  expect(
    under(
      root,
      walkedUnder(root, () => true)
    )
  ).toEqual([`under/${QUARANTINE_ROOT}/b.module.ts`])
})

test("a folder the caller does not enter is read no deeper", () => {
  const root = treeOf(["a.module.ts", "out/b.module.ts", "out/deep/c.module.ts"])

  expect(
    under(
      root,
      walkedUnder(
        root,
        () => true,
        (path) => path !== join(root, "out")
      )
    )
  ).toEqual(["a.module.ts"])
})

test("a caller saying nothing about folders enters every folder", () => {
  const root = treeOf(["a.module.ts", "out/b.module.ts"])

  expect(
    under(
      root,
      walkedUnder(root, () => true)
    )
  ).toEqual(["a.module.ts", "out/b.module.ts"])
})

test("a page is a file whose page type the tree itself declares", () => {
  const root = treeOf(["module.page-type.ts", "a.module.ts", "b.widget.ts"])

  expect(under(root, pagesUnder(root))).toEqual(["a.module.ts", "module.page-type.ts"])
})

test("a file carrying a section is no page", () => {
  const root = treeOf(["module.page-type.ts", "a.module.ts", "a.module.code.ts"])

  expect(under(root, pagesUnder(root))).toEqual(["a.module.ts", "module.page-type.ts"])
})

const WHO: readonly string[] = [
  "-c",
  "user.email=tree-reading@akasha",
  "-c",
  "user.name=tree-reading",
  "-c",
  "commit.gpgsign=false",
]

function carriedTree(): string {
  const root = scratch.rootFor("akasha-tree-carried-")
  mkdirSync(join(root, "one", "two"), { recursive: true })
  writeFileSync(join(root, ".gitignore"), "*.tsbuildinfo\n")
  writeFileSync(join(root, "one", "a.module.ts"), "\n")
  writeFileSync(join(root, "one", "two", "b.module.ts"), "\n")
  said(root, ["init", "--quiet"])
  said(root, ["add", "--all"])
  said(root, [...WHO, "commit", "--quiet", "-m", "what git carries"])
  writeFileSync(join(root, "one", "left.tsbuildinfo"), "\n")
  mkdirSync(join(root, "one", "out"), { recursive: true })
  writeFileSync(join(root, "one", "out", "built.txt"), "\n")
  return root
}

test("a file git ignores is no file of the folder it sits in", () => {
  expect(filesIn(carriedTree(), "one")).toEqual(["one/a.module.ts"])
})

test("a folder git carries nothing in is no folder of the folder above it", () => {
  expect(foldersIn(carriedTree(), "one")).toEqual(["one/two"])
})

test("a tree no repository holds is read as that tree sits on disk", () => {
  const root = treeOf(["one/a.module.ts", "one/left.tsbuildinfo"])

  expect(filesIn(root, "one")).toEqual(["one/a.module.ts", "one/left.tsbuildinfo"])
})

function landedOnTree(): { readonly root: string; readonly base: string } {
  const root = scratch.rootFor("akasha-tree-pinned-")
  mkdirSync(join(root, "one"), { recursive: true })
  writeFileSync(join(root, "one", "a.module.ts"), "\n")
  said(root, ["init", "--quiet"])
  said(root, ["add", "--all"])
  said(root, [...WHO, "commit", "--quiet", "-m", "the commit a change is judged against"])
  const base = said(root, ["rev-parse", "HEAD"]).trim()
  mkdirSync(join(root, "one", "later"), { recursive: true })
  writeFileSync(join(root, "one", "later", "b.module.ts"), "\n")
  said(root, ["add", "--all"])
  said(root, [...WHO, "commit", "--quiet", "-m", "another landing"])
  return { root, base }
}

test("a path a later commit first carried is carried by nothing at the commit named", () => {
  const { root, base } = landedOnTree()

  expect(filesIn(root, "one/later", base)).toEqual([])
  expect(foldersIn(root, "one/later", base)).toEqual([])
})

test("that path is carried where no commit is named", () => {
  const { root } = landedOnTree()

  expect(filesIn(root, "one/later")).toEqual(["one/later/b.module.ts"])
})

test("what the commit named already carried is carried still", () => {
  const { root, base } = landedOnTree()

  expect(filesIn(root, "one", base)).toEqual(["one/a.module.ts"])
})
