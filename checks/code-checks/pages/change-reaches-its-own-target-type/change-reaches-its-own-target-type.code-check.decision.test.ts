import { afterAll, expect, test } from "bun:test"
import { refusalsOver } from "akasha/checks/code-checks/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.code-check.decision.code.ts"
import {
  ALSO_CROSS,
  AT,
  BUILT,
  BUILT_TABLE,
  CODE_AT,
  CONSTED,
  CROSS,
  KNOB,
  LEVER,
  NOWHERE,
  over,
  pageBodyIn,
  QUIET,
  reaching,
  rooted,
  SAME,
  SPIN,
  scratch,
  TABLED,
  TAP,
} from "akasha/checks/code-checks/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowed } from "akasha/checks/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

function judged(root: string, bodies: Readonly<Record<string, string | null>>): readonly Judged[] {
  const change = over(root, bodies)
  return refusalsOver(change, shadowed(change))
}

function coding(root: string, said: readonly string[]): readonly Judged[] {
  return judged(root, { [CODE_AT]: reaching(said) })
}

test("a change reaching a change acting on the same target type is let through", () => {
  expect(coding(rooted(), [SAME])).toEqual([])
})

test("a change reaching another target type is refused, and the refusal names both", () => {
  const said = coding(rooted(), [CROSS])

  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(AT)
  expect(said[0]?.reason).toContain(`\`${CROSS}\``)
  expect(said[0]?.reason).toContain(`\`${KNOB}\``)
  expect(said[0]?.reason).toContain(`\`${LEVER}\``)
  expect(said[0]?.reason).toContain(`\`${TAP}\``)
  expect(said[0]?.reason).toContain(`\`${SPIN}\``)
})

test("one body naming two addresses reaching across is refused once for each", () => {
  expect(coding(rooted(), [CROSS, ALSO_CROSS])).toHaveLength(2)
})

test("one address spelled twice in a body is refused once", () => {
  expect(coding(rooted(), [CROSS, CROSS])).toHaveLength(1)
})

test("an address naming no page is let through", () => {
  expect(coding(rooted(), [NOWHERE])).toEqual([])
})

test("a change reaching nothing is let through", () => {
  expect(judged(rooted(), { [CODE_AT]: QUIET })).toEqual([])
})

test("an address spelled through a const the body declares is read as written letters", () => {
  const said = judged(rooted(), { [CODE_AT]: CONSTED })

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain(`\`${CROSS}\``)
})

test("an address built out of something other than written letters is refused", () => {
  const said = judged(rooted(), { [CODE_AT]: BUILT })

  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(AT)
  expect(said[0]?.reason).toContain("written letters")
})

test("every address a const table of written letters holds is read and judged", () => {
  const said = judged(rooted(), { [CODE_AT]: TABLED })

  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(AT)
  expect(said[0]?.reason).toContain(`\`${CROSS}\``)
})

test("a table holding a value built as the body runs is refused", () => {
  const said = judged(rooted(), { [CODE_AT]: BUILT_TABLE })

  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(AT)
  expect(said[0]?.reason).toContain("written letters")
})

test("a change whose page the landing takes away is not judged", () => {
  expect(judged(rooted(), { [AT]: null, [CODE_AT]: reaching([CROSS]) })).toEqual([])
})

test("a change carrying its page alone is judged by the code beside that page", () => {
  const root = rooted()

  expect(judged(root, { [AT]: pageBodyIn(root) })).toHaveLength(1)
})
