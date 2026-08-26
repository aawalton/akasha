import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringSubstr", () => {
  it("extracts length characters from start", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_mid = ____lualib.__TS__StringSubstr("hello world", 6, 5)
        result_short = ____lualib.__TS__StringSubstr("hello", 1, 3)
      `)
      expect(vm.get("result_mid")).toBe("world")
      expect(vm.get("result_short")).toBe("ell")
    })
  })

  it("returns to the end of string when length is omitted", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__StringSubstr("hello world", 6)`)
      expect(vm.get("result")).toBe("world")
    })
  })

  it("returns the empty string for non-positive length", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_zero = ____lualib.__TS__StringSubstr("hello", 1, 0)
        result_neg = ____lualib.__TS__StringSubstr("hello", 1, -2)
      `)
      expect(vm.get("result_zero")).toBe("")
      expect(vm.get("result_neg")).toBe("")
    })
  })
})
