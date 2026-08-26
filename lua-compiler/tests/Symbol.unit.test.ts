import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__Symbol", () => {
  it("two calls with the same description produce non-equal symbols", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local a = ____lualib.__TS__Symbol("a")
        local b = ____lualib.__TS__Symbol("a")
        result_eq = a == b
        result_a_desc = a.description
        result_b_desc = b.description
      `)
      expect(vm.get("result_eq")).toBe(false)
      expect(vm.get("result_a_desc")).toBe("a")
      expect(vm.get("result_b_desc")).toBe("a")
    })
  })

  it("a symbol equals itself", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__Symbol("self")
        result = s == s
      `)
      expect(vm.get("result")).toBe(true)
    })
  })

  it("tostring formats as Symbol(<description>) and an undescribed symbol formats as Symbol()", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local described = ____lualib.__TS__Symbol("hello")
        local bare = ____lualib.__TS__Symbol()
        result_described = tostring(described)
        result_bare = tostring(bare)
      `)
      expect(vm.get("result_described")).toBe("Symbol(hello)")
      expect(vm.get("result_bare")).toBe("Symbol()")
    })
  })
})

describe("Symbol namespace", () => {
  it("exposes the well-known symbols and they are distinct from each other", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local S = ____lualib.Symbol
        result_iter_self = S.iterator == S.iterator
        result_iter_ne_hasinstance = S.iterator ~= S.hasInstance
        result_iter_desc = S.iterator.description
      `)
      expect(vm.get("result_iter_self")).toBe(true)
      expect(vm.get("result_iter_ne_hasinstance")).toBe(true)
      expect(vm.get("result_iter_desc")).toBe("Symbol.iterator")
    })
  })
})
