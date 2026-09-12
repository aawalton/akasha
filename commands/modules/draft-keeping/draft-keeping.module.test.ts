import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  drafting,
  keptText,
} from "akasha/commands/modules/draft-keeping/draft-keeping.module.test-fixtures.ts"
import {
  BROKEN,
  bytes,
  git,
  pageRepo,
  REFUSES,
  scratch,
} from "akasha/commands/modules/landing/landing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a change drafted is kept as an edit and reaches no file and no commit of its own", async () => {
  const root = pageRepo()
  const said = await drafting(root, [{ path: "new.txt", body: bytes("proposed") }])
  expect("refusals" in said ? [] : said.drafted).toEqual(["new.txt"])
  expect(keptText(root)).toContain("proposed")
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(git(root, ["log", "--name-only", "--format="])).not.toContain("new.txt")
})

test("a draft runs no check, so a gate that would refuse drafts all the same", async () => {
  const root = pageRepo()
  await drafting(root, [{ path: "one.txt", body: bytes("first") }])
  await drafting(root, [{ path: "two.txt", body: bytes("second") }], REFUSES)
  expect(keptText(root)).toContain("first")
  expect(keptText(root)).toContain("second")
})

test("a body that spells no text is drafted by no edit", async () => {
  const root = pageRepo()
  const said = await drafting(root, [{ path: "blob.bin", body: BROKEN }])
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("spells no text")
  expect(keptText(root)).toBe("")
})
