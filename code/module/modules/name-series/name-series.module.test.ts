import { expect, test } from "bun:test"
import { partsRewritten } from "akasha/code/module/modules/name-series/name-series.module.code.ts"

const RUN = /^run-\d\d$/

function isShard(slug: string): boolean {
  return slug === "run" || RUN.test(slug)
}

function ownerWith(parts: readonly string[]): string {
  return [
    'import type { Domain } from "akasha/domain/domain.page-type.types.ts"',
    "",
    "export const owner = {",
    '  id: "01a00000-0000-7000-8000-000000000000",',
    '  type: "page-type/domain",',
    '  slug: "owner",',
    "  parts: [",
    ...parts.map((one) => (one === "" ? "" : `    "${one}",`)),
    "  ],",
    '  definition: "a page owning runs",',
    "} as const satisfies Domain",
    "",
  ].join("\n")
}

test("a run that grows writes every shard it filled into parts", () => {
  const was = ownerWith(["module/alpha", "module/run", "module/run-00", "module/zeta"])
  expect(partsRewritten(was, isShard, ["run", "run-00", "run-01"])).toBe(
    ownerWith(["module/alpha", "module/run", "module/run-00", "module/run-01", "module/zeta"])
  )
})

test("a run that shrinks takes every shard it did not fill out of parts", () => {
  const was = ownerWith(["module/run", "module/run-00", "module/run-01", "module/run-02"])
  expect(partsRewritten(was, isShard, ["run", "run-00"])).toBe(
    ownerWith(["module/run", "module/run-00"])
  )
})

test("a part naming no shard keeps its place", () => {
  const was = ownerWith([
    "module/alpha",
    "module/run-00",
    "",
    "module/run-01",
    "data-table/run-02",
    "module/omega",
  ])
  expect(partsRewritten(was, isShard, ["run-00"])).toBe(
    ownerWith(["module/alpha", "module/run-00", "", "data-table/run-02", "module/omega"])
  )
})

test("shards filled are written after the last part where no shard was named", () => {
  const was = ownerWith(["module/alpha", "module/omega"])
  expect(partsRewritten(was, isShard, ["run-01", "run", "run-00"])).toBe(
    ownerWith(["module/alpha", "module/omega", "module/run", "module/run-00", "module/run-01"])
  )
})

test("a shard named bare is read as that shard", () => {
  const was = ownerWith(["run-00", "module/omega"])
  expect(partsRewritten(was, isShard, ["run-00"])).toBe(
    ownerWith(["module/run-00", "module/omega"])
  )
})

test("a page already naming exactly the shards filled is answered as it was", () => {
  const was = ownerWith(["module/alpha", "module/run", "module/run-00"])
  expect(partsRewritten(was, isShard, ["run-00", "run"])).toBe(was)
})

test("a page stating no parts over many lines is refused", () => {
  const was = ownerWith([]).replace("  parts: [\n  ],\n", "")
  expect(() => partsRewritten(was, isShard, ["run-00"])).toThrow("`parts`")
})
