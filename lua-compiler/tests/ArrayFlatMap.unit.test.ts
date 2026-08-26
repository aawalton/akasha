import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayFlatMap", () => {
  it("maps and flattens one level (array returns spread, scalars append)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {1, 2}
        local result = ____lualib.__TS__ArrayFlatMap(
          arr,
          function(_self, x) return {x, x * 2} end
        )
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
        result_4 = result[4]
      `)
      expect(vm.get("result_len")).toBe(4)
      expect(vm.get("result_1")).toBe(1)
      expect(vm.get("result_2")).toBe(2)
      expect(vm.get("result_3")).toBe(2)
      expect(vm.get("result_4")).toBe(4)
    })
  })

  it("does not flatten beyond depth 1", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {1}
        local result = ____lualib.__TS__ArrayFlatMap(
          arr,
          function(_self, x) return {{x}} end
        )
        result_len = #result
        result_1_is_table = type(result[1]) == "table"
        result_1_inner = result[1][1]
      `)
      expect(vm.get("result_len")).toBe(1)
      expect(vm.get("result_1_is_table")).toBe(true)
      expect(vm.get("result_1_inner")).toBe(1)
    })
  })
})
