import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { landing } from "akasha/command/modules/landing/landing.module.code.ts"
import {
  A,
  ADMITS,
  bytes,
  carriedRepo,
  edgedOver,
  git,
  ID,
  PAGE,
  pageLanded,
  repoWith,
  rowsIn,
  scratch,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import {
  baseOf,
  beforeOf,
  changeOf,
} from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { takenUnheld } from "akasha/command/modules/unheld-taking/unheld-taking.module.code.ts"
import { readingEnded } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import {
  idFiledIn,
  listedFiledIn,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

afterAll(scratch.sweep)

const TEXT = new TextDecoder()

const textOf = (body: Uint8Array | null | undefined): string | null =>
  body === null || body === undefined ? null : TEXT.decode(body)

test("a path no commit holds is taken away as its body on the tree, unless ignored or a folder", () => {
  const root = repoWith({ ".gitignore": "*.uncommitted.*\n", "one.txt": "committed" })
  writeFileSync(join(root, "left.txt"), "left")
  writeFileSync(join(root, "kept.uncommitted.json"), "kept")
  writeFileSync(join(root, "written.txt"), "was")
  mkdirSync(join(root, "deep"))
  writeFileSync(join(root, "deep/inner.txt"), "inner")
  const paths = ["one.txt", "left.txt", "kept.uncommitted.json", "deep", "written.txt"]
  const before = takenUnheld(root, beforeOf(root, baseOf(root), paths), [
    { path: "one.txt", body: null },
    { path: "left.txt", body: null },
    { path: "kept.uncommitted.json", body: null },
    { path: "deep", body: null },
    { path: "written.txt", body: bytes("new") },
  ])
  expect(paths.map((one) => textOf(before.get(one)))).toEqual([
    "committed",
    "left",
    null,
    null,
    null,
  ])
})

test("a landing taking away a page no commit holds takes its index entries with it", async () => {
  const root = await pageLanded(await edgedOver(await carriedRepo()))
  git(root, ["reset", "--soft", "HEAD~1"])
  git(root, ["reset", "-q"])
  expect(idFiledIn(root, ID)).toBe(true)
  const gone = changeOf(root, baseOf(root), [{ kind: "remove", path: PAGE }])
  expect(textOf(gone.before(PAGE))).toBe(A)
  readingEnded()
  await landing(root, rowsIn(root, [{ path: PAGE, body: null }]), "held", ADMITS)
  expect(existsSync(join(root, PAGE))).toBe(false)
  expect(idFiledIn(root, ID)).toBe(false)
  expect(listedFiledIn(root, "domain", "a")).toBe(false)
})
