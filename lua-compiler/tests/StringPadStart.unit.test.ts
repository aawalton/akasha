import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringPadStart", () => {
  it("pads to maxLength with default space when shorter", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__StringPadStart("abc", 6)`)
      expect(vm.get("result")).toBe("   abc")
    })
  })

  it("pads with a custom fill, truncating to maxLength", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_short = ____lualib.__TS__StringPadStart("abc", 7, "12")
        result_partial = ____lualib.__TS__StringPadStart("abc", 6, "12")
      `)
      expect(vm.get("result_short")).toBe("1212abc")
      expect(vm.get("result_partial")).toBe("121abc")
    })
  })

  it("returns the receiver unchanged when already long enough", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_eq = ____lualib.__TS__StringPadStart("abc", 3)
        result_longer = ____lualib.__TS__StringPadStart("abcdef", 3)
      `)
      expect(vm.get("result_eq")).toBe("abc")
      expect(vm.get("result_longer")).toBe("abcdef")
    })
  })
})
