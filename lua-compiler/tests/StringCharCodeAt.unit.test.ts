import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringCharCodeAt", () => {
  it("returns the UTF-16 code unit at a valid 0-indexed position", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_a = ____lualib.__TS__StringCharCodeAt("ABC", 0)
        result_b = ____lualib.__TS__StringCharCodeAt("ABC", 1)
        result_c = ____lualib.__TS__StringCharCodeAt("ABC", 2)
      `)
      expect(vm.get("result_a")).toBe(65)
      expect(vm.get("result_b")).toBe(66)
      expect(vm.get("result_c")).toBe(67)
    })
  })

  it("returns NaN for out-of-range indices", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_neg = ____lualib.__TS__StringCharCodeAt("ABC", -1)
        result_eq = ____lualib.__TS__StringCharCodeAt("ABC", 3)
        result_far = ____lualib.__TS__StringCharCodeAt("ABC", 100)
      `)
      const expectNaN = (v: unknown) => expect(Number.isNaN(v)).toBe(true)
      expectNaN(vm.get("result_neg"))
      expectNaN(vm.get("result_eq"))
      expectNaN(vm.get("result_far"))
    })
  })
})
