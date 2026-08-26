import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__CloneDescriptor", () => {
  it("normalizes a data descriptor with explicit fields and returns a fresh table", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local input = {value = 42, writable = true, enumerable = true, configurable = true}
        local cloned = ____lualib.__TS__CloneDescriptor(input)
        result_value = cloned.value
        result_writable = cloned.writable
        result_enumerable = cloned.enumerable
        result_configurable = cloned.configurable
        result_has_get = cloned.get ~= nil
        result_has_set = cloned.set ~= nil
        result_is_distinct_table = cloned ~= input
      `)
      expect(vm.get("result_value")).toBe(42)
      expect(vm.get("result_writable")).toBe(true)
      expect(vm.get("result_enumerable")).toBe(true)
      expect(vm.get("result_configurable")).toBe(true)
      expect(vm.get("result_has_get")).toBe(false)
      expect(vm.get("result_has_set")).toBe(false)
      expect(vm.get("result_is_distinct_table")).toBe(true)
    })
  })

  it("defaults missing enumerable/configurable/writable to false", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local cloned = ____lualib.__TS__CloneDescriptor({value = "v"})
        result_value = cloned.value
        result_writable = cloned.writable
        result_enumerable = cloned.enumerable
        result_configurable = cloned.configurable
      `)
      expect(vm.get("result_value")).toBe("v")
      expect(vm.get("result_writable")).toBe(false)
      expect(vm.get("result_enumerable")).toBe(false)
      expect(vm.get("result_configurable")).toBe(false)
    })
  })

  it("preserves get and set on an accessor descriptor and omits value/writable", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local g = function() return 1 end
        local s = function() end
        local cloned = ____lualib.__TS__CloneDescriptor({get = g, set = s})
        result_get_eq = cloned.get == g
        result_set_eq = cloned.set == s
        result_value_nil = cloned.value == nil
        result_writable_nil = cloned.writable == nil
      `)
      expect(vm.get("result_get_eq")).toBe(true)
      expect(vm.get("result_set_eq")).toBe(true)
      expect(vm.get("result_value_nil")).toBe(true)
      expect(vm.get("result_writable_nil")).toBe(true)
    })
  })

  it("throws when given both an accessor and a value/writable attribute", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local ok, err = pcall(function()
          ____lualib.__TS__CloneDescriptor({get = function() end, value = 1})
        end)
        result_ok = ok
        result_err_has_message = type(err) == "string" and string.find(err, "Cannot both specify accessors") ~= nil
      `)
      expect(vm.get("result_ok")).toBe(false)
      expect(vm.get("result_err_has_message")).toBe(true)
    })
  })
})
