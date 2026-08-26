import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayUnshift", () => {
  it("inserts items at the front, returns the new length, preserves order", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"c", "d"}
        new_len = ____lualib.__TS__ArrayUnshift(arr, "a", "b")
        len = #arr
        v1 = arr[1]
        v2 = arr[2]
        v3 = arr[3]
        v4 = arr[4]
      `)
      expect(vm.get("new_len")).toBe(4)
      expect(vm.get("len")).toBe(4)
      expect(vm.get("v1")).toBe("a")
      expect(vm.get("v2")).toBe("b")
      expect(vm.get("v3")).toBe("c")
      expect(vm.get("v4")).toBe("d")
    })
  })

  it("returns the existing length when no items are passed", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b"}
        new_len = ____lualib.__TS__ArrayUnshift(arr)
        len = #arr
        v1 = arr[1]
        v2 = arr[2]
      `)
      expect(vm.get("new_len")).toBe(2)
      expect(vm.get("len")).toBe(2)
      expect(vm.get("v1")).toBe("a")
      expect(vm.get("v2")).toBe("b")
    })
  })
})
