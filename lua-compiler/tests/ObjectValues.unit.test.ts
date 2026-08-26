import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectValues", () => {
  it("returns every own enumerable value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local obj = {a = 1, b = 2, c = 3}
        local values = ____lualib.__TS__ObjectValues(obj)
        result_len = #values
        local sum = 0
        for i = 1, #values do sum = sum + values[i] end
        result_sum = sum
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_sum")).toBe(6)
    })
  })

  it("returns an empty array for an empty object", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local values = ____lualib.__TS__ObjectValues({})
        result_len = #values
      `)
      expect(vm.get("result_len")).toBe(0)
    })
  })

  it("returns a single-element array for a one-key object", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local values = ____lualib.__TS__ObjectValues({only = "x"})
        result_len = #values
        result_1 = values[1]
      `)
      expect(vm.get("result_len")).toBe(1)
      expect(vm.get("result_1")).toBe("x")
    })
  })
})
