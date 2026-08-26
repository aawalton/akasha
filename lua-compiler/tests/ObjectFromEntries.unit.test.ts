import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectFromEntries", () => {
  it("turns [[key, value]] pairs into an object", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local entries = {{"a", 1}, {"b", 2}}
        local obj = ____lualib.__TS__ObjectFromEntries(entries)
        result_a = obj.a
        result_b = obj.b
      `)
      expect(vm.get("result_a")).toBe(1)
      expect(vm.get("result_b")).toBe(2)
    })
  })

  it("returns an empty object for empty input", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local obj = ____lualib.__TS__ObjectFromEntries({})
        local count = 0
        for _ in pairs(obj) do count = count + 1 end
        result_count = count
      `)
      expect(vm.get("result_count")).toBe(0)
    })
  })

  it("later entries overwrite earlier entries with the same key", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local entries = {{"a", 1}, {"a", 2}}
        local obj = ____lualib.__TS__ObjectFromEntries(entries)
        result_a = obj.a
      `)
      expect(vm.get("result_a")).toBe(2)
    })
  })
})
