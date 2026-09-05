import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { QUARANTINE_ROOT, VENDOR_ROOT } from "@akasha/pages-system/checkout-roots"
import { pagesUnder, walkedUnder } from "./tree-reading.module.code.ts"

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
    ".supervisors/e.module.ts",
  ])

  expect(
    under(
      root,
      walkedUnder(root, () => true)
    )
  ).toEqual(["a.module.ts"])
})

test("a page is a file whose page type the tree itself declares", () => {
  const root = treeOf(["module.page-type.ts", "a.module.ts", "b.widget.ts"])

  expect(under(root, pagesUnder(root))).toEqual(["a.module.ts", "module.page-type.ts"])
})

test("a file carrying a section is no page", () => {
  const root = treeOf(["module.page-type.ts", "a.module.ts", "a.module.code.ts"])

  expect(under(root, pagesUnder(root))).toEqual(["a.module.ts", "module.page-type.ts"])
})
