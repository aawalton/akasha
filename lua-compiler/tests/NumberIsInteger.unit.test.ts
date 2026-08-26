import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__NumberIsInteger", () => {
  it("returns true for whole numbers and false for fractional numbers", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_one = ____lualib.__TS__NumberIsInteger(1)
        result_neg = ____lualib.__TS__NumberIsInteger(-7)
        result_zero = ____lualib.__TS__NumberIsInteger(0)
        result_frac = ____lualib.__TS__NumberIsInteger(1.5)
      `)
      expect(vm.get("result_one")).toBe(true)
      expect(vm.get("result_neg")).toBe(true)
      expect(vm.get("result_zero")).toBe(true)
      expect(vm.get("result_frac")).toBe(false)
    })
  })

  it("returns false for Infinity, -Infinity, and NaN", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_inf = ____lualib.__TS__NumberIsInteger(1/0)
        result_neg_inf = ____lualib.__TS__NumberIsInteger(-1/0)
        result_nan = ____lualib.__TS__NumberIsInteger(0/0)
      `)
      expect(vm.get("result_inf")).toBe(false)
      expect(vm.get("result_neg_inf")).toBe(false)
      expect(vm.get("result_nan")).toBe(false)
    })
  })
})
