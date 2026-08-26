import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectRest", () => {
  it("returns the properties not listed in usedProperties", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {a = 1, b = 2, c = 3}
        local rest = ____lualib.__TS__ObjectRest(target, {a = true})
        result_a = rest.a
        result_b = rest.b
        result_c = rest.c
      `)
      expect(vm.get("result_a")).toBeNull()
      expect(vm.get("result_b")).toBe(2)
      expect(vm.get("result_c")).toBe(3)
    })
  })

  it("does not mutate the original target", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {a = 1, b = 2}
        ____lualib.__TS__ObjectRest(target, {a = true})
        target_a = target.a
        target_b = target.b
      `)
      expect(vm.get("target_a")).toBe(1)
      expect(vm.get("target_b")).toBe(2)
    })
  })

  it("returns an empty object when every key is used", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {a = 1, b = 2}
        local rest = ____lualib.__TS__ObjectRest(target, {a = true, b = true})
        local count = 0
        for _ in pairs(rest) do count = count + 1 end
        result_count = count
      `)
      expect(vm.get("result_count")).toBe(0)
    })
  })
})
