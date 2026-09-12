import { expect, test } from "bun:test"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  namedIn,
  sweptWith,
  takenIn,
} from "akasha/commands/modules/beside-sweeping/beside-sweeping.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE = "one/one.module.ts"

const UNCOMMITTED = "one/one.module.uncommitted.ts"

const ENTRIES = "one/one.module.entries.uncommitted.jsonl"

const CODE = "one/one.module.code.ts"

const VALUE: Value = { type: "module", slug: "one" }

const TAKES_PAGE: FileChange = { kind: "remove", path: PAGE }

const TAKES_CODE: FileChange = { kind: "remove", path: CODE }

const TAKES_UNCOMMITTED: FileChange = { kind: "remove", path: UNCOMMITTED }

const CARRIES_CODE: FileChange = { kind: "move", pathFrom: CODE, pathTo: ENTRIES }

const CARRIES_PAGE: FileChange = { kind: "move", pathFrom: PAGE, pathTo: "two/two.module.ts" }

function swept(
  changes: readonly FileChange[],
  pages: Record<string, Value> = { [PAGE]: VALUE },
  beside: readonly string[] = [PAGE, CODE, UNCOMMITTED, ENTRIES]
): readonly string[] {
  return sweptWith(
    changes,
    (at) => pages[at] ?? null,
    () => () => beside
  ).map((one) => (one.kind === "remove" ? one.path : ""))
}

test("only the paths a change takes away are read as pages", () => {
  expect(takenIn([TAKES_PAGE, CARRIES_CODE])).toEqual([PAGE])
})

test("every path a change names is named", () => {
  expect([...namedIn([TAKES_PAGE, CARRIES_CODE])]).toEqual([PAGE, CODE, ENTRIES])
})

test("the uncommitted files beside a page taken away are swept", () => {
  expect(swept([TAKES_PAGE])).toEqual([UNCOMMITTED, ENTRIES])
})

test("a file beside the page that is committed is swept by nothing", () => {
  expect(swept([TAKES_PAGE])).not.toContain(CODE)
})

test("a page carried off by a move is swept by nothing", () => {
  expect(swept([CARRIES_PAGE])).toEqual([])
})

test("a path that is no page has nothing swept beside it", () => {
  expect(swept([TAKES_CODE])).toEqual([])
})

test("a file the change already names is swept by nothing", () => {
  expect(swept([TAKES_PAGE, TAKES_UNCOMMITTED])).toEqual([ENTRIES])
})

test("a change taking no page away reads no page", () => {
  let asked = 0
  sweptWith(
    [{ kind: "add", path: CODE, content: "" }],
    () => null,
    () => {
      asked += 1
      return () => []
    }
  )
  expect(asked).toBe(0)
})

test("a file beside two pages taken away is swept once", () => {
  expect(swept([TAKES_PAGE, TAKES_CODE], { [PAGE]: VALUE, [CODE]: VALUE })).toEqual([
    UNCOMMITTED,
    ENTRIES,
  ])
})
