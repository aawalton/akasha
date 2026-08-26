import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__NumberIsFinite", () => {
  it("returns true for finite numbers, false for Infinity/-Infinity/NaN", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_one = ____lualib.__TS__NumberIsFinite(1)
        result_zero = ____lualib.__TS__NumberIsFinite(0)
        result_neg = ____lualib.__TS__NumberIsFinite(-3.14)
        result_inf = ____lualib.__TS__NumberIsFinite(1/0)
        result_neg_inf = ____lualib.__TS__NumberIsFinite(-1/0)
        result_nan = ____lualib.__TS__NumberIsFinite(0/0)
      `)
      expect(vm.get("result_one")).toBe(true)
      expect(vm.get("result_zero")).toBe(true)
      expect(vm.get("result_neg")).toBe(true)
      expect(vm.get("result_inf")).toBe(false)
      expect(vm.get("result_neg_inf")).toBe(false)
      expect(vm.get("result_nan")).toBe(false)
    })
  })

  it("does not coerce strings (returns false for numeric strings, unlike global isFinite)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_string = ____lualib.__TS__NumberIsFinite("1")
      `)
      expect(vm.get("result_string")).toBe(false)
    })
  })
})
