import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__InstanceOfObject", () => {
  it("returns true for tables and functions, false for primitives", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "result_table = ____lualib.__TS__InstanceOfObject({})",
          "result_func = ____lualib.__TS__InstanceOfObject(function() end)",
          "result_string = ____lualib.__TS__InstanceOfObject('hello')",
          "result_number = ____lualib.__TS__InstanceOfObject(42)",
          "result_bool = ____lualib.__TS__InstanceOfObject(true)",
          "result_nil = ____lualib.__TS__InstanceOfObject(nil)",
        ].join("\n")
      )
      expect(vm.get("result_table")).toBe(true)
      expect(vm.get("result_func")).toBe(true)
      expect(vm.get("result_string")).toBe(false)
      expect(vm.get("result_number")).toBe(false)
      expect(vm.get("result_bool")).toBe(false)
      expect(vm.get("result_nil")).toBe(false)
    })
  })

  it("returns true for class instances created via __TS__New", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local C = ____lualib.__TS__Class()",
          "function C.prototype:____constructor() end",
          "local i = ____lualib.__TS__New(C)",
          "result = ____lualib.__TS__InstanceOfObject(i)",
        ].join("\n")
      )
      expect(vm.get("result")).toBe(true)
    })
  })
})
