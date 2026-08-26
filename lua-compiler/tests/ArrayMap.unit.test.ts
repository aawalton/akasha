import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayMap", () => {
  it("applies the callback 1:1 to each element", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__ArrayMap({1, 2, 3}, function(self, x) return x * 2 end)
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe(2)
      expect(vm.get("result_2")).toBe(4)
      expect(vm.get("result_3")).toBe(6)
    })
  })

  it("passes 0-based index as the third argument (JS spec)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__ArrayMap({"a", "b", "c"}, function(self, value, index)
          return index
        end)
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe(0)
      expect(vm.get("result_2")).toBe(1)
      expect(vm.get("result_3")).toBe(2)
    })
  })

  it("returns an empty array for an empty input", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__ArrayMap({}, function(self, x) return x end)
        result_len = #result
      `)
      expect(vm.get("result_len")).toBe(0)
    })
  })
})
