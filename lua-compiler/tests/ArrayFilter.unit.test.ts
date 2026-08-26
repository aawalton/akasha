import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayFilter", () => {
  it("keeps matching elements and drops non-matching", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__ArrayFilter({1, 2, 3, 4, 5}, function(self, x) return x % 2 == 0 end)
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
      `)
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1")).toBe(2)
      expect(vm.get("result_2")).toBe(4)
      expect(vm.get("result_3")).toBeNull()
    })
  })

  it("returns an empty array when nothing matches", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__ArrayFilter({1, 3, 5}, function(self, x) return x % 2 == 0 end)
        result_len = #result
      `)
      expect(vm.get("result_len")).toBe(0)
    })
  })

  it("returns a new array, leaving the source unchanged", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local source = {1, 2, 3}
        local result = ____lualib.__TS__ArrayFilter(source, function(self, x) return x > 1 end)
        same_ref = (result == source)
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        source_len = #source
        source_1 = source[1]
        source_2 = source[2]
        source_3 = source[3]
      `)
      expect(vm.get("same_ref")).toBe(false)
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1")).toBe(2)
      expect(vm.get("result_2")).toBe(3)
      expect(vm.get("source_len")).toBe(3)
      expect(vm.get("source_1")).toBe(1)
      expect(vm.get("source_2")).toBe(2)
      expect(vm.get("source_3")).toBe(3)
    })
  })
})
