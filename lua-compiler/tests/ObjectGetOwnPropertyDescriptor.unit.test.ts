import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectGetOwnPropertyDescriptor", () => {
  it("returns the descriptor stored on the target's metatable", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {}
        local mt = {_descriptors = {x = {value = 42, writable = true, enumerable = true, configurable = true}}}
        setmetatable(target, mt)
        local desc = ____lualib.__TS__ObjectGetOwnPropertyDescriptor(target, "x")
        result_value = desc.value
        result_writable = desc.writable
        result_enumerable = desc.enumerable
        result_configurable = desc.configurable
      `)
      expect(vm.get("result_value")).toBe(42)
      expect(vm.get("result_writable")).toBe(true)
      expect(vm.get("result_enumerable")).toBe(true)
      expect(vm.get("result_configurable")).toBe(true)
    })
  })

  it("returns nil for a target without a metatable", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {x = 1}
        local desc = ____lualib.__TS__ObjectGetOwnPropertyDescriptor(target, "x")
        result_is_nil = desc == nil
      `)
      expect(vm.get("result_is_nil")).toBe(true)
    })
  })

  it("returns nil for a key with no descriptor entry", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {}
        setmetatable(target, {_descriptors = {x = {value = 1}}})
        local desc = ____lualib.__TS__ObjectGetOwnPropertyDescriptor(target, "missing")
        result_is_nil = desc == nil
      `)
      expect(vm.get("result_is_nil")).toBe(true)
    })
  })

  it("returns nil when the metatable has no _descriptors table", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {}
        setmetatable(target, {})
        local desc = ____lualib.__TS__ObjectGetOwnPropertyDescriptor(target, "x")
        result_is_nil = desc == nil
      `)
      expect(vm.get("result_is_nil")).toBe(true)
    })
  })
})
