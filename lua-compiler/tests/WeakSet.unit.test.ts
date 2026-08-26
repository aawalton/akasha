import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("WeakSet.prototype.add / has", () => {
  it("add then has returns true for the same table", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.WeakSet)
        local v = {}
        s:add(v)
        result_has = s:has(v)
      `)
      expect(vm.get("result_has")).toBe(true)
    })
  })

  it("has returns false for a table that was never added", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.WeakSet)
        local a = {}
        local b = {}
        s:add(a)
        result_has_a = s:has(a)
        result_has_b = s:has(b)
      `)
      expect(vm.get("result_has_a")).toBe(true)
      expect(vm.get("result_has_b")).toBe(false)
    })
  })
})

describe("WeakSet.prototype.delete (LuaTable.set regression)", () => {
  it("delete returns true and removes the value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.WeakSet)
        local v = {}
        s:add(v)
        result_deleted = s:delete(v)
        result_has = s:has(v)
      `)
      expect(vm.get("result_deleted")).toBe(true)
      expect(vm.get("result_has")).toBe(false)
    })
  })

  it("delete on an absent value returns false", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.WeakSet)
        local v = {}
        result_deleted = s:delete(v)
      `)
      expect(vm.get("result_deleted")).toBe(false)
    })
  })
})
