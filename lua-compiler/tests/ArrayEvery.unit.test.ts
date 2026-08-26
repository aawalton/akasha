import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayEvery", () => {
  it("returns true for an empty array (vacuously true)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayEvery({}, function(self, x) return false end)
      `)
      expect(vm.get("result")).toBe(true)
    })
  })

  it("returns true when every element passes the predicate", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayEvery({2, 4, 6}, function(self, x) return x % 2 == 0 end)
      `)
      expect(vm.get("result")).toBe(true)
    })
  })

  it("returns false when at least one element fails the predicate", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayEvery({2, 3, 4}, function(self, x) return x % 2 == 0 end)
      `)
      expect(vm.get("result")).toBe(false)
    })
  })

  it("passes 0-based index to the callback (JS spec)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        captured = {}
        ____lualib.__TS__ArrayEvery({"a", "b", "c"}, function(self, value, index)
          captured[#captured + 1] = index
          return true
        end)
        captured_1 = captured[1]
        captured_2 = captured[2]
        captured_3 = captured[3]
        captured_len = #captured
      `)
      expect(vm.get("captured_len")).toBe(3)
      expect(vm.get("captured_1")).toBe(0)
      expect(vm.get("captured_2")).toBe(1)
      expect(vm.get("captured_3")).toBe(2)
    })
  })
})
