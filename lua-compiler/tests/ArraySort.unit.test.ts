import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArraySort", () => {
  it("sorts strings lexicographically and returns the same array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"banana", "apple", "cherry"}
        local returned = ____lualib.__TS__ArraySort(arr)
        result_same = (returned == arr)
        result_1 = arr[1]
        result_2 = arr[2]
        result_3 = arr[3]
      `)
      expect(vm.get("result_same")).toBe(true)
      expect(vm.get("result_1")).toBe("apple")
      expect(vm.get("result_2")).toBe("banana")
      expect(vm.get("result_3")).toBe("cherry")
    })
  })

  it("uses a custom compareFn to sort numbers ascending", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {3, 1, 2, 10}
        ____lualib.__TS__ArraySort(arr, function(_self, a, b) return a - b end)
        result_1 = arr[1]
        result_2 = arr[2]
        result_3 = arr[3]
        result_4 = arr[4]
      `)
      expect(vm.get("result_1")).toBe(1)
      expect(vm.get("result_2")).toBe(2)
      expect(vm.get("result_3")).toBe(3)
      expect(vm.get("result_4")).toBe(10)
    })
  })

  it("uses a custom compareFn to sort numbers descending", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {3, 1, 2}
        ____lualib.__TS__ArraySort(arr, function(_self, a, b) return b - a end)
        result_1 = arr[1]
        result_2 = arr[2]
        result_3 = arr[3]
      `)
      expect(vm.get("result_1")).toBe(3)
      expect(vm.get("result_2")).toBe(2)
      expect(vm.get("result_3")).toBe(1)
    })
  })
})
