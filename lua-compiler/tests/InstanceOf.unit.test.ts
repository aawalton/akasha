import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__InstanceOf", () => {
  it("returns true for a direct instance of its class", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local C = ____lualib.__TS__Class()",
          "function C.prototype:____constructor() end",
          "local i = ____lualib.__TS__New(C)",
          "result = ____lualib.__TS__InstanceOf(i, C)",
        ].join("\n")
      )
      expect(vm.get("result")).toBe(true)
    })
  })

  it("is transitive — a subclass instance is also an instance of the superclass", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local Parent = ____lualib.__TS__Class()",
          "function Parent.prototype:____constructor() end",
          "local Child = ____lualib.__TS__Class()",
          "____lualib.__TS__ClassExtends(Child, Parent)",
          "function Child.prototype:____constructor() Parent.prototype.____constructor(self) end",
          "local c = ____lualib.__TS__New(Child)",
          "result_child = ____lualib.__TS__InstanceOf(c, Child)",
          "result_parent = ____lualib.__TS__InstanceOf(c, Parent)",
        ].join("\n")
      )
      expect(vm.get("result_child")).toBe(true)
      expect(vm.get("result_parent")).toBe(true)
    })
  })

  it("returns false for an instance of an unrelated class", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local A = ____lualib.__TS__Class()",
          "function A.prototype:____constructor() end",
          "local B = ____lualib.__TS__Class()",
          "function B.prototype:____constructor() end",
          "local a = ____lualib.__TS__New(A)",
          "result = ____lualib.__TS__InstanceOf(a, B)",
        ].join("\n")
      )
      expect(vm.get("result")).toBe(false)
    })
  })
})
