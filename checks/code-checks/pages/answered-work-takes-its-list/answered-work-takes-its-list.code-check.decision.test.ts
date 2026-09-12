import { expect, test } from "bun:test"
import { reasonsIn } from "akasha/checks/code-checks/pages/answered-work-takes-its-list/answered-work-takes-its-list.code-check.decision.code.ts"
import {
  AT,
  BARE,
  ELSEWHERE,
  given,
  HANDED,
  ROOT,
  TAKING,
} from "akasha/checks/code-checks/pages/answered-work-takes-its-list/answered-work-takes-its-list.code-check.decision.test-fixtures.ts"

test("work taking the list is let through", () => {
  expect(reasonsIn(given(AT, HANDED))).toEqual([])
})

test("work taking no list is refused, and the reason names the line and the call", () => {
  const said = reasonsIn(given(AT, BARE))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("`answering` work taking no list")
})

test("a parameter under another name answers this, the count being what is judged", () => {
  const body = `${TAKING}\nexport const one = answering(async (report) => {\n  return await work(report)\n})\n`
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a parameter the work never reads still answers this, since the list is reachable", () => {
  const body = `${TAKING}\nexport const one = answering(async (done) => {\n  return await work()\n})\n`
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("work written as a function expression is judged as an arrow is", () => {
  const body = `${TAKING}\nexport const one = answering(async function () {\n  return await work()\n})\n`
  expect(reasonsIn(given(AT, body))).toHaveLength(1)
})

test("an alias is judged, the call being found by the name it is taken in under", () => {
  const aliased = `import { answering as running } from "${ELSEWHERE}"\n`
  const body = `${aliased}\nexport const one = running(async () => {\n  return await work()\n})\n`
  const said = reasonsIn(given(AT, body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`running`")
})

test("a file taking nothing in under that name is passed over", () => {
  const body = "export const one = answering(async () => {\n  return await work()\n})\n"
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a name taken in as a type only is no call, so nothing is judged by it", () => {
  const typed = `import type { answering } from "${ELSEWHERE}"\n`
  const body = `${typed}\nexport const one = answering(async () => {\n  return await work()\n})\n`
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("work handed to something else in the same file is passed over", () => {
  const body = `${TAKING}\nexport const one = holding(async () => {\n  return await work()\n})\n`
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a call handed no work at all is passed over rather than refused", () => {
  const body = `${TAKING}\nexport const one = answering()\n`
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("every call a file writes is judged, not only the first", () => {
  const body = `${TAKING}\nconst one = answering(async () => await work())\nconst two = answering(async () => await work())\n`
  expect(reasonsIn(given(AT, body))).toHaveLength(2)
})

test("a file that is not TypeScript is passed over, and a body that is not text refuses", () => {
  expect(reasonsIn(given("akasha/notes.txt", BARE))).toEqual([])
  const raw = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(raw)).toThrow("akasha/raw.ts")
  expect(() => reasonsIn(raw)).toThrow("not valid UTF-8")
})
