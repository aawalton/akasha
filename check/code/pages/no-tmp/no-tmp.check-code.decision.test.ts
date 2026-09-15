import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  allowedIn,
  judgedIn,
} from "akasha/check/code/pages/no-tmp/no-tmp.check-code.decision.code.ts"
import {
  AT,
  CODE_AT,
  rooted,
  SPELLING,
  scratch,
} from "akasha/check/code/pages/no-tmp/no-tmp.check-code.decision.test-fixtures.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const HERE = dirname(import.meta.path)

const OWN: readonly string[] = [
  "no-tmp.code-check.ts",
  "no-tmp.code-check.decision.code.ts",
  "no-tmp.code-check.decision.test.ts",
]

afterAll(scratch.sweep)

const SHADOW = shadowAt(rooted({}, "akasha-no-tmp-judged-"))

test("a file reaching for no scratch at all is let through", () => {
  expect(judgedIn(AT, "export function one(): number {\n  return 1\n}\n", SHADOW)).toEqual([])
})

test("a literal that is exactly the scratch root we refuse is refused, and the line is named", () => {
  const said = judgedIn(AT, '\nconst at = "/tmp"\n', SHADOW)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toMatch(/\/tmp/)
})

test("a literal under it is refused", () => {
  expect(judgedIn(AT, 'const at = "/tmp/held"\n', SHADOW)).toHaveLength(1)
})

test("the scratch root we keep is let through, being its own path from the first character", () => {
  expect(judgedIn(AT, 'const at = "/var/tmp"\n', SHADOW)).toEqual([])
  expect(judgedIn(AT, 'const at = "/var/tmp/held"\n', SHADOW)).toEqual([])
})

test("a path merely beginning with those letters is let through, the part read being whole", () => {
  expect(judgedIn(AT, 'const at = "/tmpfiles/held"\n', SHADOW)).toEqual([])
  expect(judgedIn(AT, 'const at = "/tmpdir"\n', SHADOW)).toEqual([])
})

test("a relative path of that name is let through, sitting under whatever holds it", () => {
  expect(judgedIn(AT, 'const at = "tmp/held"\n', SHADOW)).toEqual([])
  expect(judgedIn(AT, 'const at = "./tmp"\n', SHADOW)).toEqual([])
})

test("a backtick literal carrying no substitution is judged as any other literal", () => {
  expect(judgedIn(AT, "const at = `/tmp/held`\n", SHADOW)).toHaveLength(1)
  expect(judgedIn(AT, "const at = `/var/tmp/held`\n", SHADOW)).toEqual([])
})

test("a template whose head begins the path is refused", () => {
  expect(judgedIn(AT, "const at = `/tmp/${one}`\n", SHADOW)).toHaveLength(1)
})

test("text after a substitution begins no path and is passed over", () => {
  expect(judgedIn(AT, "const at = `${root}/tmp/held`\n", SHADOW)).toEqual([])
})

test("taking `tmpdir` from `node:os` is refused, and the reason names the line", () => {
  const said = judgedIn(AT, 'import { tmpdir } from "node:os"\n', SHADOW)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1")
  expect(said[0]).toContain("`tmpdir`")
})

test("taking it under another name is still taking it", () => {
  expect(judgedIn(AT, 'import { tmpdir as held } from "node:os"\n', SHADOW)).toHaveLength(1)
})

test("the module named without its prefix is the same module", () => {
  expect(judgedIn(AT, 'import { tmpdir } from "os"\n', SHADOW)).toHaveLength(1)
})

test("reaching it through a namespace the module is bound to is refused", () => {
  const body = 'import * as os from "node:os"\nconst at = os.tmpdir()\n'
  const said = judgedIn(AT, body, SHADOW)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`os.tmpdir`")
  expect(said[0]).toContain("line 2")
})

test("reaching it through a default binding of the module is refused", () => {
  const body = 'import os from "node:os"\nconst at = os.tmpdir()\n'
  expect(judgedIn(AT, body, SHADOW)).toHaveLength(1)
})

test("something else of that name, bound to no module of ours, is let through", () => {
  expect(judgedIn(AT, 'import { tmpdir } from "./held.ts"\n', SHADOW)).toEqual([])
  expect(judgedIn(AT, "const at = held.tmpdir()\n", SHADOW)).toEqual([])
})

test("every reach a file makes is reported, not only the first", () => {
  const body = 'import { tmpdir } from "node:os"\nconst a = "/tmp"\nconst b = "/tmp/held"\n'
  expect(judgedIn(AT, body, SHADOW)).toHaveLength(3)
})

test("the check refuses none of its own three files, though each names the path it refuses", () => {
  for (const one of OWN) {
    const body = readFileSync(join(HERE, one), "utf8")
    expect(body).toMatch(/\/tmp/)
    expect(judgedIn(`akasha/checks-system/code-check/no-tmp/${one}`, body, SHADOW)).toEqual([])
  }
})

test("a file no page claims is not let through by anything", () => {
  const root = rooted({ [CODE_AT]: SPELLING })
  expect(allowedIn("akasha/one/nobody.module.code.ts", shadowAt(root))).toBe(false)
})

test("a page saying its paths are a container's lets the files beside it through", () => {
  const root = rooted({ [CODE_AT]: SPELLING }, "akasha-no-tmp-allowed-", true)
  expect(allowedIn(CODE_AT, shadowAt(root))).toBe(true)
})

test("a page saying nothing of the sort leaves the files beside it judged", () => {
  const root = rooted({ [CODE_AT]: SPELLING })
  expect(allowedIn(CODE_AT, shadowAt(root))).toBe(false)
})
