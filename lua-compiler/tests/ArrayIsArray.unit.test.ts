import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayIsArray", () => {
  it("returns true for a non-empty array-style table", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__ArrayIsArray({"a", "b"})`)
      expect(vm.get("result")).toBe(true)
    })
  })

  it("returns false for a non-empty dictionary with no index 1", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__ArrayIsArray({foo = "bar"})`)
      expect(vm.get("result")).toBe(false)
    })
  })

  it("returns false for non-table values", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_str = ____lualib.__TS__ArrayIsArray("hello")
        result_num = ____lualib.__TS__ArrayIsArray(42)
        result_nil = ____lualib.__TS__ArrayIsArray(nil)
      `)
      expect(vm.get("result_str")).toBe(false)
      expect(vm.get("result_num")).toBe(false)
      expect(vm.get("result_nil")).toBe(false)
    })
  })
})
