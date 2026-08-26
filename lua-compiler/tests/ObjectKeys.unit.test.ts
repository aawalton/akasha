import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectKeys", () => {
  it("returns every own enumerable key", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local obj = {a = 1, b = 2, c = 3}
        local keys = ____lualib.__TS__ObjectKeys(obj)
        result_len = #keys
        local set = {}
        for i = 1, #keys do set[keys[i]] = true end
        has_a = set.a == true
        has_b = set.b == true
        has_c = set.c == true
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("has_a")).toBe(true)
      expect(vm.get("has_b")).toBe(true)
      expect(vm.get("has_c")).toBe(true)
    })
  })

  it("returns an empty array for an empty object", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local keys = ____lualib.__TS__ObjectKeys({})
        result_len = #keys
      `)
      expect(vm.get("result_len")).toBe(0)
    })
  })

  it("returns a single-element array for a one-key object", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local keys = ____lualib.__TS__ObjectKeys({only = "x"})
        result_len = #keys
        result_1 = keys[1]
      `)
      expect(vm.get("result_len")).toBe(1)
      expect(vm.get("result_1")).toBe("only")
    })
  })
})
