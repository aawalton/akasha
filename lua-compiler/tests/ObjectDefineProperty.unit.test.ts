import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectDefineProperty", () => {
  it("throws 'Cannot redefine property' when the descriptor is an accessor and a value already exists at the key", async () => {
    await withLualibVm(async (vm) => {
      let message: string | null = null
      try {
        await vm.run(`
          local target = {x = "existing"}
          ____lualib.__TS__ObjectDefineProperty(target, "x", {get = function() return 1 end})
        `)
      } catch (e) {
        message = String(e)
      }
      expect(message).not.toBeNull()
      expect(message).toContain("Cannot redefine property: x")
    })
  })

  it("remaps a numeric JS key to luaKey = key + 1 when checking for an existing value", async () => {
    await withLualibVm(async (vm) => {
      let message: string | null = null
      try {
        await vm.run(`
          local target = {"existing"}
          ____lualib.__TS__ObjectDefineProperty(target, 0, {set = function() end})
        `)
      } catch (e) {
        message = String(e)
      }
      expect(message).not.toBeNull()
      expect(message).toContain("Cannot redefine property: 0")
    })
  })
})

describe("__TS__ObjectDefineProperty (storage path)", () => {
  it("writes a normalized data descriptor under metatable._descriptors[key]", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {}
        ____lualib.__TS__ObjectDefineProperty(target, "x", {value = 42, writable = true})
        local mt = getmetatable(target)
        result_descriptor_value = mt._descriptors.x.value
        result_descriptor_writable = mt._descriptors.x.writable
      `)
      expect(vm.get("result_descriptor_value")).toBe(42)
      expect(vm.get("result_descriptor_writable")).toBe(true)
    })
  })

  it("fills configurable/enumerable/writable defaults from the existing value when present", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {x = "existing"}
        ____lualib.__TS__ObjectDefineProperty(target, "x", {})
        local mt = getmetatable(target)
        local desc = mt._descriptors.x
        result_value = desc.value
        result_configurable = desc.configurable
        result_enumerable = desc.enumerable
        result_writable = desc.writable
      `)
      expect(vm.get("result_value")).toBe("existing")
      expect(vm.get("result_configurable")).toBe(true)
      expect(vm.get("result_enumerable")).toBe(true)
      expect(vm.get("result_writable")).toBe(true)
    })
  })

  it("returns the target unchanged (same reference)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {}
        local returned = ____lualib.__TS__ObjectDefineProperty(target, "x", {value = 1, writable = true})
        result_same_ref = returned == target
      `)
      expect(vm.get("result_same_ref")).toBe(true)
    })
  })
})
