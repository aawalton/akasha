import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectEntries", () => {
  it("returns [key, value] pairs for every own enumerable property", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local obj = {a = 1, b = 2, c = 3}
        local entries = ____lualib.__TS__ObjectEntries(obj)
        result_len = #entries
        local map = {}
        for i = 1, #entries do
          map[entries[i][1]] = entries[i][2]
        end
        result_a = map.a
        result_b = map.b
        result_c = map.c
      `)
      expect(vm.get("result_len")).toBe(3)
      expect(vm.get("result_a")).toBe(1)
      expect(vm.get("result_b")).toBe(2)
      expect(vm.get("result_c")).toBe(3)
    })
  })

  it("returns an empty array for an empty object", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local entries = ____lualib.__TS__ObjectEntries({})
        result_len = #entries
      `)
      expect(vm.get("result_len")).toBe(0)
    })
  })

  it("preserves the value type in each pair", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local obj = {name = "alice", age = 30}
        local entries = ____lualib.__TS__ObjectEntries(obj)
        result_len = #entries
        local map = {}
        for i = 1, #entries do
          map[entries[i][1]] = entries[i][2]
        end
        result_name = map.name
        result_age = map.age
      `)
      expect(vm.get("result_len")).toBe(2)
      expect(vm.get("result_name")).toBe("alice")
      expect(vm.get("result_age")).toBe(30)
    })
  })
})
