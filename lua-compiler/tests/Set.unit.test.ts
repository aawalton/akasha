import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("Set construction", () => {
  it("an empty Set has size 0", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.Set)
        result_size = s.size
      `)
      expect(vm.get("result_size")).toBe(0)
    })
  })
})

describe("Set.prototype.add / has / size (deduplication)", () => {
  it("adding the same value twice keeps size at 1", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.Set)
        s:add(1)
        s:add(1)
        result_size = s.size
        result_has = s:has(1)
      `)
      expect(vm.get("result_size")).toBe(1)
      expect(vm.get("result_has")).toBe(true)
    })
  })

  it("adding distinct values grows size", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.Set)
        s:add("a")
        s:add("b")
        s:add("c")
        result_size = s.size
        result_has_a = s:has("a")
        result_has_z = s:has("z")
      `)
      expect(vm.get("result_size")).toBe(3)
      expect(vm.get("result_has_a")).toBe(true)
      expect(vm.get("result_has_z")).toBe(false)
    })
  })
})

describe("Set.prototype.delete (LuaTable.set regression)", () => {
  it("delete returns true and removes the value", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.Set)
        s:add("a")
        s:add("b")
        result_deleted = s:delete("a")
        result_has_a = s:has("a")
        result_size = s.size
      `)
      expect(vm.get("result_deleted")).toBe(true)
      expect(vm.get("result_has_a")).toBe(false)
      expect(vm.get("result_size")).toBe(1)
    })
  })

  it("delete on an absent value returns false", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.Set)
        s:add("a")
        result_deleted = s:delete("missing")
        result_size = s.size
      `)
      expect(vm.get("result_deleted")).toBe(false)
      expect(vm.get("result_size")).toBe(1)
    })
  })
})

describe("Set.prototype.clear", () => {
  it("clear empties the Set", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__New(____lualib.Set)
        s:add("a")
        s:add("b")
        s:clear()
        result_size = s.size
        result_has_a = s:has("a")
      `)
      expect(vm.get("result_size")).toBe(0)
      expect(vm.get("result_has_a")).toBe(false)
    })
  })
})
