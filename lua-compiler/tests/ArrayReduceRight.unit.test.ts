import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayReduceRight", () => {
  it("concatenates right-to-left, yielding 'cba' from {a,b,c}", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayReduceRight({"a", "b", "c"}, function(self, acc, x) return acc .. x end, "")
      `)
      expect(vm.get("result")).toBe("cba")
    })
  })

  it("sums an array with an explicit initial value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayReduceRight({1, 2, 3, 4}, function(self, acc, x) return acc + x end, 0)
      `)
      expect(vm.get("result")).toBe(10)
    })
  })

  it("uses arr[len-1] as the initial accumulator when no initial value is provided", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        result = ____lualib.__TS__ArrayReduceRight({"a", "b", "c"}, function(self, acc, x) return acc .. x end)
      `)
      expect(vm.get("result")).toBe("cba")
    })
  })

  it("throws for an empty array with no initial value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        ok, err = pcall(function()
          ____lualib.__TS__ArrayReduceRight({}, function(self, acc, x) return acc + x end)
        end)
      `)
      expect(vm.get("ok")).toBe(false)
      expect(String(vm.get("err"))).toContain("Reduce of empty array with no initial value")
    })
  })
})
