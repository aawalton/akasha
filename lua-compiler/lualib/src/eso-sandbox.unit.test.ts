import { describe, expect, it } from "bun:test"

import {
  ESO_AVAILABLE_COROUTINE,
  ESO_AVAILABLE_DEBUG,
  ESO_AVAILABLE_MATH,
  ESO_AVAILABLE_OS,
  ESO_AVAILABLE_STRING,
  ESO_AVAILABLE_TABLE,
  ESO_AVAILABLE_UTF8,
  ESO_STRIPPED_GLOBALS,
} from "@temper/shared-build-deploy-checks/eso-sandbox.manifest"

type DriftDebug =
  | Exclude<keyof typeof debug, (typeof ESO_AVAILABLE_DEBUG)[number]>
  | Exclude<(typeof ESO_AVAILABLE_DEBUG)[number], keyof typeof debug>
const _assertDebugInSync: [DriftDebug] extends [never] ? true : never = true

type DriftOs =
  | Exclude<keyof typeof os, (typeof ESO_AVAILABLE_OS)[number]>
  | Exclude<(typeof ESO_AVAILABLE_OS)[number], keyof typeof os>
const _assertOsInSync: [DriftOs] extends [never] ? true : never = true

type DriftCoroutine =
  | Exclude<keyof typeof coroutine, (typeof ESO_AVAILABLE_COROUTINE)[number]>
  | Exclude<(typeof ESO_AVAILABLE_COROUTINE)[number], keyof typeof coroutine>
const _assertCoroutineInSync: [DriftCoroutine] extends [never] ? true : never = true

type DriftUtf8 =
  | Exclude<keyof typeof utf8, (typeof ESO_AVAILABLE_UTF8)[number]>
  | Exclude<(typeof ESO_AVAILABLE_UTF8)[number], keyof typeof utf8>
const _assertUtf8InSync: [DriftUtf8] extends [never] ? true : never = true

type DriftString =
  | Exclude<keyof typeof string, (typeof ESO_AVAILABLE_STRING)[number]>
  | Exclude<(typeof ESO_AVAILABLE_STRING)[number], keyof typeof string>
const _assertStringInSync: [DriftString] extends [never] ? true : never = true

type DriftTable =
  | Exclude<keyof typeof table, (typeof ESO_AVAILABLE_TABLE)[number]>
  | Exclude<(typeof ESO_AVAILABLE_TABLE)[number], keyof typeof table>
const _assertTableInSync: [DriftTable] extends [never] ? true : never = true

type DriftMath =
  | Exclude<keyof typeof math, (typeof ESO_AVAILABLE_MATH)[number]>
  | Exclude<(typeof ESO_AVAILABLE_MATH)[number], keyof typeof math>
const _assertMathInSync: [DriftMath] extends [never] ? true : never = true

const _allDriftAssertions = [
  _assertDebugInSync,
  _assertOsInSync,
  _assertCoroutineInSync,
  _assertUtf8InSync,
  _assertStringInSync,
  _assertTableInSync,
  _assertMathInSync,
] as const

describe("eso-sandbox manifest <-> d.ts", () => {
  it("compile-time drift assertions hold for every partial namespace", () => {
    expect(_allDriftAssertions.every((v) => v === true)).toBe(true)
  })

  it("ESO_STRIPPED_GLOBALS contains the load-time crash anchors", () => {
    expect(ESO_STRIPPED_GLOBALS).toContain("dofile")
    expect(ESO_STRIPPED_GLOBALS).toContain("loadfile")
    expect(ESO_STRIPPED_GLOBALS).toContain("rawlen")
  })
})
