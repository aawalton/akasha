import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayIncludes", () => {
  it("returns true for elements at start, middle, and end", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        result_start = ____lualib.__TS__ArrayIncludes(arr, "a")
        result_middle = ____lualib.__TS__ArrayIncludes(arr, "b")
        result_end = ____lualib.__TS__ArrayIncludes(arr, "c")
        result_missing = ____lualib.__TS__ArrayIncludes(arr, "z")
      `)
      expect(vm.get("result_start")).toBe(true)
      expect(vm.get("result_middle")).toBe(true)
      expect(vm.get("result_end")).toBe(true)
      expect(vm.get("result_missing")).toBe(false)
    })
  })

  it("respects a fromIndex parameter", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "b"}
        result_from_2 = ____lualib.__TS__ArrayIncludes(arr, "b", 2)
        result_from_neg1 = ____lualib.__TS__ArrayIncludes(arr, "b", -1)
        result_from_neg1_miss = ____lualib.__TS__ArrayIncludes(arr, "a", -1)
      `)
      expect(vm.get("result_from_2")).toBe(true)
      expect(vm.get("result_from_neg1")).toBe(true)
      expect(vm.get("result_from_neg1_miss")).toBe(false)
    })
  })
})
