import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringTrimStart", () => {
  it("removes only leading whitespace", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_spaces = ____lualib.__TS__StringTrimStart("   hello   ")
        result_tabs = ____lualib.__TS__StringTrimStart("\\t\\nhello")
      `)
      expect(vm.get("result_spaces")).toBe("hello   ")
      expect(vm.get("result_tabs")).toBe("hello")
    })
  })

  it("returns input unchanged when no leading whitespace", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_clean = ____lualib.__TS__StringTrimStart("hello")
        result_trail_only = ____lualib.__TS__StringTrimStart("hello  ")
      `)
      expect(vm.get("result_clean")).toBe("hello")
      expect(vm.get("result_trail_only")).toBe("hello  ")
    })
  })
})
