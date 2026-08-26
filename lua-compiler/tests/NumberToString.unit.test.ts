import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__NumberToString", () => {
  it("formats integers in base 16 and base 2", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_hex = ____lualib.__TS__NumberToString(255, 16)
        result_bin = ____lualib.__TS__NumberToString(2, 2)
      `)
      expect(vm.get("result_hex")).toBe("ff")
      expect(vm.get("result_bin")).toBe("10")
    })
  })

  it("returns the default decimal form when radix is omitted or 10", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_default = ____lualib.__TS__NumberToString(42)
        result_ten = ____lualib.__TS__NumberToString(42, 10)
      `)
      expect(vm.get("result_default")).toBe("42")
      expect(vm.get("result_ten")).toBe("42")
    })
  })

  it("prefixes a minus sign for negative integers in non-decimal bases", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__NumberToString(-255, 16)`)
      expect(vm.get("result")).toBe("-ff")
    })
  })
})
