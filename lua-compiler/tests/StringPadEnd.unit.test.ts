import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringPadEnd", () => {
  it("pads to maxLength with default space when shorter", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__StringPadEnd("abc", 6)`)
      expect(vm.get("result")).toBe("abc   ")
    })
  })

  it("pads with a custom fill, truncating to maxLength", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_short = ____lualib.__TS__StringPadEnd("abc", 7, "12")
        result_partial = ____lualib.__TS__StringPadEnd("abc", 6, "12")
      `)
      expect(vm.get("result_short")).toBe("abc1212")
      expect(vm.get("result_partial")).toBe("abc121")
    })
  })

  it("returns the receiver unchanged when already long enough", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_eq = ____lualib.__TS__StringPadEnd("abc", 3)
        result_longer = ____lualib.__TS__StringPadEnd("abcdef", 3)
      `)
      expect(vm.get("result_eq")).toBe("abc")
      expect(vm.get("result_longer")).toBe("abcdef")
    })
  })
})
