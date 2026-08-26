import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayPushArray", () => {
  it("appends all items of the source array and returns the new length", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b"}
        new_len = ____lualib.__TS__ArrayPushArray(arr, {"c", "d", "e"})
        len = #arr
        v1 = arr[1]
        v2 = arr[2]
        v3 = arr[3]
        v4 = arr[4]
        v5 = arr[5]
      `)
      expect(vm.get("new_len")).toBe(5)
      expect(vm.get("len")).toBe(5)
      expect(vm.get("v1")).toBe("a")
      expect(vm.get("v2")).toBe("b")
      expect(vm.get("v3")).toBe("c")
      expect(vm.get("v4")).toBe("d")
      expect(vm.get("v5")).toBe("e")
    })
  })

  it("is a no-op for an empty source array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b"}
        new_len = ____lualib.__TS__ArrayPushArray(arr, {})
        len = #arr
      `)
      expect(vm.get("new_len")).toBe(2)
      expect(vm.get("len")).toBe(2)
    })
  })
})
