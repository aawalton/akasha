import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__SetDescriptor (isPrototype=true)", () => {
  it("installs the cloned descriptor under metatable._descriptors[key]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local proto = {}
        ____lualib.__TS__SetDescriptor(proto, "x", {value = 42, writable = true}, true)
        result_descriptor_value = proto._descriptors.x.value
        result_descriptor_writable = proto._descriptors.x.writable
      `)
      expect(vm.get("result_descriptor_value")).toBe(42)
      expect(vm.get("result_descriptor_writable")).toBe(true)
    })
  })

  it("wires __index and __newindex dispatcher hooks onto the metatable", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local proto = {}
        ____lualib.__TS__SetDescriptor(proto, "x", {value = 1, writable = true}, true)
        result_index_is_function = type(proto.__index) == "function"
        result_newindex_is_function = type(proto.__newindex) == "function"
      `)
      expect(vm.get("result_index_is_function")).toBe(true)
      expect(vm.get("result_newindex_is_function")).toBe(true)
    })
  })

  it("clears any pre-existing rawset value at the key so reads dispatch through the descriptor", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local proto = {x = "original"}
        ____lualib.__TS__SetDescriptor(proto, "x", {value = "from_descriptor", writable = true}, true)
        result_raw_is_nil = rawget(proto, "x") == nil
        result_descriptor_value = proto._descriptors.x.value
      `)
      expect(vm.get("result_raw_is_nil")).toBe(true)
      expect(vm.get("result_descriptor_value")).toBe("from_descriptor")
    })
  })

  it("preserves an accessor descriptor (get/set) shape on the metatable", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local g = function() return "g" end
        local s = function() end
        local proto = {}
        ____lualib.__TS__SetDescriptor(proto, "y", {get = g, set = s}, true)
        result_get_eq = proto._descriptors.y.get == g
        result_set_eq = proto._descriptors.y.set == s
        result_value_nil = proto._descriptors.y.value == nil
      `)
      expect(vm.get("result_get_eq")).toBe(true)
      expect(vm.get("result_set_eq")).toBe(true)
      expect(vm.get("result_value_nil")).toBe(true)
    })
  })
})
