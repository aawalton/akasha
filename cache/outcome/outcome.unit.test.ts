import { describe, expect, test } from "bun:test"
import { closureOf } from "../closure/closure.ts"
import { entryOf } from "./outcome.ts"
import { KEEPS_NOTHING } from "../../graph/build-context/build-context.ts"
import { checksFound } from "../../checks-system/checks.ts"
import { AKASHA, rootsHere } from "../../repo/roots/roots.ts"
import { oidsUnder } from "../../repo/oid/oid.ts"

const root = rootsHere()[AKASHA] ?? ""

const oids = oidsUnder(root, null)

const ctx = { roots: { [AKASHA]: root }, said: KEEPS_NOTHING }

/**
 * Where an outcome's mark is taken from.
 *
 * A CLOSURE OF NO FILES HASHES TO A MARK THAT NEVER MOVES, so a check whose entry names nothing
 * holds its outcomes past every edit to the code that reached them, and reads exactly like one
 * whose code has not changed. `entryOf` named `checks/check/{slug}/{slug}.ts` for months after the
 * checks folder took its domain's name, and every check's mark was that one constant.
 */
describe("an outcome is marked by the code that reached it", () => {
  const checks = checksFound(root)

  test("there are checks registered to ask this of", () => {
    expect(checks.length).toBeGreaterThan(0)
  })

  test("every check's entry names a file the graph reaches", () => {
    const empty = checks.filter((one) => closureOf(ctx, entryOf(one.slug), oids).length === 0)
    expect(empty.map((one) => one.slug)).toEqual([])
  })
})
