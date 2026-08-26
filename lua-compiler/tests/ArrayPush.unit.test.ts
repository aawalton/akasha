import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayPush", () => {
  it("appends items in order and returns the new length", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a"}
        new_len = ____lualib.__TS__ArrayPush(arr, "b", "c")
        len = #arr
        v1 = arr[1]
        v2 = arr[2]
        v3 = arr[3]
      `)
      expect(vm.get("new_len")).toBe(3)
      expect(vm.get("len")).toBe(3)
      expect(vm.get("v1")).toBe("a")
      expect(vm.get("v2")).toBe("b")
      expect(vm.get("v3")).toBe("c")
    })
  })

  it("returns the existing length when no items are passed", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b"}
        new_len = ____lualib.__TS__ArrayPush(arr)
        len = #arr
      `)
      expect(vm.get("new_len")).toBe(2)
      expect(vm.get("len")).toBe(2)
    })
  })
})
