import { expect, test } from "bun:test"
import {
  carriedIn,
  judgedAcross,
  type Placed,
  type Saying,
} from "akasha/check/modules/tool-faults/tool-faults.module.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  change,
  gone,
  landing,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

const AWAY = "/held"

const ONE = "akasha/one.held"

const TWO = "akasha/two.held"

const UNLOOKED = "Nothing was judged."

function heldNamed(path: string): boolean {
  return path.endsWith(".held")
}

const SAYING: Saying<Placed> = {
  reasonOf: (one) => `at ${one.line}:${one.column}`,
  unlooked: UNLOOKED,
}

function at(path: string, line: number, column: number): Placed {
  return { path, line, column }
}

test("the files handed on are the ones of the kind the change carries, said once and in order", () => {
  const held = landing(AWAY, {
    [TWO]: bytesOf("two"),
    [ONE]: bytesOf("one"),
    "akasha/held.md": bytesOf("held"),
  })
  expect(carriedIn(held, heldNamed)).toEqual([ONE, TWO])
  const twice = { root: AWAY, changed: [ONE, ONE], before: () => null, after: () => bytesOf("one") }
  expect(carriedIn(twice, heldNamed)).toEqual([ONE])
})

test("a file the change takes away is handed to no tool", () => {
  expect(carriedIn(change(AWAY, [ONE], gone), heldNamed)).toEqual([])
})

test("faults are answered against their own files, in the order they are in the files", () => {
  const found = [at(TWO, 1, 1), at(ONE, 9, 2), at(ONE, 9, 1), at(ONE, 2, 1)]
  const said = judgedAcross({ found, failed: null }, ONE, AWAY, SAYING)
  expect(said.map((one) => `${one.path} ${one.reason}`)).toEqual([
    `${ONE} at 2:1`,
    `${ONE} at 9:1`,
    `${ONE} at 9:2`,
    `${TWO} at 1:1`,
  ])
  expect(said[0]?.threw).toBeUndefined()
})

test("a tool that could not look is unmeasured, against the first file, outside the mirror", () => {
  const looked = { found: [], failed: `nothing is at ${AWAY}/${ONE}, under ${AWAY}` }
  const said = judgedAcross(looked, ONE, AWAY, SAYING)
  expect(said).toEqual([
    {
      path: ONE,
      reason: `nothing is at ${ONE}, under the mirror this change was written into. ${UNLOOKED}`,
      threw: true,
    },
  ])
})
