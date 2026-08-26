import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Number", () => {
  it("coerces numeric strings, booleans, and empty string per ToNumber", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_numeric = ____lualib.__TS__Number("42")
        result_true = ____lualib.__TS__Number(true)
        result_false = ____lualib.__TS__Number(false)
        result_empty = ____lualib.__TS__Number("")
        result_passthrough = ____lualib.__TS__Number(7)
      `)
      expect(vm.get("result_numeric")).toBe(42)
      expect(vm.get("result_true")).toBe(1)
      expect(vm.get("result_false")).toBe(0)
      expect(vm.get("result_empty")).toBe(0)
      expect(vm.get("result_passthrough")).toBe(7)
    })
  })

  it('returns NaN for non-numeric strings ("abc" → NaN)', async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local r = ____lualib.__TS__Number("abc")
        result_is_nan = (r ~= r)
      `)
      expect(vm.get("result_is_nan")).toBe(true)
    })
  })

  it('parses "Infinity" and "-Infinity" string forms', async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_inf = ____lualib.__TS__Number("Infinity")
        result_neg_inf = ____lualib.__TS__Number("-Infinity")
      `)
      expect(vm.get("result_inf")).toBe(Number.POSITIVE_INFINITY)
      expect(vm.get("result_neg_inf")).toBe(Number.NEGATIVE_INFINITY)
    })
  })
})
