import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { PINNED_AT } from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { checkoutFrom } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const SCRATCH_AT = process.env["SCRATCH_AT"] ?? "/var/tmp"

const DEEP = "page/modules/checkout-roots"

const A_COMMIT = "0123456789abcdef0123456789abcdef01234567\n"

const scratch = mkdtempSync(join(SCRATCH_AT, "checkout-roots-"))

const checkout = join(scratch, "checkout")

const inCheckout = join(checkout, DEEP)

const tree = join(checkout, ".git/trees/service-workstation")

const inTree = join(tree, DEEP)

const exported = join(scratch, "export")

const inExport = join(exported, DEEP)

const loose = join(scratch, "loose")

const inLoose = join(loose, "one/two")

mkdirSync(join(checkout, ".git"), { recursive: true })
mkdirSync(inCheckout, { recursive: true })
mkdirSync(inTree, { recursive: true })
mkdirSync(inExport, { recursive: true })
mkdirSync(inLoose, { recursive: true })
writeFileSync(join(tree, PINNED_AT), A_COMMIT)
writeFileSync(join(exported, PINNED_AT), A_COMMIT)

afterAll(() => {
  rmSync(scratch, { recursive: true, force: true })
})

test("a folder holding `.git` answers itself", () => {
  expect(checkoutFrom(checkout)).toBe(checkout)
})

test("a path inside a checkout answers the checkout", () => {
  expect(checkoutFrom(inCheckout)).toBe(checkout)
})

test("a path inside a tree stamped with a pinned commit and holding no `.git` answers that tree", () => {
  expect(checkoutFrom(inExport)).toBe(exported)
})

test("a stamped tree nested in a checkout answers the tree rather than the checkout", () => {
  expect(checkoutFrom(inTree)).toBe(tree)
})

test("a tree root stamped with a pinned commit answers itself", () => {
  expect(checkoutFrom(tree)).toBe(tree)
})

test("a path under no marked checkout answers the folder two above that path", () => {
  expect(checkoutFrom(inLoose)).toBe(loose)
})
