import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayToSorted", () => {
  it("returns a new sorted array without mutating the original", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"banana", "apple", "cherry"}
        local result = ____lualib.__TS__ArrayToSorted(arr)
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
        arr_1 = arr[1]
        arr_2 = arr[2]
        arr_3 = arr[3]
        result_distinct = (result ~= arr)
      `)
      expect(vm.get("result_1")).toBe("apple")
      expect(vm.get("result_2")).toBe("banana")
      expect(vm.get("result_3")).toBe("cherry")
      expect(vm.get("arr_1")).toBe("banana")
      expect(vm.get("arr_2")).toBe("apple")
      expect(vm.get("arr_3")).toBe("cherry")
      expect(vm.get("result_distinct")).toBe(true)
    })
  })

  it("uses a custom compareFn when provided", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {3, 1, 2, 10}
        local result = ____lualib.__TS__ArrayToSorted(
          arr,
          function(_self, a, b) return a - b end
        )
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
        result_4 = result[4]
      `)
      expect(vm.get("result_1")).toBe(1)
      expect(vm.get("result_2")).toBe(2)
      expect(vm.get("result_3")).toBe(3)
      expect(vm.get("result_4")).toBe(10)
    })
  })
})
