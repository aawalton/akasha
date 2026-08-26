import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayFind", () => {
  it("returns the first matching element", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayFind({1, 2, 3, 4}, function(self, x) return x > 2 end)
      `)
      expect(vm.get("result")).toBe(3)
    })
  })

  it("returns undefined when no element matches", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayFind({1, 2, 3}, function(self, x) return x > 10 end)
      `)
      expect(vm.get("result")).toBeNull()
    })
  })

  it("returns undefined for an empty array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayFind({}, function(self, x) return true end)
      `)
      expect(vm.get("result")).toBeNull()
    })
  })
})
