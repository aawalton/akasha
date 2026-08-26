import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectGetOwnPropertyDescriptors", () => {
  it("returns the full _descriptors table when present", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {}
        setmetatable(target, {_descriptors = {
          x = {value = 1, writable = true, enumerable = true, configurable = true},
          y = {value = "y", writable = false, enumerable = false, configurable = false},
        }})
        local descs = ____lualib.__TS__ObjectGetOwnPropertyDescriptors(target)
        x_value = descs.x.value
        x_writable = descs.x.writable
        y_value = descs.y.value
        y_writable = descs.y.writable
      `)
      expect(vm.get("x_value")).toBe(1)
      expect(vm.get("x_writable")).toBe(true)
      expect(vm.get("y_value")).toBe("y")
      expect(vm.get("y_writable")).toBe(false)
    })
  })

  it("returns an empty table when the target has no metatable", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local descs = ____lualib.__TS__ObjectGetOwnPropertyDescriptors({x = 1})
        local count = 0
        for _ in pairs(descs) do count = count + 1 end
        result_count = count
      `)
      expect(vm.get("result_count")).toBe(0)
    })
  })

  it("returns an empty table when the metatable lacks _descriptors", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {}
        setmetatable(target, {})
        local descs = ____lualib.__TS__ObjectGetOwnPropertyDescriptors(target)
        local count = 0
        for _ in pairs(descs) do count = count + 1 end
        result_count = count
      `)
      expect(vm.get("result_count")).toBe(0)
    })
  })
})
