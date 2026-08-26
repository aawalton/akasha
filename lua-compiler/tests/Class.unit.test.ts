import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Class", () => {
  it("returns a table with a prototype whose __index is itself", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local C = ____lualib.__TS__Class()",
          "result_class_type = type(C)",
          "result_proto_type = type(C.prototype)",
          "result_index_is_proto = C.prototype.__index == C.prototype",
          "result_constructor_is_class = C.prototype.constructor == C",
        ].join("\n")
      )
      expect(vm.get("result_class_type")).toBe("table")
      expect(vm.get("result_proto_type")).toBe("table")
      expect(vm.get("result_index_is_proto")).toBe(true)
      expect(vm.get("result_constructor_is_class")).toBe(true)
    })
  })

  it("methods defined on prototype resolve through __index on instances", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local C = ____lualib.__TS__Class()",
          "function C.prototype:____constructor(x) self.x = x end",
          "function C.prototype:doubled() return self.x * 2 end",
          "local i = ____lualib.__TS__New(C, 21)",
          "result = i:doubled()",
        ].join("\n")
      )
      expect(vm.get("result")).toBe(42)
    })
  })

  it("two distinct classes have independent prototypes", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local A = ____lualib.__TS__Class()",
          "local B = ____lualib.__TS__Class()",
          "result_proto_distinct = A.prototype ~= B.prototype",
          "result_class_distinct = A ~= B",
        ].join("\n")
      )
      expect(vm.get("result_proto_distinct")).toBe(true)
      expect(vm.get("result_class_distinct")).toBe(true)
    })
  })
})
