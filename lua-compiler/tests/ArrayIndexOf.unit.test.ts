import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayIndexOf", () => {
  it("returns the 0-based index of the first occurrence, or -1", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "b"}
        result_first = ____lualib.__TS__ArrayIndexOf(arr, "a")
        result_second = ____lualib.__TS__ArrayIndexOf(arr, "b")
        result_last = ____lualib.__TS__ArrayIndexOf(arr, "c")
        result_missing = ____lualib.__TS__ArrayIndexOf(arr, "z")
      `)
      expect(vm.get("result_first")).toBe(0)
      expect(vm.get("result_second")).toBe(1)
      expect(vm.get("result_last")).toBe(2)
      expect(vm.get("result_missing")).toBe(-1)
    })
  })

  it("respects a fromIndex parameter, including negative values", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "b"}
        result_from_2 = ____lualib.__TS__ArrayIndexOf(arr, "b", 2)
        result_from_neg2 = ____lualib.__TS__ArrayIndexOf(arr, "b", -2)
        result_from_4_miss = ____lualib.__TS__ArrayIndexOf(arr, "a", 4)
      `)
      expect(vm.get("result_from_2")).toBe(3)
      expect(vm.get("result_from_neg2")).toBe(3)
      expect(vm.get("result_from_4_miss")).toBe(-1)
    })
  })
})
