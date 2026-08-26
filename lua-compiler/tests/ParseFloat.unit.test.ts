import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ParseFloat", () => {
  it("parses decimal floats and accepts a trailing non-numeric suffix", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_pi = ____lualib.__TS__ParseFloat("3.14")
        result_int = ____lualib.__TS__ParseFloat("42")
        result_suffix = ____lualib.__TS__ParseFloat("3.14abc")
        result_padded = ____lualib.__TS__ParseFloat("  -2.5  ")
      `)
      expect(vm.get("result_pi")).toBe(3.14)
      expect(vm.get("result_int")).toBe(42)
      expect(vm.get("result_suffix")).toBe(3.14)
      expect(vm.get("result_padded")).toBe(-2.5)
    })
  })

  it('parses "Infinity" and "-Infinity"', async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_inf = ____lualib.__TS__ParseFloat("Infinity")
        result_neg_inf = ____lualib.__TS__ParseFloat("-Infinity")
      `)
      expect(vm.get("result_inf")).toBe(Number.POSITIVE_INFINITY)
      expect(vm.get("result_neg_inf")).toBe(Number.NEGATIVE_INFINITY)
    })
  })

  it("returns NaN for non-numeric strings", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local r = ____lualib.__TS__ParseFloat("abc")
        result_is_nan = (r ~= r)
      `)
      expect(vm.get("result_is_nan")).toBe(true)
    })
  })
})
