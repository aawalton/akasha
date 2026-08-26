import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ParseInt", () => {
  it("parses decimal strings with default base 10 and trims leading whitespace", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_basic = ____lualib.__TS__ParseInt("10")
        result_negative = ____lualib.__TS__ParseInt("-7")
        result_padded = ____lualib.__TS__ParseInt("  10  ")
      `)
      expect(vm.get("result_basic")).toBe(10)
      expect(vm.get("result_negative")).toBe(-7)
      expect(vm.get("result_padded")).toBe(10)
    })
  })

  it("parses with explicit radix and auto-detects 0x prefix as hex", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_hex_explicit = ____lualib.__TS__ParseInt("10", 16)
        result_hex_auto = ____lualib.__TS__ParseInt("0xff")
        result_bin = ____lualib.__TS__ParseInt("101", 2)
      `)
      expect(vm.get("result_hex_explicit")).toBe(16)
      expect(vm.get("result_hex_auto")).toBe(255)
      expect(vm.get("result_bin")).toBe(5)
    })
  })

  it("returns NaN for unparsable strings", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local r = ____lualib.__TS__ParseInt("abc")
        result_is_nan = (r ~= r)
      `)
      expect(vm.get("result_is_nan")).toBe(true)
    })
  })
})
