import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringSlice", () => {
  it("extracts with positive start and end", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_mid = ____lualib.__TS__StringSlice("hello world", 6, 11)
        result_to_end = ____lualib.__TS__StringSlice("hello world", 6)
        result_with_default = ____lualib.__TS__StringSlice("hello", 0, 3)
      `)
      expect(vm.get("result_mid")).toBe("world")
      expect(vm.get("result_to_end")).toBe("world")
      expect(vm.get("result_with_default")).toBe("hel")
    })
  })

  it("counts negative indices from the end", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_neg_start = ____lualib.__TS__StringSlice("hello world", -5)
        result_neg_both = ____lualib.__TS__StringSlice("hello world", -5, -1)
      `)
      expect(vm.get("result_neg_start")).toBe("world")
      expect(vm.get("result_neg_both")).toBe("worl")
    })
  })

  it("returns empty string when start >= end", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_eq = ____lualib.__TS__StringSlice("hello", 3, 3)
        result_gt = ____lualib.__TS__StringSlice("hello", 4, 2)
      `)
      expect(vm.get("result_eq")).toBe("")
      expect(vm.get("result_gt")).toBe("")
    })
  })
})
