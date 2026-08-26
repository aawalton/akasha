import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayAt", () => {
  it("returns the element at a non-negative index", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        result = ____lualib.__TS__ArrayAt(arr, 1)
      `)
      expect(vm.get("result")).toBe("b")
    })
  })

  it("returns the last element for index -1", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        result = ____lualib.__TS__ArrayAt(arr, -1)
      `)
      expect(vm.get("result")).toBe("c")
    })
  })

  it("returns undefined for out-of-range positive index", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local arr = {"a", "b", "c"}
        result = ____lualib.__TS__ArrayAt(arr, 5)
      `)
      expect(vm.get("result")).toBeNull()
    })
  })
})
