import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringCharAt", () => {
  it("returns the character at a valid 0-indexed position", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_0 = ____lualib.__TS__StringCharAt("hello", 0)
        result_1 = ____lualib.__TS__StringCharAt("hello", 1)
        result_4 = ____lualib.__TS__StringCharAt("hello", 4)
      `)
      expect(vm.get("result_0")).toBe("h")
      expect(vm.get("result_1")).toBe("e")
      expect(vm.get("result_4")).toBe("o")
    })
  })

  it("returns the empty string for out-of-range indices", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_neg = ____lualib.__TS__StringCharAt("hello", -1)
        result_eq = ____lualib.__TS__StringCharAt("hello", 5)
        result_far = ____lualib.__TS__StringCharAt("hello", 100)
      `)
      expect(vm.get("result_neg")).toBe("")
      expect(vm.get("result_eq")).toBe("")
      expect(vm.get("result_far")).toBe("")
    })
  })
})
