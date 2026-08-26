import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArraySlice", () => {
  it("returns the half-open slice [first, last) as a new array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "d", "e"}
        local result = ____lualib.__TS__ArraySlice(arr, 1, 3)
        not_same = result ~= arr
        len = #result
        v1 = result[1]
        v2 = result[2]
      `)
      expect(vm.get("not_same")).toBe(true)
      expect(vm.get("len")).toBe(2)
      expect(vm.get("v1")).toBe("b")
      expect(vm.get("v2")).toBe("c")
    })
  })

  it("slices through the end when last is omitted", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "d"}
        local result = ____lualib.__TS__ArraySlice(arr, 2)
        len = #result
        v1 = result[1]
        v2 = result[2]
      `)
      expect(vm.get("len")).toBe(2)
      expect(vm.get("v1")).toBe("c")
      expect(vm.get("v2")).toBe("d")
    })
  })

  it("treats negative first as length+first", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c", "d"}
        local result = ____lualib.__TS__ArraySlice(arr, -2)
        len = #result
        v1 = result[1]
        v2 = result[2]
      `)
      expect(vm.get("len")).toBe(2)
      expect(vm.get("v1")).toBe("c")
      expect(vm.get("v2")).toBe("d")
    })
  })
})
