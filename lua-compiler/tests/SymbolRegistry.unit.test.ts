import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__SymbolRegistryFor", () => {
  it("returns the same symbol for the same key across calls", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local a = ____lualib.__TS__SymbolRegistryFor("k")
        local b = ____lualib.__TS__SymbolRegistryFor("k")
        result_eq = a == b
      `)
      expect(vm.get("result_eq")).toBe(true)
    })
  })

  it("returns distinct symbols for different keys", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local a = ____lualib.__TS__SymbolRegistryFor("alpha")
        local b = ____lualib.__TS__SymbolRegistryFor("beta")
        result_ne = a ~= b
      `)
      expect(vm.get("result_ne")).toBe(true)
    })
  })
})

describe("__TS__SymbolRegistryKeyFor", () => {
  it("returns the key of a registered symbol", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local s = ____lualib.__TS__SymbolRegistryFor("hello")
        result = ____lualib.__TS__SymbolRegistryKeyFor(s)
      `)
      expect(vm.get("result")).toBe("hello")
    })
  })

  it("returns nil for a symbol not in the registry", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local local_sym = ____lualib.__TS__Symbol("local")
        result = ____lualib.__TS__SymbolRegistryKeyFor(local_sym)
        result_is_nil = result == nil
      `)
      expect(vm.get("result_is_nil")).toBe(true)
    })
  })
})
