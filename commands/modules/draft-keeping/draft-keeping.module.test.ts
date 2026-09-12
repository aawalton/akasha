import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  drafting,
  keptText,
} from "akasha/commands/modules/draft-keeping/draft-keeping.module.test-fixtures.ts"
import {
  A,
  ADMITS,
  BROKEN,
  bytes,
  committedAgain,
  git,
  pageRepo,
  pagesRepo,
  REFUSES,
  scratch,
} from "akasha/commands/modules/landing/landing.module.test-fixtures.ts"
import { baseOf } from "akasha/commands/modules/landing-change-composing/landing-change-composing.module.code.ts"

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

test("a draft refused over a body that moved names the call taking the kept edits away", async () => {
  const root = pagesRepo()
  const read = baseOf(root)
  committedAgain(root, "akasha/a.domain.ts", `${A}\n`)
  const said = await drafting(
    root,
    [{ path: "akasha/a.domain.ts", body: bytes("moved") }],
    ADMITS,
    read
  )
  const why = "refusals" in said ? said.refusals.join("\n") : ""
  expect(why).toContain("moved in between")
  expect(why).toContain("`akasha change drop` with `all: true`")
  expect(why).toContain("drafted again")
  expect(keptText(root)).toBe("")
})

test("a body that spells no text is drafted by no edit", async () => {
  const root = pageRepo()
  const said = await drafting(root, [{ path: "blob.bin", body: BROKEN }])
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("spells no text")
  expect(keptText(root)).toBe("")
})
