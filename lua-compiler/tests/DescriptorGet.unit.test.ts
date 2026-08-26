import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__DescriptorGet shape", () => {
  it("is exported from the lualib bundle as a function", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result_type = type(____lualib.__TS__DescriptorGet)`)
      expect(vm.get("result_type")).toBe("function")
    })
  })

  it("returns nil when the metatable chain is empty (nil metatable)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local result = ____lualib.__TS__DescriptorGet({}, nil, "any")
        result_is_nil = result == nil
      `)
      expect(vm.get("result_is_nil")).toBe(true)
    })
  })
})

describe("__TS__DescriptorGet behavioral cases", () => {
  it("reads a data descriptor's value, invokes a getter for an accessor descriptor, and walks the metatable chain", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        -- Data descriptor: returns descriptor.value.
        local self_a = {}
        local mt_a = {_descriptors = {x = {value = "data_value", writable = true}}}
        result_data = ____lualib.__TS__DescriptorGet(self_a, mt_a, "x")

        -- Accessor descriptor: invokes get with self bound to the receiver.
        local self_b = {tag = "receiver"}
        local mt_b = {_descriptors = {y = {get = function(self) return self.tag end}}}
        result_accessor = ____lualib.__TS__DescriptorGet(self_b, mt_b, "y")

        -- Walks the metatable chain: descriptor on the parent metatable.
        local self_c = {}
        local parent_mt = {_descriptors = {z = {value = "from_parent", writable = true}}}
        local child_mt = {}
        setmetatable(child_mt, parent_mt)
        result_chain = ____lualib.__TS__DescriptorGet(self_c, child_mt, "z")
      `)
      expect(vm.get("result_data")).toBe("data_value")
      expect(vm.get("result_accessor")).toBe("receiver")
      expect(vm.get("result_chain")).toBe("from_parent")
    })
  })
})
