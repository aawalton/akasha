import { expect, test } from "bun:test"
import { bodiesIn } from "../../../testing-system/bodying/bodying.module.code.ts"
import { reasonsIn } from "./index-asked-not-reached.check.code.ts"

const ROOT = "/repo"

const given = bodiesIn(ROOT)

const HELD = "akasha/command-system/held/held.module.code.ts"

const READING = "../../pages-system/indexes/index-reading/index-reading.module.code.ts"

test("taking a path into the index is refused, and names what was taken", () => {
  const said = reasonsIn(given(HELD, `import { indexIn } from "${READING}"\n`))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`indexIn`")
  expect(said[0]).toContain("hands back a path into the index")
})

test("asking the index a question is what this leaves standing", () => {
  const body = `import { everyOfType, standingById } from "${READING}"\n`
  expect(reasonsIn(given(HELD, body))).toEqual([])
})

test("a raw read of the index is refused as a path is", () => {
  const at = "../../pages-system/indexes/index-surface/index-surface.module.code.ts"
  const said = reasonsIn(given(HELD, `import { readingAt } from "${at}"\n`))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`readingAt`")
})

test("the indexes folder is where these are for, so it is passed over", () => {
  const at = "akasha/pages-system/indexes/index-shadow/index-shadow.module.code.ts"
  expect(reasonsIn(given(at, 'import { indexIn } from "../index-reading/x.ts"\n'))).toEqual([])
})

test("a name of the same spelling taken from elsewhere is not this check's business", () => {
  const body = 'import { indexIn } from "../../held/held.module.code.ts"\n'
  expect(reasonsIn(given(HELD, body))).toEqual([])
})

test("each name taken in one import is named on its own", () => {
  const said = reasonsIn(given(HELD, `import { indexAt, indexIn } from "${READING}"\n`))
  expect(said).toHaveLength(2)
})

test("a name brought in under another is judged by what it was taken as", () => {
  const said = reasonsIn(given(HELD, `import { indexIn as held } from "${READING}"\n`))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`indexIn`")
})

test("a body that is not text is passed over rather than refused", () => {
  expect(reasonsIn({ root: ROOT, path: HELD, bytes: new Uint8Array([0xff, 0x00]) })).toEqual([])
})
