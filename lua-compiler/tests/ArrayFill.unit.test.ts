import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayFill", () => {
  it("fills the entire array when start/end are omitted, returns the receiver", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        local result = ____lualib.__TS__ArrayFill(arr, "z")
        same = result == arr
        len = #arr
        v1 = arr[1]
        v2 = arr[2]
        v3 = arr[3]
      `)
      expect(vm.get("same")).toBe(true)
      expect(vm.get("len")).toBe(3)
      expect(vm.get("v1")).toBe("z")
      expect(vm.get("v2")).toBe("z")
      expect(vm.get("v3")).toBe("z")
    })
  })

  it("fills only the half-open [start, end) range", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "d"}
        ____lualib.__TS__ArrayFill(arr, "z", 1, 3)
        v1 = arr[1]
        v2 = arr[2]
        v3 = arr[3]
        v4 = arr[4]
      `)
      expect(vm.get("v1")).toBe("a")
      expect(vm.get("v2")).toBe("z")
      expect(vm.get("v3")).toBe("z")
      expect(vm.get("v4")).toBe("d")
    })
  })

  it("treats negative start as length+start", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "d"}
        ____lualib.__TS__ArrayFill(arr, "z", -2)
        v1 = arr[1]
        v2 = arr[2]
        v3 = arr[3]
        v4 = arr[4]
      `)
      expect(vm.get("v1")).toBe("a")
      expect(vm.get("v2")).toBe("b")
      expect(vm.get("v3")).toBe("z")
      expect(vm.get("v4")).toBe("z")
    })
  })
})
