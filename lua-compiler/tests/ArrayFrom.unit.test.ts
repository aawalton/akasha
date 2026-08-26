import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ArrayFrom", () => {
  it("copies elements from an array-like into a new array", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local src = {"a", "b", "c"}
        src.length = 3
        local result = ____lualib.__TS__ArrayFrom(src)
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe("a")
      expect(vm.get("result_2")).toBe("b")
      expect(vm.get("result_3")).toBe("c")
    })
  })

  it("applies mapFn to each element when provided", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local src = {1, 2, 3}
        src.length = 3
        local result = ____lualib.__TS__ArrayFrom(
          src,
          function(_self, x) return x * 10 end
        )
        result_len = #result
        result_1 = result[1]
        result_2 = result[2]
        result_3 = result[3]
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_1")).toBe(10)
      expect(vm.get("result_2")).toBe(20)
      expect(vm.get("result_3")).toBe(30)
    })
  })
})
