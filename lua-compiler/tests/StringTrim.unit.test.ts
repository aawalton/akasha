import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringTrim", () => {
  it("removes leading and trailing whitespace", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_spaces = ____lualib.__TS__StringTrim("   hello   ")
        result_tabs = ____lualib.__TS__StringTrim("\\thello\\t\\n")
      `)
      expect(vm.get("result_spaces")).toBe("hello")
      expect(vm.get("result_tabs")).toBe("hello")
    })
  })

  it("preserves inner whitespace", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__StringTrim("  hello  world  ")`)
      expect(vm.get("result")).toBe("hello  world")
    })
  })

  it("returns input unchanged when no whitespace at edges", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_clean = ____lualib.__TS__StringTrim("hello")
        result_empty = ____lualib.__TS__StringTrim("")
      `)
      expect(vm.get("result_clean")).toBe("hello")
      expect(vm.get("result_empty")).toBe("")
    })
  })
})
