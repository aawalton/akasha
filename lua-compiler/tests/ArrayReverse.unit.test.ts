import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayReverse", () => {
  it("reverses an even-length array in place and returns it", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "d"}
        local result = ____lualib.__TS__ArrayReverse(arr)
        same = result == arr
        v1 = arr[1]
        v2 = arr[2]
        v3 = arr[3]
        v4 = arr[4]
      `)
      expect(vm.get("same")).toBe(true)
      expect(vm.get("v1")).toBe("d")
      expect(vm.get("v2")).toBe("c")
      expect(vm.get("v3")).toBe("b")
      expect(vm.get("v4")).toBe("a")
    })
  })

  it("reverses an odd-length array, leaving the middle element fixed", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "d", "e"}
        ____lualib.__TS__ArrayReverse(arr)
        v1 = arr[1]
        v2 = arr[2]
        v3 = arr[3]
        v4 = arr[4]
        v5 = arr[5]
      `)
      expect(vm.get("v1")).toBe("e")
      expect(vm.get("v2")).toBe("d")
      expect(vm.get("v3")).toBe("c")
      expect(vm.get("v4")).toBe("b")
      expect(vm.get("v5")).toBe("a")
    })
  })
})
