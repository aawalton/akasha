import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__MathTrunc", () => {
  it("truncates toward zero for positive and negative fractions", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_pos = ____lualib.__TS__MathTrunc(1.7)
        result_pos_small = ____lualib.__TS__MathTrunc(0.999)
        result_neg = ____lualib.__TS__MathTrunc(-1.7)
        result_neg_small = ____lualib.__TS__MathTrunc(-0.999)
      `)
      expect(vm.get("result_pos")).toBe(1)
      expect(vm.get("result_pos_small")).toBe(0)
      expect(vm.get("result_neg")).toBe(-1)
      expect(vm.get("result_neg_small") === 0).toBe(true)
    })
  })

  it("returns integer inputs and zero unchanged", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_int = ____lualib.__TS__MathTrunc(5)
        result_zero = ____lualib.__TS__MathTrunc(0)
      `)
      expect(vm.get("result_int")).toBe(5)
      expect(vm.get("result_zero")).toBe(0)
    })
  })
})
