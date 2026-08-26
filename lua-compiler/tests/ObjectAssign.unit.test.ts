import { describe, expect, it } from "bun:test"
import { withLualibVm } from "./_lua-test-helpers"

describe("__TS__ObjectAssign", () => {
  it("copies own props left-to-right with later sources overwriting", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {a = 1}
        local result = ____lualib.__TS__ObjectAssign(target, {b = 2}, {a = 3})
        result_a = result.a
        result_b = result.b
        target_a = target.a
        same = result == target
      `)
      expect(vm.get("result_a")).toBe(3)
      expect(vm.get("result_b")).toBe(2)
      expect(vm.get("target_a")).toBe(3)
      expect(vm.get("same")).toBe(true)
    })
  })

  it("copies into an empty target", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {}
        ____lualib.__TS__ObjectAssign(target, {x = "x"}, {y = "y"})
        result_x = target.x
        result_y = target.y
      `)
      expect(vm.get("result_x")).toBe("x")
      expect(vm.get("result_y")).toBe("y")
    })
  })

  it("returns target unchanged when no sources are supplied", async () => {
    await withLualibVm(async (vm) => {
      await vm.run(`
        local target = {a = 1}
        local result = ____lualib.__TS__ObjectAssign(target)
        result_a = result.a
        same = result == target
      `)
      expect(vm.get("result_a")).toBe(1)
      expect(vm.get("same")).toBe(true)
    })
  })
})
