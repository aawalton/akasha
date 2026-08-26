import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__TypeOf", () => {
  it("maps Lua primitive types to their JS typeof string", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "result_number = ____lualib.__TS__TypeOf(42)",
          "result_string = ____lualib.__TS__TypeOf('hello')",
          "result_boolean = ____lualib.__TS__TypeOf(true)",
          "result_function = ____lualib.__TS__TypeOf(function() end)",
        ].join("\n")
      )
      expect(vm.get("result_number")).toBe("number")
      expect(vm.get("result_string")).toBe("string")
      expect(vm.get("result_boolean")).toBe("boolean")
      expect(vm.get("result_function")).toBe("function")
    })
  })

  it("maps Lua tables to 'object' (matching JS typeof for objects/arrays)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "result_empty = ____lualib.__TS__TypeOf({})",
          "result_array = ____lualib.__TS__TypeOf({1, 2, 3})",
          "result_record = ____lualib.__TS__TypeOf({a = 1})",
        ].join("\n")
      )
      expect(vm.get("result_empty")).toBe("object")
      expect(vm.get("result_array")).toBe("object")
      expect(vm.get("result_record")).toBe("object")
    })
  })

  it("maps nil to 'undefined' (Lua has no separate null/undefined distinction)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(["result = ____lualib.__TS__TypeOf(nil)"].join("\n"))
      expect(vm.get("result")).toBe("undefined")
    })
  })
})
