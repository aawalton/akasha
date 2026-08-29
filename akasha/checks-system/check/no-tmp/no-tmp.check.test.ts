import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { reasonsIn } from "./no-tmp.check.code.ts"

const ROOT = "/repo"

const AT = "akasha/held.ts"

const HERE = dirname(import.meta.path)

const OWN: readonly string[] = ["no-tmp.check.ts", "no-tmp.check.code.ts", "no-tmp.check.test.ts"]

function given(at: string, body: string) {
  return { root: ROOT, path: at, bytes: new TextEncoder().encode(body) }
}

test("a file reaching for no scratch at all is let through", () => {
  expect(reasonsIn(given(AT, "export function one(): number {\n  return 1\n}\n"))).toEqual([])
})

test("a literal that is exactly the scratch root we refuse is refused, and the line is named", () => {
  const said = reasonsIn(given(AT, '\nconst at = "/tmp"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toMatch(/\/tmp/)
})

test("a literal standing under it is refused", () => {
  expect(reasonsIn(given(AT, 'const at = "/tmp/held"\n'))).toHaveLength(1)
})

test("the scratch root we keep is let through, being its own path from the first character", () => {
  expect(reasonsIn(given(AT, 'const at = "/var/tmp"\n'))).toEqual([])
  expect(reasonsIn(given(AT, 'const at = "/var/tmp/held"\n'))).toEqual([])
})

test("a path merely beginning with those letters is let through, the part read being whole", () => {
  expect(reasonsIn(given(AT, 'const at = "/tmpfiles/held"\n'))).toEqual([])
  expect(reasonsIn(given(AT, 'const at = "/tmpdir"\n'))).toEqual([])
})

test("a relative path of that name is let through, standing under whatever holds it", () => {
  expect(reasonsIn(given(AT, 'const at = "tmp/held"\n'))).toEqual([])
  expect(reasonsIn(given(AT, 'const at = "./tmp"\n'))).toEqual([])
})

test("a backtick literal carrying no substitution is judged as any other literal", () => {
  expect(reasonsIn(given(AT, "const at = `/tmp/held`\n"))).toHaveLength(1)
  expect(reasonsIn(given(AT, "const at = `/var/tmp/held`\n"))).toEqual([])
})

test("a template whose head begins the path is refused", () => {
  expect(reasonsIn(given(AT, "const at = `/tmp/${one}`\n"))).toHaveLength(1)
})

test("text standing after a substitution begins no path and is passed over", () => {
  expect(reasonsIn(given(AT, "const at = `${root}/tmp/held`\n"))).toEqual([])
})

test("taking `tmpdir` from `node:os` is refused, and the reason names the line", () => {
  const said = reasonsIn(given(AT, 'import { tmpdir } from "node:os"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1")
  expect(said[0]).toContain("`tmpdir`")
})

test("taking it under another name is still taking it", () => {
  expect(reasonsIn(given(AT, 'import { tmpdir as held } from "node:os"\n'))).toHaveLength(1)
})

test("the module named without its prefix is the same module", () => {
  expect(reasonsIn(given(AT, 'import { tmpdir } from "os"\n'))).toHaveLength(1)
})

test("reaching it through a namespace the module is bound to is refused", () => {
  const said = reasonsIn(given(AT, 'import * as os from "node:os"\nconst at = os.tmpdir()\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`os.tmpdir`")
  expect(said[0]).toContain("line 2")
})

test("reaching it through a default binding of the module is refused", () => {
  expect(reasonsIn(given(AT, 'import os from "node:os"\nconst at = os.tmpdir()\n'))).toHaveLength(1)
})

test("something else of that name, bound to no module of ours, is let through", () => {
  expect(reasonsIn(given(AT, 'import { tmpdir } from "./held.ts"\n'))).toEqual([])
  expect(reasonsIn(given(AT, "const at = held.tmpdir()\n"))).toEqual([])
})

test("every reach a file makes is reported, not only the first", () => {
  const body = 'import { tmpdir } from "node:os"\nconst a = "/tmp"\nconst b = "/tmp/held"\n'
  expect(reasonsIn(given(AT, body))).toHaveLength(3)
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", 'const at = "/tmp"\n'))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(reasonsIn(held)).toEqual([])
})

test("the check refuses none of its own three files, though each names the path it refuses", () => {
  for (const one of OWN) {
    const body = readFileSync(join(HERE, one), "utf8")
    expect(body).toMatch(/\/tmp/)
    expect(reasonsIn(given(`akasha/checks-system/check/no-tmp/${one}`, body))).toEqual([])
  }
})
