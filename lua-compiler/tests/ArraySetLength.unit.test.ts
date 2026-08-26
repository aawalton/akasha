import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArraySetLength", () => {
  it("truncating a 3-element array to length 1 keeps [a]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        ____lualib.__TS__ArraySetLength(arr, 1)
        result_len = #arr
        result_1 = arr[1]
        result_2 = arr[2]
        result_3 = arr[3]
      `)
      expect(vm.get("result_len")).toBe(1)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBeNull()
      expect(vm.get("result_3")).toBeNull()
    })
  })

  it("truncating a 3-element array to length 2 keeps [a, b]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        ____lualib.__TS__ArraySetLength(arr, 2)
        result_len = #arr
        result_1 = arr[1]
        result_2 = arr[2]
        result_3 = arr[3]
      `)
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("b")
      expect(vm.get("result_3")).toBeNull()
    })
  })

  it("truncating a 3-element array to length 0 empties it", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        ____lualib.__TS__ArraySetLength(arr, 0)
        result_len = #arr
        result_1 = arr[1]
      `)
      expect(vm.get("result_len")).toBe(0)
      expect(vm.get("result_1")).toBeNull()
    })
  })
})
