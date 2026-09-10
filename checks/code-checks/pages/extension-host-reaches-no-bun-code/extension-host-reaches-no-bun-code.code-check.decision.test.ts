import { expect, test } from "bun:test"
import { refusalsOver } from "./extension-host-reaches-no-bun-code.code-check.decision.code.ts"
import {
  change,
  ENTRY,
  FAR,
  hosted,
  NEXT,
  NOTICED,
  PACKAGED,
  PACKAGED_BODY,
  pathsRefused,
  refused,
} from "./extension-host-reaches-no-bun-code.code-check.decision.test-fixtures.ts"

const READS_NEXT = 'import { next } from "./next.module.code.ts"\n\nexport const one = next\n'

test("a graph the host loads that reaches no bun is let through", () => {
  expect(pathsRefused({ [ENTRY]: READS_NEXT, [NEXT]: "export const next = 2\n" })).toEqual([])
})

test("a file the host loads that names a bun module is refused", () => {
  expect(
    pathsRefused({ [ENTRY]: READS_NEXT, [NEXT]: 'import { dlopen } from "bun:ffi"\n' })
  ).toEqual([NEXT])
})

test("a file the host loads that reads the Bun global is refused", () => {
  expect(pathsRefused({ [ENTRY]: READS_NEXT, [NEXT]: "export const it = Bun.version\n" })).toEqual([
    NEXT,
  ])
})

test("a file reached only by a type-only import is no part of what the host loads", () => {
  const reads = 'import type { Next } from "./next.module.code.ts"\n\nexport type One = Next\n'
  expect(pathsRefused({ [ENTRY]: reads, [NEXT]: 'import "bun:ffi"\n' })).toEqual([])
})

test("a named element marked type does not carry the file it came from", () => {
  const reads = 'import { type Next } from "./next.module.code.ts"\n\nexport type One = Next\n'
  expect(pathsRefused({ [ENTRY]: reads, [NEXT]: 'import "bun:ffi"\n' })).toEqual([])
})

test("a file the host reaches by a dynamic import is judged", () => {
  const reads = 'export const one = async () => await import("./next.module.code.ts")\n'
  expect(pathsRefused({ [ENTRY]: reads, [NEXT]: 'import "bun:ffi"\n' })).toEqual([NEXT])
})

test("a specifier naming a package lands where that package's manifest says", () => {
  const reads = 'import { notices } from "@akasha/seat-system/compose-notices"\n'
  const said = pathsRefused({
    [ENTRY]: reads,
    [PACKAGED]: PACKAGED_BODY,
    [NOTICED]: "export const notices = Bun.version\n",
  })
  expect(said).toEqual([NOTICED])
})

test("a refusal names the files the host reaches the refused file from", () => {
  const said = refused({
    [ENTRY]: READS_NEXT,
    [NEXT]: 'import { far } from "../../../utils/far/far.module.code.ts"\n',
    [FAR]: 'import "bun:sqlite"\n',
  })
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("bun:sqlite")
  expect(said[0]?.reason).toContain(NEXT)
  expect(said[0]?.reason).toContain(ENTRY)
})

test("the entry itself is judged, holding nothing it was reached from", () => {
  const said = refused({ [ENTRY]: 'import "bun:ffi"\n' })
  expect(said[0]?.reason).toContain("its own entry")
})

test("a manifest naming no entry is refused rather than passed", () => {
  const held = change({ [ENTRY]: 'import "bun:ffi"\n' })
  expect(refusalsOver(held, held.changed).map((one) => one.reason)).toEqual([
    "this names no entry, so what the host loads is unknown",
  ])
})

test("a specifier landing on nothing is passed over", () => {
  const reads = 'import { gone } from "./gone.module.code.ts"\n'
  expect(refusalsOver(hosted({ [ENTRY]: reads }), [])).toEqual([])
})
