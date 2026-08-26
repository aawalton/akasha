import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayFindIndex", () => {
  it("returns the 0-based index of the first match", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayFindIndex({"a", "b", "c", "d"}, function(self, x) return x == "c" end)
      `)
      expect(vm.get("result")).toBe(2)
    })
  })

  it("returns 0 when the first element matches", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayFindIndex({10, 20, 30}, function(self, x) return x >= 10 end)
      `)
      expect(vm.get("result")).toBe(0)
    })
  })

  it("returns -1 when no element matches", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayFindIndex({1, 2, 3}, function(self, x) return x > 10 end)
      `)
      expect(vm.get("result")).toBe(-1)
    })
  })

  it("returns -1 for an empty array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayFindIndex({}, function(self, x) return true end)
      `)
      expect(vm.get("result")).toBe(-1)
    })
  })
})
