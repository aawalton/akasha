import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArraySome", () => {
  it("returns false for an empty array (vacuously false)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArraySome({}, function(self, x) return true end)
      `)
      expect(vm.get("result")).toBe(false)
    })
  })

  it("returns true when at least one element passes", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArraySome({1, 3, 4}, function(self, x) return x % 2 == 0 end)
      `)
      expect(vm.get("result")).toBe(true)
    })
  })

  it("returns false when no element passes", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArraySome({1, 3, 5}, function(self, x) return x % 2 == 0 end)
      `)
      expect(vm.get("result")).toBe(false)
    })
  })
})
