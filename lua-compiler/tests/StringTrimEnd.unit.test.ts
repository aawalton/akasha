import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringTrimEnd", () => {
  it("removes only trailing whitespace", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_spaces = ____lualib.__TS__StringTrimEnd("   hello   ")
        result_tabs = ____lualib.__TS__StringTrimEnd("hello\\t\\n")
      `)
      expect(vm.get("result_spaces")).toBe("   hello")
      expect(vm.get("result_tabs")).toBe("hello")
    })
  })

  it("returns input unchanged when no trailing whitespace", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_clean = ____lualib.__TS__StringTrimEnd("hello")
        result_lead_only = ____lualib.__TS__StringTrimEnd("  hello")
      `)
      expect(vm.get("result_clean")).toBe("hello")
      expect(vm.get("result_lead_only")).toBe("  hello")
    })
  })
})
