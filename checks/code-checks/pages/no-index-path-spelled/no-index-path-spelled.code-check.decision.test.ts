import { afterAll, expect, test } from "bun:test"
import { indexesAt } from "akasha/checks/code-checks/pages/no-index-path-spelled/no-index-path-spelled.code-check.decision.code.ts"
import {
  AT,
  HELD,
  INDEXES,
  OWNED,
  PAGE,
  reasonsIn,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/no-index-path-spelled/no-index-path-spelled.code-check.decision.test-fixtures.ts"
import { shadowAt } from "akasha/pages/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("a body spelling a path into the index is refused", () => {
  const said = reasonsIn(HELD, `const at = "${AT}/identity/check/slug"\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("spells a path into the index")
})

test("the indexes folder is where the index's place is said, so it is passed over", () => {
  expect(reasonsIn(OWNED, `const INDEX_AT = "${AT}"\n`)).toEqual([])
})

test("asking the indexes folder for the path leaves nothing to refuse", () => {
  const body = 'import { indexIn } from "../a.ts"\nconst at = indexIn(root)\n'
  expect(reasonsIn(HELD, body)).toEqual([])
})

test("the guarded root is not the index, so a guard naming `.git/data` is let through", () => {
  const body = 'const INDEX = join(".git", "data")\nconst bound = "`.git/data` is refused here."\n'
  expect(reasonsIn(HELD, body)).toEqual([])
})

test("each spelling is named on its own", () => {
  const said = reasonsIn(HELD, `const a = "${AT}/path"\nconst b = "${AT}/import"\n`)
  expect(said).toHaveLength(2)
})

test("a long string carrying the path is shortened where the refusal names it", () => {
  const why = `nothing at all is under ${AT}/identity/page/id, so the index answered nothing`
  const said = reasonsIn(HELD, `const why = "${why}"\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("…")
})

test("a page asks the index nothing, so a page is passed over", () => {
  const body = `export const held = {\n  evidence: "measured at ${AT}/identity/module/slug",\n}\n`
  expect(reasonsIn(PAGE, body)).toEqual([])
})

test("a file beside a page is judged, so the page alone is passed over", () => {
  expect(reasonsIn(HELD, `const at = "${AT}/identity/module/slug"\n`)).toHaveLength(1)
})

test("where the indexes folder sits is read from the index rather than spelt here", () => {
  expect(indexesAt(shadowAt(rooted({})))).toBe(INDEXES)
})
