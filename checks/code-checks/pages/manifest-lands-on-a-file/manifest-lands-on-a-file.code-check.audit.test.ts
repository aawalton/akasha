import { afterAll, expect, test } from "bun:test"
import { askingAt, manifestLandsOnAFile } from "./manifest-lands-on-a-file.code-check.audit.code.ts"
import {
  AT,
  EXPORTS,
  HELD,
  MANIFEST_AT,
  manifest,
  rooted,
  scratch,
  wrote,
} from "./manifest-lands-on-a-file.code-check.decision.test-fixtures.ts"

const UNDER = "akasha-manifest-audit-"

afterAll(scratch.sweep)

test("an audit judges every manifest the index names, no change naming one of them", () => {
  const root = wrote(rooted(UNDER), { [MANIFEST_AT]: manifest({ exports: EXPORTS }) })

  const said = manifestLandsOnAFile(root)

  expect(said.map((one) => one.path)).toEqual([MANIFEST_AT])
  expect(said[0]?.reason).toContain(AT)
})

test("an audit lets through a tree where every way in lands on a file", () => {
  const root = wrote(rooted(UNDER), {
    [MANIFEST_AT]: manifest({ exports: EXPORTS }),
    [AT]: HELD,
  })

  expect(manifestLandsOnAFile(root)).toEqual([])
})

test("what the audit asks reads a body from the disk, there being no change", () => {
  const root = wrote(rooted(UNDER), { [AT]: HELD })

  expect(askingAt(root).textAt(AT)).toBe(HELD)
  expect(askingAt(root).there(AT)).toBe(true)
  expect(askingAt(root).textAt(MANIFEST_AT)).toBe(null)
})
