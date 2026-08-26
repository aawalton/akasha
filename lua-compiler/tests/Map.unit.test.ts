import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("Map construction", () => {
  it("an empty Map has size 0", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        result_size = m.size
      `)
      expect(vm.get("result_size")).toBe(0)
    })
  })
})

describe("Map.prototype.set / get / has / size", () => {
  it("set then get round-trips a string-keyed entry", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        m:set("a", 1)
        m:set("b", 2)
        result_a = m:get("a")
        result_b = m:get("b")
        result_size = m.size
        result_has_a = m:has("a")
        result_has_c = m:has("c")
      `)
      expect(vm.get("result_a")).toBe(1)
      expect(vm.get("result_b")).toBe(2)
      expect(vm.get("result_size")).toBe(2)
      expect(vm.get("result_has_a")).toBe(true)
      expect(vm.get("result_has_c")).toBe(false)
    })
  })

  it("set on an existing key replaces the value without growing size", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        m:set("a", 1)
        m:set("a", 99)
        result_a = m:get("a")
        result_size = m.size
      `)
      expect(vm.get("result_a")).toBe(99)
      expect(vm.get("result_size")).toBe(1)
    })
  })

  it("get on an absent key returns undefined (nil)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        result = m:get("absent")
      `)
      expect(vm.get("result")).toBeNull()
    })
  })
})

describe("Map.prototype.delete (LuaTable.set regression)", () => {
  it("delete returns true and removes the entry", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        m:set("a", 1)
        m:set("b", 2)
        result_deleted = m:delete("a")
        result_has_a = m:has("a")
        result_get_a = m:get("a")
        result_size = m.size
      `)
      expect(vm.get("result_deleted")).toBe(true)
      expect(vm.get("result_has_a")).toBe(false)
      expect(vm.get("result_get_a")).toBeNull()
      expect(vm.get("result_size")).toBe(1)
    })
  })

  it("delete on an absent key returns false and leaves size unchanged", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        m:set("a", 1)
        result_deleted = m:delete("missing")
        result_size = m.size
      `)
      expect(vm.get("result_deleted")).toBe(false)
      expect(vm.get("result_size")).toBe(1)
    })
  })
})

describe("Map.prototype.clear", () => {
  it("clear empties the Map", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        m:set("a", 1)
        m:set("b", 2)
        m:clear()
        result_size = m.size
        result_has_a = m:has("a")
      `)
      expect(vm.get("result_size")).toBe(0)
      expect(vm.get("result_has_a")).toBe(false)
    })
  })
})

describe("Map mixed key types", () => {
  it("supports numeric and string keys side-by-side", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.Map)
        m:set(1, "one")
        m:set("1", "string-one")
        result_num = m:get(1)
        result_str = m:get("1")
        result_size = m.size
      `)
      expect(vm.get("result_num")).toBe("one")
      expect(vm.get("result_str")).toBe("string-one")
      expect(vm.get("result_size")).toBe(2)
    })
  })
})
