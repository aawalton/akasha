import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ClassExtends", () => {
  it("child instances inherit parent prototype methods", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local Parent = ____lualib.__TS__Class()",
          "function Parent.prototype:____constructor() end",
          "function Parent.prototype:greet() return 'hi-from-parent' end",
          "local Child = ____lualib.__TS__Class()",
          "____lualib.__TS__ClassExtends(Child, Parent)",
          "function Child.prototype:____constructor() Parent.prototype.____constructor(self) end",
          "local c = ____lualib.__TS__New(Child)",
          "result = c:greet()",
        ].join("\n")
      )
      expect(vm.get("result")).toBe("hi-from-parent")
    })
  })

  it("sets child.____super to the parent class", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local Parent = ____lualib.__TS__Class()",
          "local Child = ____lualib.__TS__Class()",
          "____lualib.__TS__ClassExtends(Child, Parent)",
          "result = Child.____super == Parent",
        ].join("\n")
      )
      expect(vm.get("result")).toBe(true)
    })
  })

  it("child overrides take precedence over parent methods", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local Parent = ____lualib.__TS__Class()",
          "function Parent.prototype:____constructor() end",
          "function Parent.prototype:label() return 'parent' end",
          "local Child = ____lualib.__TS__Class()",
          "____lualib.__TS__ClassExtends(Child, Parent)",
          "function Child.prototype:____constructor() Parent.prototype.____constructor(self) end",
          "function Child.prototype:label() return 'child' end",
          "local c = ____lualib.__TS__New(Child)",
          "local p = ____lualib.__TS__New(Parent)",
          "result_child = c:label()",
          "result_parent = p:label()",
        ].join("\n")
      )
      expect(vm.get("result_child")).toBe("child")
      expect(vm.get("result_parent")).toBe("parent")
    })
  })
})
