import { expect, test } from "bun:test"
import { proseSetAside } from "akasha/page/ui/component/modules/position-fraction/position-fraction.module.code.ts"

test("the prose is set aside while the panels are shown in its place", () => {
  expect(proseSetAside({ panelsShown: "" })).toBe(true)
})

test("the prose is read where no panels are shown in its place", () => {
  expect(proseSetAside({})).toBe(false)
})
