import { expect, test } from "bun:test"
import {
  couldTurn,
  generateChange,
  rowsIn,
} from "akasha/code/workspace/change-generators/lockfile-making/lockfile-making.change-generator.code.ts"
import { NOTHING_LOCKED } from "akasha/code/workspace/modules/manifest-locking/manifest-locking.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const BYTES = new TextEncoder()

function changing(
  before: Readonly<Record<string, string>>,
  after: Readonly<Record<string, string | null>>
): Change {
  return {
    root: "/",
    changed: Object.keys(after).sort(),
    before: (path) => (path in before ? BYTES.encode(before[path] as string) : null),
    after: (path) => {
      const said = after[path]
      return said === undefined || said === null ? null : BYTES.encode(said)
    },
  }
}

test("the manifests and lockfile a change turns are read as rows, and nothing else is", () => {
  const change = changing(
    { "a/package.json": "{}", "gone/package.json": "{}", "same/package.json": "{}" },
    {
      "a/package.json": '{"name":"a"}',
      "b/package.json": "{}",
      "gone/package.json": null,
      "same/package.json": "{}",
      "a/held.ts": "",
      "bun.lock": "{}",
    }
  )

  expect(rowsIn(change)).toEqual([
    { kind: "replace", path: "a/package.json", contentFrom: "{}", contentTo: '{"name":"a"}' },
    { kind: "add", path: "b/package.json", content: "{}" },
    { kind: "add", path: "bun.lock", content: "{}" },
    { kind: "remove", path: "gone/package.json" },
  ])
})

test("a change turning no manifest or lockfile could not turn this", () => {
  expect(couldTurn(changing({}, { "a/held.ts": "" }))).toBe(false)
  expect(couldTurn(changing({}, { "package.json": "{}" }))).toBe(true)
})

test("a change naming no base commit is left alone", () => {
  expect(generateChange(changing({}, { "package.json": "{}" }))).toEqual(NOTHING_LOCKED)
})
