import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayFlat", () => {
  it("flattens one level by default", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {1, {2, {3}}}
        local result = ____lualib.__TS__ArrayFlat(arr)
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3_is_table = type(result[3]) == "table"
        result_3_inner = result[3][1]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe(1)
      expect(vm.get("result_2")).toBe(2)
      expect(vm.get("result_3_is_table")).toBe(true)
      expect(vm.get("result_3_inner")).toBe(3)
    })
  })

  it("flattens to the specified depth", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {1, {2, {3}}}
        local result = ____lualib.__TS__ArrayFlat(arr, 2)
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe(1)
      expect(vm.get("result_2")).toBe(2)
      expect(vm.get("result_3")).toBe(3)
    })
  })

  it("leaves a non-nested array unchanged", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {1, 2, 3}
        local result = ____lualib.__TS__ArrayFlat(arr)
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe(1)
      expect(vm.get("result_2")).toBe(2)
      expect(vm.get("result_3")).toBe(3)
    })
  })
})
