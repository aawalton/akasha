import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayReduce", () => {
  it("sums an array with an explicit initial value of 0", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayReduce({1, 2, 3, 4}, function(self, acc, x) return acc + x end, 0)
      `)
      expect(vm.get("result")).toBe(10)
    })
  })

  it("concatenates left-to-right (verifying iteration order)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayReduce({"a", "b", "c"}, function(self, acc, x) return acc .. x end, "")
      `)
      expect(vm.get("result")).toBe("abc")
    })
  })

  it("uses arr[0] as the initial accumulator when no initial value is provided", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayReduce({10, 1, 2, 3}, function(self, acc, x) return acc + x end)
      `)
      expect(vm.get("result")).toBe(16)
    })
  })

  it("throws for an empty array with no initial value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        ok, err = pcall(function()
          ____lualib.__TS__ArrayReduce({}, function(self, acc, x) return acc + x end)
        end)
      `)
      expect(vm.get("ok")).toBe(false)
      expect(String(vm.get("err"))).toContain("Reduce of empty array with no initial value")
    })
  })
})
