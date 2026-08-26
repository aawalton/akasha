import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__MathSign", () => {
  it("returns 1 for positive, -1 for negative, 0 for zero", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_pos = ____lualib.__TS__MathSign(1)
        result_pos_big = ____lualib.__TS__MathSign(123.45)
        result_neg = ____lualib.__TS__MathSign(-5)
        result_zero = ____lualib.__TS__MathSign(0)
      `)
      expect(vm.get("result_pos")).toBe(1)
      expect(vm.get("result_pos_big")).toBe(1)
      expect(vm.get("result_neg")).toBe(-1)
      expect(vm.get("result_zero")).toBe(0)
    })
  })

  it("returns NaN when given NaN", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local r = ____lualib.__TS__MathSign(0/0)
        result_is_nan = (r ~= r)
      `)
      expect(vm.get("result_is_nan")).toBe(true)
    })
  })
})
