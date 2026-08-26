import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayWith", () => {
  it("returns a copy with the indexed element replaced", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        local result = ____lualib.__TS__ArrayWith(arr, 1, "Z")
        not_same = result ~= arr
        len = #result
        v1 = result[1]
        v2 = result[2]
        v3 = result[3]
      `)
      expect(vm.get("not_same")).toBe(true)
      expect(vm.get("len")).toBe(3)
      expect(vm.get("v1")).toBe("a")
      expect(vm.get("v2")).toBe("Z")
      expect(vm.get("v3")).toBe("c")
    })
  })

  it("does not mutate the receiver", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        ____lualib.__TS__ArrayWith(arr, 0, "Z")
        v1 = arr[1]
        v2 = arr[2]
        v3 = arr[3]
      `)
      expect(vm.get("v1")).toBe("a")
      expect(vm.get("v2")).toBe("b")
      expect(vm.get("v3")).toBe("c")
    })
  })
})
