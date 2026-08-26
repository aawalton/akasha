import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("WeakMap.prototype.set / get / has", () => {
  it("set then get round-trips a table-keyed entry", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.WeakMap)
        local k = {}
        m:set(k, "value")
        result_get = m:get(k)
        result_has = m:has(k)
      `)
      expect(vm.get("result_get")).toBe("value")
      expect(vm.get("result_has")).toBe(true)
    })
  })

  it("get on an absent key returns undefined (nil)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.WeakMap)
        local k = {}
        result_get = m:get(k)
        result_has = m:has(k)
      `)
      expect(vm.get("result_get")).toBeNull()
      expect(vm.get("result_has")).toBe(false)
    })
  })

  it("distinct table keys are tracked independently", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.WeakMap)
        local k1 = {}
        local k2 = {}
        m:set(k1, "v1")
        m:set(k2, "v2")
        result_v1 = m:get(k1)
        result_v2 = m:get(k2)
      `)
      expect(vm.get("result_v1")).toBe("v1")
      expect(vm.get("result_v2")).toBe("v2")
    })
  })
})

describe("WeakMap.prototype.delete (LuaTable.set regression)", () => {
  it("delete returns true and removes the entry", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.WeakMap)
        local k = {}
        m:set(k, "value")
        result_deleted = m:delete(k)
        result_has = m:has(k)
        result_get = m:get(k)
      `)
      expect(vm.get("result_deleted")).toBe(true)
      expect(vm.get("result_has")).toBe(false)
      expect(vm.get("result_get")).toBeNull()
    })
  })

  it("delete on an absent key returns false", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local m = ____lualib.__TS__New(____lualib.WeakMap)
        local k = {}
        result_deleted = m:delete(k)
      `)
      expect(vm.get("result_deleted")).toBe(false)
    })
  })
})
