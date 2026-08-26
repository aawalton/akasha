import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__New", () => {
  it("invokes ____constructor with the supplied args and returns the populated instance", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local C = ____lualib.__TS__Class()",
          "function C.prototype:____constructor(a, b) self.a = a; self.b = b end",
          "local i = ____lualib.__TS__New(C, 'x', 'y')",
          "result_a = i.a",
          "result_b = i.b",
        ].join("\n")
      )
      expect(vm.get("result_a")).toBe("x")
      expect(vm.get("result_b")).toBe("y")
    })
  })

  it("instance prototype chain reaches the class prototype via __index", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local C = ____lualib.__TS__Class()",
          "function C.prototype:____constructor() end",
          "function C.prototype:proto_method() return 'from-proto' end",
          "local i = ____lualib.__TS__New(C)",
          "result_owned = rawget(i, 'proto_method')",
          "result_resolved = i:proto_method()",
          "result_meta_is_proto = getmetatable(i) == C.prototype",
        ].join("\n")
      )
      expect(vm.get("result_owned")).toBeNull()
      expect(vm.get("result_resolved")).toBe("from-proto")
      expect(vm.get("result_meta_is_proto")).toBe(true)
    })
  })

  it("each call returns a fresh instance with independent fields", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local C = ____lualib.__TS__Class()",
          "function C.prototype:____constructor(v) self.v = v end",
          "local i1 = ____lualib.__TS__New(C, 1)",
          "local i2 = ____lualib.__TS__New(C, 2)",
          "result_distinct = i1 ~= i2",
          "result_v1 = i1.v",
          "result_v2 = i2.v",
        ].join("\n")
      )
      expect(vm.get("result_distinct")).toBe(true)
      expect(vm.get("result_v1")).toBe(1)
      expect(vm.get("result_v2")).toBe(2)
    })
  })
})
