import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__StringAccess", () => {
  it("returns the character at a valid 0-indexed position", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_0 = ____lualib.__TS__StringAccess("hello", 0)
        result_1 = ____lualib.__TS__StringAccess("hello", 1)
        result_4 = ____lualib.__TS__StringAccess("hello", 4)
      `)
      expect(vm.get("result_0")).toBe("h")
      expect(vm.get("result_1")).toBe("e")
      expect(vm.get("result_4")).toBe("o")
    })
  })

  it("returns undefined (Lua nil) for out-of-range indices", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result_neg = ____lualib.__TS__StringAccess("hello", -1)
        result_eq = ____lualib.__TS__StringAccess("hello", 5)
        result_far = ____lualib.__TS__StringAccess("hello", 100)
      `)
      expect(vm.get("result_neg")).toBeNull()
      expect(vm.get("result_eq")).toBeNull()
      expect(vm.get("result_far")).toBeNull()
    })
  })

  it("returns nil for the empty string at any index", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result = ____lualib.__TS__StringAccess("", 0)`)
      expect(vm.get("result")).toBeNull()
    })
  })
})
