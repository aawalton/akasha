import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringSubstring", () => {
  it("extracts between start and end with end exclusive", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_mid = ____lualib.__TS__StringSubstring("hello world", 6, 11)
        result_to_end = ____lualib.__TS__StringSubstring("hello world", 6)
      `)
      expect(vm.get("result_mid")).toBe("world")
      expect(vm.get("result_to_end")).toBe("world")
    })
  })

  it("swaps start and end when start > end", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__StringSubstring("hello world", 11, 6)`)
      expect(vm.get("result")).toBe("world")
    })
  })

  it("treats negative arguments as 0", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_neg_start = ____lualib.__TS__StringSubstring("hello", -3, 3)
        result_neg_end = ____lualib.__TS__StringSubstring("hello", 0, -1)
      `)
      expect(vm.get("result_neg_start")).toBe("hel")
      expect(vm.get("result_neg_end")).toBe("")
    })
  })
})
