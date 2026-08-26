import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayToSpliced", () => {
  it("removes deleteCount elements starting at start", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        local result = ____lualib.__TS__ArrayToSpliced(arr, 1, 1)
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
      `)
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("c")
    })
  })

  it("inserts items in place of the removed range", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        local result = ____lualib.__TS__ArrayToSpliced(arr, 1, 1, "x", "y")
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
        result_4 = result[4]
      `)
      expect(vm.get("result_len")).toBe(4)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("x")
      expect(vm.get("result_3")).toBe("y")
      expect(vm.get("result_4")).toBe("c")
    })
  })

  it("does not mutate the original", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        ____lualib.__TS__ArrayToSpliced(arr, 1, 1)
        arr_len = #arr
        arr_1 = arr[1]
        arr_2 = arr[2]
        arr_3 = arr[3]
      `)
      expect(vm.get("arr_len")).toBe(3)
      expect(vm.get("arr_1")).toBe("a")
      expect(vm.get("arr_2")).toBe("b")
      expect(vm.get("arr_3")).toBe("c")
    })
  })
})
