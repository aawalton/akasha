import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("Error constructor", () => {
  it("new Error('boom') sets message and the default name 'Error'", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local e = ____lualib.__TS__New(____lualib.Error, 'boom')",
          "result_message = e.message",
          "result_name = e.name",
        ].join("\n")
      )
      expect(vm.get("result_message")).toBe("boom")
      expect(vm.get("result_name")).toBe("Error")
    })
  })

  it("new Error() with no message defaults to an empty string", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local e = ____lualib.__TS__New(____lualib.Error)",
          "result_message = e.message",
          "result_name = e.name",
        ].join("\n")
      )
      expect(vm.get("result_message")).toBe("")
      expect(vm.get("result_name")).toBe("Error")
    })
  })

  it("subclass error constructors set their own name", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local te = ____lualib.__TS__New(____lualib.TypeError, 'bad type')",
          "local re = ____lualib.__TS__New(____lualib.RangeError, 'out of range')",
          "local rfe = ____lualib.__TS__New(____lualib.ReferenceError, 'missing')",
          "result_te_name = te.name",
          "result_te_message = te.message",
          "result_re_name = re.name",
          "result_rfe_name = rfe.name",
        ].join("\n")
      )
      expect(vm.get("result_te_name")).toBe("TypeError")
      expect(vm.get("result_te_message")).toBe("bad type")
      expect(vm.get("result_re_name")).toBe("RangeError")
      expect(vm.get("result_rfe_name")).toBe("ReferenceError")
    })
  })

  it("subclass instance is instanceof both its class and Error", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(
        [
          "local te = ____lualib.__TS__New(____lualib.TypeError, 'x')",
          "result_is_typeerror = ____lualib.__TS__InstanceOf(te, ____lualib.TypeError)",
          "result_is_error = ____lualib.__TS__InstanceOf(te, ____lualib.Error)",
          "result_not_rangeerror = ____lualib.__TS__InstanceOf(te, ____lualib.RangeError)",
        ].join("\n")
      )
      expect(vm.get("result_is_typeerror")).toBe(true)
      expect(vm.get("result_is_error")).toBe(true)
      expect(vm.get("result_not_rangeerror")).toBe(false)
    })
  })
})
