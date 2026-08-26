import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__DecorateLegacy class branch (key === undefined)", () => {
  it("invokes each decorator with target and applies them in reverse order", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        -- tstl emits decorator(self_nil, target) for plain function decorators.
        local function dec1(self, target)
          target.tag = (target.tag or "") .. "-d1"
          return target
        end
        local function dec2(self, target)
          target.tag = (target.tag or "") .. "-d2"
          return target
        end
        local target = {tag = "init"}
        local result = ____lualib.__TS__DecorateLegacy({dec1, dec2}, target)
        result_same_target = result == target
        result_tag = target.tag
      `)
      expect(vm.get("result_same_target")).toBe(true)
      expect(vm.get("result_tag")).toBe("init-d2-d1")
    })
  })
})

describe("__TS__DecorateLegacy method branch (key set, desc undefined)", () => {
  it("invokes the decorator with (target, key)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local seen = {}
        local function dec(self, target, key)
          seen.target_kind = target.kind
          seen.key = key
          return target
        end
        local target = {kind = "proto"}
        ____lualib.__TS__DecorateLegacy({dec}, target, "myMethod")
        result_kind = seen.target_kind
        result_key = seen.key
      `)
      expect(vm.get("result_kind")).toBe("proto")
      expect(vm.get("result_key")).toBe("myMethod")
    })
  })
})

describe("__TS__DecorateLegacy parameter branch (desc === false)", () => {
  it("invokes the decorator with (target, key, false)", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local seen = {}
        local function dec(self, target, key, desc)
          seen.key = key
          seen.desc = desc
          return target
        end
        ____lualib.__TS__DecorateLegacy({dec}, {}, "myParam", false)
        result_key = seen.key
        result_desc = seen.desc
      `)
      expect(vm.get("result_key")).toBe("myParam")
      expect(vm.get("result_desc")).toBe(false)
    })
  })
})

describe("__TS__DecorateLegacy property-descriptor branch (desc === true)", () => {
  it("synthesizes a default descriptor from the existing field value when no descriptor is registered", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local seenDescriptor
        local function dec(self, target, key, descriptor)
          seenDescriptor = descriptor
          -- Return nil → polyfill keeps the existing descriptor and rawsets value.
          return nil
        end
        local target = {myField = "originalValue"}
        ____lualib.__TS__DecorateLegacy({dec}, target, "myField", true)
        result_value = seenDescriptor and seenDescriptor.value
        result_writable = seenDescriptor and seenDescriptor.writable
        result_configurable = seenDescriptor and seenDescriptor.configurable
        -- After the run, target.myField should still hold the value (rawset path).
        result_field = target.myField
      `)
      expect(vm.get("result_value")).toBe("originalValue")
      expect(vm.get("result_writable")).toBe(true)
      expect(vm.get("result_configurable")).toBe(true)
      expect(vm.get("result_field")).toBe("originalValue")
    })
  })
})
