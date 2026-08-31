import { expect, test } from "bun:test"
import { indexNamed } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { bodiesIn } from "../../../testing-system/bodying/bodying.module.code.ts"
import { reasonsIn } from "./no-index-path-spelled.check.code.ts"

const ROOT = "/repo"

const given = bodiesIn(ROOT)

const AT = indexNamed()

const HELD = "akasha/command-system/held.module.code.ts"

const OWNED = "akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"

test("a body spelling a path into the index is refused", () => {
  const said = reasonsIn(given(HELD, `const at = "${AT}/identity/check/slug"\n`))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("spells a path into the index")
})

test("the indexes folder is where the index's place is said, so it is passed over", () => {
  expect(reasonsIn(given(OWNED, `const INDEX_AT = "${AT}"\n`))).toEqual([])
})

test("a path built segment by segment is seen as the path it builds", () => {
  const said = reasonsIn(given(HELD, 'const at = join(".git", "data", "index")\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("segment by segment")
})

test("asking the indexes folder for the path leaves nothing to refuse", () => {
  const body = 'import { indexIn } from "../a.ts"\nconst at = indexIn(root)\n'
  expect(reasonsIn(given(HELD, body))).toEqual([])
})

test("the guarded root is not the index, so a guard naming `.git/data` stands", () => {
  const body = 'const INDEX = join(".git", "data")\nconst bound = "`.git/data` is refused here."\n'
  expect(reasonsIn(given(HELD, body))).toEqual([])
})

test("segments that do not begin at the index are not read as one path", () => {
  expect(reasonsIn(given(HELD, 'const said = ["a note", ".git", "data"]\n'))).toEqual([])
})

test("each spelling is named on its own", () => {
  const said = reasonsIn(given(HELD, `const a = "${AT}/path"\nconst b = "${AT}/import"\n`))
  expect(said).toHaveLength(2)
})

test("a long string carrying the path is shortened where the refusal names it", () => {
  const why = `nothing at all stands under ${AT}/identity/page/id, so the index answered nothing`
  const said = reasonsIn(given(HELD, `const why = "${why}"\n`))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("…")
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", `held at ${AT}\n`))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  expect(reasonsIn({ root: ROOT, path: HELD, bytes: new Uint8Array([0xff, 0xfe, 0x00]) })).toEqual(
    []
  )
})
