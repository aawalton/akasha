import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__DescriptorSet shape", () => {
  it("is exported from the lualib bundle as a function", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`result_type = type(____lualib.__TS__DescriptorSet)`)
      expect(vm.get("result_type")).toBe("function")
    })
  })
})

describe("__TS__DescriptorSet behavioral cases", () => {
  it("invokes an accessor descriptor's setter, updates a writable data descriptor, throws on a read-only data descriptor, falls through to rawset when no descriptor is found, and walks the metatable chain", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        -- Accessor: setter is invoked with self bound and the value forwarded.
        local self_a = {}
        local captured_self, captured_value
        local mt_a = {
          _descriptors = {
            x = {set = function(self, v) captured_self = self; captured_value = v end},
          },
        }
        ____lualib.__TS__DescriptorSet(self_a, mt_a, "x", "set_value")
        result_setter_self_eq = captured_self == self_a
        result_setter_value = captured_value

        -- Writable data descriptor: descriptor.value is mutated.
        local self_b = {}
        local data_desc = {value = "old", writable = true}
        local mt_b = {_descriptors = {y = data_desc}}
        ____lualib.__TS__DescriptorSet(self_b, mt_b, "y", "new")
        result_writable_value = data_desc.value

        -- Walks the chain: descriptor lives on the parent metatable.
        local self_c = {}
        local parent_data = {value = "old_parent", writable = true}
        local parent_mt = {_descriptors = {z = parent_data}}
        local child_mt = {}
        setmetatable(child_mt, parent_mt)
        ____lualib.__TS__DescriptorSet(self_c, child_mt, "z", "new_parent")
        result_chain_value = parent_data.value

        -- Fall-through: no descriptor anywhere → rawset(self, key, value).
        local self_d = {}
        local mt_d = {}
        ____lualib.__TS__DescriptorSet(self_d, mt_d, "k", "fallthrough")
        result_fallthrough = rawget(self_d, "k")
      `)
      expect(vm.get("result_setter_self_eq")).toBe(true)
      expect(vm.get("result_setter_value")).toBe("set_value")
      expect(vm.get("result_writable_value")).toBe("new")
      expect(vm.get("result_chain_value")).toBe("new_parent")
      expect(vm.get("result_fallthrough")).toBe("fallthrough")

      let message: string | null = null
      try {
        await vm.run(`
          local self_e = {}
          local readonly_desc = {value = "frozen", writable = false}
          local mt_e = {_descriptors = {ro = readonly_desc}}
          ____lualib.__TS__DescriptorSet(self_e, mt_e, "ro", "attempt")
        `)
      } catch (e) {
        message = String(e)
      }
      expect(message).not.toBeNull()
      expect(message).toContain("Cannot assign to read only property 'ro'")
    })
  })
})
